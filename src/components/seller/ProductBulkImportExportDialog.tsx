import React, { useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Download, FileText, Upload } from "lucide-react";

type ProductForExport = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images: string[] | null;
  category: string | null;
  stock: number | null;
  created_at: string | null;
};

type ImportRow = {
  name: string;
  price: number;
  category: string | null;
  stock: number | null;
  description: string | null;
  images: string[] | null;
};

type ImportParseResult = {
  rows: ImportRow[];
  errors: Array<{ line: number; message: string }>;
};

function downloadTextFile(filename: string, content: string, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function escapeCsvValue(value: string) {
  if (value.includes("\n") || value.includes("\r") || value.includes(",") || value.includes('"')) {
    return `"${value.replace(/\"/g, '""')}"`;
  }
  return value;
}

// Small CSV parser (handles quotes + commas) for typical seller uploads.
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;

  const pushCell = () => {
    row.push(cur);
    cur = "";
  };

  const pushRow = () => {
    // Skip completely empty trailing line
    if (row.length === 1 && row[0] === "") {
      row = [];
      return;
    }
    rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        const next = text[i + 1];
        if (next === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      continue;
    }

    if (ch === ",") {
      pushCell();
      continue;
    }

    if (ch === "\n") {
      pushCell();
      pushRow();
      continue;
    }

    if (ch === "\r") {
      // ignore \r and let \n handle row
      continue;
    }

    cur += ch;
  }

  // flush
  pushCell();
  if (row.length > 0) pushRow();

  return rows;
}

function normalizeHeader(h: string) {
  return h.trim().toLowerCase().replace(/\s+/g, "");
}

function parseProductsCsv(csvText: string): ImportParseResult {
  const parsed = parseCsv(csvText);
  const errors: ImportParseResult["errors"] = [];

  if (parsed.length === 0) {
    return { rows: [], errors: [{ line: 1, message: "ফাইল খালি" }] };
  }

  const header = parsed[0].map(normalizeHeader);
  const idx = (key: string) => header.indexOf(key);

  const nameI = idx("name");
  const priceI = idx("price");
  const categoryI = idx("category");
  const stockI = idx("stock");
  const descriptionI = idx("description");
  const imagesI = idx("images");

  if (nameI === -1 || priceI === -1) {
    return {
      rows: [],
      errors: [
        {
          line: 1,
          message: "হেডারে অন্তত name এবং price কলাম থাকতে হবে (উদাহরণ: name,price,category,stock,description,images)"
        }
      ]
    };
  }

  const rows: ImportRow[] = [];
  for (let r = 1; r < parsed.length; r++) {
    const line = r + 1;
    const cells = parsed[r];
    const get = (i: number) => (i >= 0 ? (cells[i] ?? "").trim() : "");

    const name = get(nameI);
    const priceRaw = get(priceI);

    if (!name) {
      errors.push({ line, message: "name ফাঁকা" });
      continue;
    }

    const price = Number(priceRaw);
    if (!Number.isFinite(price) || price <= 0) {
      errors.push({ line, message: `price ভুল: ${priceRaw || "(ফাঁকা)"}` });
      continue;
    }

    const category = get(categoryI) || null;
    const stockRaw = get(stockI);
    const stock = stockRaw === "" ? null : Number(stockRaw);
    if (stockRaw !== "" && (!Number.isFinite(stock) || stock! < 0 || !Number.isInteger(stock))) {
      errors.push({ line, message: `stock পূর্ণসংখ্যা হতে হবে: ${stockRaw}` });
      continue;
    }

    const description = get(descriptionI) || null;

    const imagesRaw = get(imagesI);
    const images = imagesRaw
      ? imagesRaw
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    rows.push({
      name,
      price,
      category,
      stock: stockRaw === "" ? null : (stock as number),
      description,
      images: images.length > 0 ? images : null
    });
  }

  return { rows, errors };
}

export type ProductBulkImportExportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  products: ProductForExport[];
  onImported?: () => void;
};

const ProductBulkImportExportDialog: React.FC<ProductBulkImportExportDialogProps> = ({
  open,
  onOpenChange,
  userId,
  products,
  onImported
}) => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [parseResult, setParseResult] = useState<ImportParseResult | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  const templateCsv = useMemo(() => {
    const header = ["name", "price", "category", "stock", "description", "images"].join(",");
    const sample = [
      "স্মার্টফোন",
      "15000",
      "ইলেকট্রনিক্স",
      "10",
      "৬.৫ ইঞ্চি ডিসপ্লে",
      "https://example.com/img1.jpg|https://example.com/img2.jpg"
    ]
      .map(escapeCsvValue)
      .join(",");
    return `${header}\n${sample}\n`;
  }, []);

  const exportCsv = useMemo(() => {
    const header = ["id", "name", "price", "category", "stock", "description", "images"].join(",");
    const lines = products.map((p) => {
      const images = (p.images || []).join("|");
      const row = [
        p.id,
        p.name,
        String(p.price),
        p.category || "",
        p.stock === null || p.stock === undefined ? "" : String(p.stock),
        p.description || "",
        images
      ].map((v) => escapeCsvValue(String(v ?? "")));
      return row.join(",");
    });
    return `${header}\n${lines.join("\n")}\n`;
  }, [products]);

  const handleSelectFile = async (f: File) => {
    setFile(f);
    setParseResult(null);
    setIsParsing(true);
    try {
      const text = await f.text();
      const result = parseProductsCsv(text);
      setParseResult(result);
      if (result.rows.length === 0) {
        toast({
          title: "ইমপোর্ট ডেটা পাওয়া যায়নি",
          description: result.errors[0]?.message || "CSV ফাইল চেক করুন",
          variant: "destructive"
        });
      }
    } catch (e: any) {
      toast({
        title: "CSV পড়তে সমস্যা",
        description: e?.message || "ফাইলটি আবার চেষ্টা করুন",
        variant: "destructive"
      });
    } finally {
      setIsParsing(false);
    }
  };

  const handleImport = async () => {
    if (!parseResult || parseResult.rows.length === 0) {
      toast({
        title: "ইমপোর্ট করা যাচ্ছে না",
        description: "সঠিক CSV ফাইল নির্বাচন করুন",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    const total = parseResult.rows.length;

    try {
      // Insert in chunks to avoid request size issues
      const chunkSize = 100;
      for (let i = 0; i < parseResult.rows.length; i += chunkSize) {
        const chunk = parseResult.rows.slice(i, i + chunkSize);
        const payload = chunk.map((r) => ({
          name: r.name,
          price: r.price,
          category: r.category,
          stock: r.stock,
          description: r.description,
          images: r.images,
          created_by: userId
        }));

        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;

        const done = Math.min(i + chunk.length, total);
        setImportProgress(Math.round((done / total) * 100));
      }

      toast({
        title: "ইমপোর্ট সম্পন্ন",
        description: `${total} টি প্রোডাক্ট যোগ হয়েছে।`
      });
      onImported?.();
      onOpenChange(false);
      setFile(null);
      setParseResult(null);
      setImportProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    } catch (e: any) {
      toast({
        title: "ইমপোর্ট ব্যর্থ",
        description: e?.message || "আবার চেষ্টা করুন",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>বাল্ক ইমপোর্ট/এক্সপোর্ট</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="import" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import" className="gap-2">
              <Upload className="h-4 w-4" /> ইমপোর্ট
            </TabsTrigger>
            <TabsTrigger value="export" className="gap-2">
              <Download className="h-4 w-4" /> এক্সপোর্ট
            </TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">টেমপ্লেট</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => downloadTextFile("product_template.csv", templateCsv, "text/csv;charset=utf-8")}
                >
                  <FileText className="h-4 w-4 mr-2" /> CSV টেমপ্লেট ডাউনলোড
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">CSV ফাইল আপলোড</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  ref={inputRef}
                  type="file"
                  accept=".csv,text/csv"
                  disabled={isParsing || isImporting}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void handleSelectFile(f);
                  }}
                />

                {isParsing && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">CSV পড়া হচ্ছে...</div>
                    <Progress value={50} />
                  </div>
                )}

                {parseResult && (
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">প্রিভিউ:</span> {parseResult.rows.length} টি valid row
                      {parseResult.errors.length > 0 ? (
                        <span className="text-muted-foreground"> • {parseResult.errors.length} টি error</span>
                      ) : null}
                    </div>

                    {parseResult.errors.length > 0 && (
                      <div className="rounded-md border p-3 text-sm">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div className="space-y-1">
                            <div className="font-medium">কিছু লাইন স্কিপ করা হবে</div>
                            <ul className="list-disc list-inside text-muted-foreground">
                              {parseResult.errors.slice(0, 5).map((er) => (
                                <li key={`${er.line}-${er.message}`}>লাইন {er.line}: {er.message}</li>
                              ))}
                              {parseResult.errors.length > 5 ? (
                                <li>আরো {parseResult.errors.length - 5} টি...</li>
                              ) : null}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {isImporting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ইমপোর্ট হচ্ছে...</span>
                      <span className="text-muted-foreground">{importProgress}%</span>
                    </div>
                    <Progress value={importProgress} />
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handleImport}
                  disabled={isParsing || isImporting || !parseResult || parseResult.rows.length === 0}
                >
                  <Upload className="h-4 w-4 mr-2" /> ইমপোর্ট শুরু করুন
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">CSV এক্সপোর্ট</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <div className="text-sm text-muted-foreground">মোট {products.length} টি প্রোডাক্ট</div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    downloadTextFile(
                      `products_${new Date().toISOString().slice(0, 10)}.csv`,
                      exportCsv,
                      "text/csv;charset=utf-8"
                    )
                  }
                >
                  <Download className="h-4 w-4 mr-2" /> CSV ডাউনলোড
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProductBulkImportExportDialog;
