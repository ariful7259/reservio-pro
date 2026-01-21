import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SellerOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | string;

export interface SellerOrderRow {
  id: string;
  user_id: string;
  status: SellerOrderStatus;
  total_amount: number;
  final_price: number;
  margin_amount: number;
  payment_method: string;
  order_data: any;
  created_at: string;
  updated_at: string;
  admin_notes: string | null;
}

export type SellerOrderStats = {
  total: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  revenue: number; // delivered margin
};

type Params = {
  userId?: string;
};

export function useSellerOrderStats({ userId }: Params) {
  const [orders, setOrders] = useState<SellerOrderRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("reseller_orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders((data as SellerOrderRow[]) || []);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const stats: SellerOrderStats = useMemo(() => {
    const pending = orders.filter((o) => o.status === "pending").length;
    const processing = orders.filter((o) => o.status === "processing").length;
    const shipped = orders.filter((o) => o.status === "shipped").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const revenue = orders
      .filter((o) => o.status === "delivered")
      .reduce((sum, o) => sum + Number(o.margin_amount || 0), 0);

    return {
      total: orders.length,
      pending,
      processing,
      shipped,
      delivered,
      revenue,
    };
  }, [orders]);

  return { orders, stats, isLoading, error, refetch: fetchOrders };
}
