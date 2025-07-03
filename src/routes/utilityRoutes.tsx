import { RouteObject } from 'react-router-dom';
import SearchPage from '@/pages/SearchPage';
import Help from '@/pages/Help';
import Feedback from '@/pages/Feedback';
import Utilities from '@/pages/Utilities';
import MultiCurrencySupport from '@/pages/MultiCurrencySupport';
import LanguageSettings from '@/pages/LanguageSettings';
import Security from '@/pages/Security';
import TwoFactorAuthentication from '@/pages/TwoFactorAuthentication';
import KycVerification from '@/pages/KycVerification';
import OfflineMode from '@/pages/OfflineMode';
import QrScanner from '@/pages/QrScanner';
import Onboarding from '@/pages/Onboarding';
import FeatureSelectionPage from '@/pages/FeatureSelectionPage';

export const utilityRoutes: RouteObject[] = [
  {
    path: "search",
    element: <SearchPage />,
  },
  {
    path: "help",
    element: <Help />,
  },
  {
    path: "feedback",
    element: <Feedback />,
  },
  {
    path: "utilities",
    element: <Utilities />,
  },
  {
    path: "multi-currency-support",
    element: <MultiCurrencySupport />,
  },
  {
    path: "language-settings",
    element: <LanguageSettings />,
  },
  {
    path: "security",
    element: <Security />,
  },
  {
    path: "two-factor-authentication",
    element: <TwoFactorAuthentication />,
  },
  {
    path: "kyc-verification",
    element: <KycVerification />,
  },
  {
    path: "offline-mode",
    element: <OfflineMode />,
  },
  {
    path: "qr-scanner",
    element: <QrScanner />,
  },
  {
    path: "onboarding",
    element: <Onboarding />,
  },
  {
    path: "feature-selection",
    element: <FeatureSelectionPage />,
  },
];