
export interface RefundRule {
  id: string;
  title: string;
  description: string;
  category: 'marketplace' | 'service' | 'rental';
  timeLimit: number; // ঘন্টায়
  percent: number;
  conditions: string[];
  active: boolean;
}

export interface RefundRequest {
  id: string;
  transactionId: string;
  amount: number;
  reason: string;
  category: 'marketplace' | 'service' | 'rental';
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  requestDate: string;
  customerName: string;
  sellerName: string;
  responseDate?: string;
  automatic: boolean;
}

export interface RefundSettings {
  enableAutoRefund: boolean;
  autoRefundThreshold: number;
  notifyOnRefund: boolean;
  refundToOriginalMethod: boolean;
  maxAutoRefundAmount: number;
  requireApprovalAbove: number;
  autoRejectKeywords: string[];
  holdPeriod: number; // ঘন্টায়
}
