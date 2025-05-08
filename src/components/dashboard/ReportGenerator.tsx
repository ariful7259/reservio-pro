import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  ChevronDown, 
  PieChart, 
  BarChart, 
  FileSpreadsheet,
  Clock,
  Filter,
  ArrowUpDown,
  Check,
  Loader2,
  RefreshCw,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Report {
  id: string;
  name: string;
  type: 'sales' | 'inventory' | 'marketing' | 'analytics';
  format: 'pdf' | 'excel' | 'csv';
  status: 'ready' | 'generating' | 'failed';
  date: string;
  size: string;
  businessTypes: string[];
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'sales' | 'inventory' | 'marketing' | 'analytics';
  group: 'standard' | 'custom';
  availableFormats: ('pdf' | 'excel' | 'csv')[];
  businessTypes: string[];
}

// সাম্প্রতিক রিপোর্টের ডেমো ডাটা
const mockReports: Report[] = [
  {
    id: 'REP-001',
    name: 'মাসিক সেলস রিপোর্ট',
    type: 'sales',
    format: 'excel',
    status: 'ready',
    date: '05/05/2025',
    size: '2.4MB',
    businessTypes: ['marketplace', 'service']
  },
  {
    id: 'REP-002',
    name: 'ইনভেন্টরি স্ট্যাটাস',
    type: 'inventory',
    format: 'pdf',
    status: 'ready',
    date: '03/05/2025',
    size: '1.8MB',
    businessTypes: ['marketplace']
  },
  {
    id: 'REP-003',
    name: 'মার্কেটিং ক্যাম্পেইন অ্যানালিসিস',
    type: 'marketing',
    format: 'pdf',
    status: 'generating',
    date: '07/05/2025',
    size: 'N/A',
    businessTypes: ['marketplace', 'service', 'rental', 'content']
  },
  {
    id: 'REP-004',
    name: 'কন্টেন্ট পারফরম্যান্স',
    type: 'analytics',
    format: 'csv',
    status: 'ready',
    date: '01/05/2025',
    size: '1.1MB',
    businessTypes: ['content']
  },
  {
    id: 'REP-005',
    name: 'বুকিং অ্যানালিটিক্স',
    type: 'analytics',
    format: 'excel',
    status: 'failed',
    date: '30/04/2025',
    size: 'N/A',
    businessTypes: ['rental', 'service']
  }
];

// রিপোর্ট টেমপ্লেটের ডেমো ডাটা
const mockTemplates: ReportTemplate[] = [
  {
    id: 'TEMP-001',
    name: 'মাসিক সেলস রিপোর্ট',
    description: 'মাসিক বিক্রয়, রেভেনিউ ও প্রফিট বিশ্লেষণ',
    type: 'sales',
    group: 'standard',
    availableFormats: ['pdf', 'excel', 'csv'],
    businessTypes: ['marketplace', 'service', 'rental', 'content']
  },
  {
    id: 'TEMP-002',
    name: 'ইনভেন্টরি স্ট্যাটাস',
    description: 'বর্তমান স্টক লেভেল ও ইনভেন্টরি স্ট্যাটাস',
    type: 'inventory',
    group: 'standard',
    availableFormats: ['pdf', 'excel', 'csv'],
    businessTypes: ['marketplace']
  },
  {
    id: 'TEMP-003',
    name: 'মার্কেটিং ক্যাম্পেইন অ্যানালিসিস',
    description: 'ক্যাম্পে���ন কার্যকারিতা ও ROI বিশ্লেষণ',
    type: 'marketing',
    group: 'standard',
    availableFormats: ['pdf', 'excel'],
    businessTypes: ['marketplace', 'service', 'rental', 'content']
  },
  {
    id: 'TEMP-004',
    name: 'বিজনেস পারফরম্যান্স ড্যাশবোর্ড',
    description: 'সামগ্রিক ব্যবসার কার্যক্ষমতা বিশ্লেষণ',
    type: 'analytics',
    group: 'standard',
    availableFormats: ['pdf', 'excel'],
    businessTypes: ['marketplace', 'service', 'rental', 'content']
  },
  {
    id: 'TEMP-005',
    name: 'কাস্টম সেলস অ্যানালিটিক্স',
    description: 'কাস্টমাইজড সেলস রিপোর্ট',
    type: 'sales',
    group: 'custom',
    availableFormats: ['pdf', 'excel', 'csv'],
    businessTypes: ['marketplace', 'service', 'rental', 'content']
  }
];

const ReportGenerator = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'templates'>('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [selectedReportFormat, setSelectedReportFormat] = useState<string | null>(null);
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>('this-month');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateReport = () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    
    // Demo of report generation
    setTimeout(() => {
      setIsGenerating(false);
      // You would add the new report to the list here in a real scenario
      alert('রিপোর্ট সফলভাবে জেনারেট করা হয়েছে!');
    }, 3000);
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'sales': return <FileText className="h-4 w-4" />;
      case 'inventory': return <BarChart className="h-4 w-4" />;
      case 'marketing': return <PieChart className="h-4 w-4" />;
      case 'analytics': return <BarChart className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getReportTypeName = (type: string) => {
    switch (type) {
      case 'sales': return 'সেলস';
      case 'inventory': return 'ইনভেন্টরি';
      case 'marketing': return 'মার্কেটিং';
      case 'analytics': return 'অ্যানালিটিক্স';
      default: return type;
    }
  };

  const getReportFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'excel': return <FileSpreadsheet className="h-4 w-4" />;
      case 'csv': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getReportFormatName = (format: string) => {
    switch (format) {
      case 'pdf': return 'PDF';
      case 'excel': return 'Excel';
      case 'csv': return 'CSV';
      default: return format;
    }
  };

  const getBusinessTypeIcon = (type: string) => {
    switch (type) {
      case 'marketplace': return '🛒';
      case 'service': return '🔧';
      case 'rental': return '🏠';
      case 'content': return '📝';
      default: return '📊';
    }
  };

  const getBusinessTypeName = (type: string) => {
    switch (type) {
      case 'marketplace': return 'মার্কেটপ্লেস';
      case 'service': return 'সার্ভিস';
      case 'rental': return 'রেন্টাল';
      case 'content': return 'ক���্টেন্ট';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case 'ready': return 'প্রস্তুত';
      case 'generating': return 'জেনারেট হচ্ছে';
      case 'failed': return 'ব্যর্থ হয়েছে';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <Check className="h-4 w-4" />;
      case 'generating': return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'failed': return <RefreshCw className="h-4 w-4" />;
      default: return <Check className="h-4 w-4" />;
    }
  };

  const filteredReports = mockReports.filter(report => {
    if (searchQuery) {
      return report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.id.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const filteredTemplates = mockTemplates.filter(template => {
    if (searchQuery) {
      return template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.id.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const toggleBusinessType = (type: string) => {
    setSelectedBusinessTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>রিপোর্ট জেনারেটর</CardTitle>
            <CardDescription>কাস্টমাইজড রিপোর্ট তৈরি করুন এবং ডাউনলোড করুন</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveTab('reports')}>
              <FileText className="h-4 w-4 mr-2" />
              আমার রিপোর্টস
            </Button>
            <Button variant="outline" onClick={() => setActiveTab('templates')}>
              <FileText className="h-4 w-4 mr-2" />
              টেমপ্লেটস
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              নতুন রিপোর্ট
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === 'reports' && (
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">সাম্প্রতিক রিপোর্টস</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="সব ধরণের" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব ধরণের</SelectItem>
                    <SelectItem value="sales">সেলস</SelectItem>
                    <SelectItem value="inventory">ইনভেন্টরি</SelectItem>
                    <SelectItem value="marketing">মার্কেটিং</SelectItem>
                    <SelectItem value="analytics">অ্যানালিটিক্স</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>নাম</TableHead>
                    <TableHead>বিজনেস টাইপ</TableHead>
                    <TableHead>ধরন</TableHead>
                    <TableHead>ফরম্যাট</TableHead>
                    <TableHead>তারিখ</TableHead>
                    <TableHead>সাইজ</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {report.businessTypes.map(type => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {getBusinessTypeIcon(type)} {getBusinessTypeName(type)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getReportTypeIcon(report.type)}
                          <span>{getReportTypeName(report.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getReportFormatIcon(report.format)}
                          <span>{getReportFormatName(report.format)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(report.status)}
                            <span>{getStatusName(report.status)}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {report.status === 'ready' && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        {report.status === 'generating' && (
                          <Button size="sm" variant="outline" disabled>
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </Button>
                        )}
                        {report.status === 'failed' && (
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">টেমপ্লেটস</h3>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  ফিল্টার
                </Button>
              </div>
              <ScrollArea className="h-[500px] border rounded-md p-2">
                <div className="space-y-2">
                  <div className="p-2 border-b">
                    <h4 className="font-medium text-sm text-muted-foreground">স্ট্যান্ডার্ড রিপোর্টস</h4>
                  </div>
                  
                  {filteredTemplates.filter(t => t.group === 'standard').map(template => (
                    <div
                      key={template.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedTemplate?.id === template.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center">
                            {getReportTypeIcon(template.type)}
                          </div>
                          <div>
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-xs text-muted-foreground">{getReportTypeName(template.type)}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{template.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {template.businessTypes.map(type => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {getBusinessTypeIcon(type)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-2 border-b border-t">
                    <h4 className="font-medium text-sm text-muted-foreground">কাস্টম রিপোর্টস</h4>
                  </div>
                  
                  {filteredTemplates.filter(t => t.group === 'custom').map(template => (
                    <div
                      key={template.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedTemplate?.id === template.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center">
                            {getReportTypeIcon(template.type)}
                          </div>
                          <div>
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-xs text-muted-foreground">{getReportTypeName(template.type)}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{template.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {template.businessTypes.map(type => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {getBusinessTypeIcon(type)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="md:col-span-2">
              {selectedTemplate ? (
                <div className="border rounded-md">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold">{selectedTemplate.name}</h2>
                        <p className="text-muted-foreground">{selectedTemplate.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">
                            {getReportTypeIcon(selectedTemplate.type)}
                            <span className="ml-1">{getReportTypeName(selectedTemplate.type)}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">রিপোর্ট কনফিগারেশন</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">ফরম্যাট নির্বাচন করুন</label>
                            <div className="flex flex-wrap gap-2">
                              {selectedTemplate.availableFormats.map(format => (
                                <Button 
                                  key={format} 
                                  variant={selectedReportFormat === format ? "default" : "outline"} 
                                  className="flex items-center gap-2"
                                  onClick={() => setSelectedReportFormat(format)}
                                >
                                  {getReportFormatIcon(format)}
                                  {getReportFormatName(format)}
                                </Button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">সময়কাল নির্বাচন করুন</label>
                            <Select value={dateRange} onValueChange={setDateRange}>
                              <SelectTrigger>
                                <SelectValue placeholder="সময়কাল নির্বাচন করুন" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="today">আজকের</SelectItem>
                                <SelectItem value="this-week">এই সপ্তাহের</SelectItem>
                                <SelectItem value="this-month">এই মাসের</SelectItem>
                                <SelectItem value="last-month">গত মাসের</SelectItem>
                                <SelectItem value="last-3-months">গত ৩ মাসের</SelectItem>
                                <SelectItem value="last-6-months">গত ৬ মাসের</SelectItem>
                                <SelectItem value="this-year">এই বছরের</SelectItem>
                                <SelectItem value="custom">কাস্টম</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            {dateRange === 'custom' && (
                              <div className="flex gap-2 mt-2">
                                <div className="flex-1">
                                  <label className="text-xs">শুরুর তারিখ</label>
                                  <input type="date" className="w-full mt-1 p-2 border rounded-md" />
                                </div>
                                <div className="flex-1">
                                  <label className="text-xs">শেষের তারিখ</label>
                                  <input type="date" className="w-full mt-1 p-2 border rounded-md" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <label className="text-sm font-medium">বিজনেস টাইপ নির্বাচন করুন</label>
                          <div className="flex flex-wrap gap-2">
                            {selectedTemplate.businessTypes.map(type => (
                              <Button 
                                key={type} 
                                variant={selectedBusinessTypes.includes(type) ? "default" : "outline"} 
                                className="flex items-center gap-2"
                                onClick={() => toggleBusinessType(type)}
                              >
                                <span>{getBusinessTypeIcon(type)}</span>
                                {getBusinessTypeName(type)}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-medium mb-1">অতিরিক্ত অপশন</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="charts" />
                              <label htmlFor="charts" className="text-sm">চার্ট ও গ্রাফ অন্তর্ভুক্ত করুন</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="summary" />
                              <label htmlFor="summary" className="text-sm">এক্সিকিউটিভ সামারি অন্তর্ভুক্ত করুন</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="compare" />
                              <label htmlFor="compare" className="text-sm">পূর্ববর্তী সময়কালের সাথে তুলনা করুন</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h3 className="text-lg font-medium mb-3">রিপোর্ট সামারি</h3>
                        <div className="border rounded-md p-4 bg-gray-50">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">রিপোর্ট নাম:</span>
                              <span className="text-sm font-medium">{selectedTemplate.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">ফরম্যাট:</span>
                              <span className="text-sm font-medium">
                                {selectedReportFormat ? getReportFormatName(selectedReportFormat) : 'নির্বাচন করা হয়নি'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">সময়কাল:</span>
                              <span className="text-sm font-medium">{
                                dateRange === 'today' ? 'আজকের' :
                                dateRange === 'this-week' ? 'এই সপ্তাহের' :
                                dateRange === 'this-month' ? 'এই মাসের' :
                                dateRange === 'last-month' ? 'গত মাসের' :
                                dateRange === 'last-3-months' ? 'গত ৩ মাসের' :
                                dateRange === 'last-6-months' ? 'গত ৬ মাসের' :
                                dateRange === 'this-year' ? 'এই বছরের' :
                                dateRange === 'custom' ? 'কাস্টম' : dateRange
                              }</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">নির্বাচিত বিজনেস টাইপ:</span>
                              <span className="text-sm font-medium">
                                {selectedBusinessTypes.length > 0 
                                  ? selectedBusinessTypes.map(t => getBusinessTypeName(t)).join(', ')
                                  : 'নির্বাচন করা হয়নি'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setSelectedTemplate(null)} className="flex-1">
                          বাতিল করুন
                        </Button>
                        <Button 
                          className="flex-1"
                          disabled={!selectedReportFormat || selectedBusinessTypes.length === 0 || isGenerating}
                          onClick={handleGenerateReport}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              প্রসেসিং...
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              রিপোর্ট জেনারেট করুন
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center border rounded-md p-8">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">কোন রিপোর্ট টেমপ্লেট নির্বাচন করা হয়নি</h3>
                    <p className="text-muted-foreground mb-4">রিপোর্ট জেনারেট করতে বাম পাশ থেকে একটি টেমপ্লেট নির্বাচন করুন</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          {activeTab === 'reports' && `${filteredReports.length}টি রিপোর্ট`}
          {activeTab === 'templates' && `${filteredTemplates.length}টি টেমপ্লেট`}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            রিপোর্ট ডাউনলোড করুন
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === 'templates' ? 'নতুন টেমপ্লেট তৈরি করুন' : 'নতুন রিপোর্ট জেনারেট করুন'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportGenerator;
