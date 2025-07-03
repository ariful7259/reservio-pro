import { RouteObject } from 'react-router-dom';
import PaymentMethods from '@/pages/PaymentMethods';
import PaymentGateway from '@/pages/PaymentGateway';
import PaymentDemo from '@/pages/PaymentDemo';
import PaymentAnalytics from '@/pages/PaymentAnalytics';
import TransactionHistory from '@/pages/TransactionHistory';
import CreatorPaymentGateway from '@/pages/CreatorPaymentGateway';
import SecurePay from '@/pages/SecurePay';
import SecurePayCreator from '@/pages/SecurePayCreator';
import SecurePayBuyer from '@/pages/SecurePayBuyer';
import SecurePayAdmin from '@/pages/SecurePayAdmin';
import Wallet from '@/pages/Wallet';

export const paymentRoutes: RouteObject[] = [
  {
    path: "payment-methods",
    element: <PaymentMethods />,
  },
  {
    path: "payment-gateway",
    element: <PaymentGateway />,
  },
  {
    path: "payment-demo",
    element: <PaymentDemo />,
  },
  {
    path: "payment-analytics",
    element: <PaymentAnalytics />,
  },
  {
    path: "transaction-history",
    element: <TransactionHistory />,
  },
  {
    path: "creator-payment-gateway",
    element: <CreatorPaymentGateway />,
  },
  {
    path: "secure-pay",
    element: <SecurePay />,
  },
  {
    path: "secure-pay-creator",
    element: <SecurePayCreator />,
  },
  {
    path: "secure-pay-buyer",
    element: <SecurePayBuyer />,
  },
  {
    path: "secure-pay-admin",
    element: <SecurePayAdmin />,
  },
  {
    path: "wallet",
    element: <Wallet />,
  },
];