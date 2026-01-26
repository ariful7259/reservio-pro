

## MVP Feature Toggle সিস্টেম

অ্যাডমিন প্যানেলে একটি নতুন "MVP কন্ট্রোল" সেকশন যোগ করা হবে যেখান থেকে অ্যাডমিন MVP-তে কোন ফিচার দেখাবে আর কোনটা লুকিয়ে রাখবে সেটা নির্ধারণ করতে পারবে। এই সেটিংস পরিবর্তন করলে ইউজার অ্যাপে সেই ফিচারগুলো অটোমেটিক হাইড হয়ে যাবে।

---

### কাজের সারসংক্ষেপ

| কম্পোনেন্ট | কাজ |
|------------|-----|
| **FeatureConfigContext** | ফিচার টগল স্টেট ম্যানেজমেন্ট |
| **MVPFeatureControl** | অ্যাডমিন UI - ফিচার অন/অফ করার প্যানেল |
| **useFeatureConfig hook** | ফিচার ভিসিবিলিটি চেক করার হুক |
| **UI আপডেট** | BottomNav, Sidebar, Routes কন্ডিশনাল রেন্ডারিং |

---

### ফিচার ক্যাটাগরি

```text
+------------------------------------------+
|         MVP Feature Control               |
+------------------------------------------+
|                                          |
|  কোর ফিচার (সবসময় চালু)                  |
|  +---------------------------------+     |
|  | [✓] হোম পেইজ                    |     |
|  | [✓] লগইন/সাইনআপ                 |     |
|  | [✓] প্রোফাইল                     |     |
|  +---------------------------------+     |
|                                          |
|  মূল সার্ভিস                              |
|  +---------------------------------+     |
|  | [✓] মার্কেটপ্লেস                  |     |
|  | [✓] রেন্টাল                      |     |
|  | [✓] সার্ভিস                      |     |
|  | [ ] ডিজিটাল প্রোডাক্ট           |     |
|  +---------------------------------+     |
|                                          |
|  পেমেন্ট সিস্টেম                          |
|  +---------------------------------+     |
|  | [✓] বেসিক চেকআউট (COD)          |     |
|  | [ ] ওয়ালেট সিস্টেম              |     |
|  | [ ] SecurePay/Escrow            |     |
|  | [ ] পেমেন্ট অ্যানালিটিক্স       |     |
|  +---------------------------------+     |
|                                          |
|  অ্যাডভান্সড ফিচার                       |
|  +---------------------------------+     |
|  | [ ] রিসেলার সিস্টেম             |     |
|  | [ ] ক্রিয়েটর ড্যাশবোর্ড        |     |
|  | [ ] অনলাইন স্টোর বিল্ডার       |     |
|  | [ ] রেফারেল সিস্টেম            |     |
|  | [ ] লয়্যালটি প্রোগ্রাম          |     |
|  | [ ] KYC ভেরিফিকেশন              |     |
|  +---------------------------------+     |
|                                          |
|  [সব MVP সেটিংস রিসেট] [সেভ করুন]        |
+------------------------------------------+
```

---

### বাস্তবায়ন পদক্ষেপ

#### 1. নতুন Context: FeatureConfigContext

**ফাইল:** `src/context/FeatureConfigContext.tsx`

এই কনটেক্সট সকল ফিচার টগল স্টেট ধারণ করবে:

```typescript
interface FeatureConfig {
  // মূল সার্ভিস
  marketplace: boolean;
  rentals: boolean;
  services: boolean;
  digitalProducts: boolean;
  
  // পেমেন্ট
  wallet: boolean;
  securePay: boolean;
  paymentAnalytics: boolean;
  escrow: boolean;
  
  // অ্যাডভান্সড
  resellerSystem: boolean;
  creatorDashboard: boolean;
  onlineStoreBuilder: boolean;
  referralSystem: boolean;
  loyaltyProgram: boolean;
  kycVerification: boolean;
  disputeCenter: boolean;
  
  // সেলার/অ্যাডমিন
  sellerDashboard: boolean;
  advancedAdminFeatures: boolean;
}
```

- LocalStorage-এ সেভ হবে
- ডিফল্ট MVP সেটিংস থাকবে
- `isFeatureEnabled(featureKey)` ফাংশন প্রদান করবে

---

#### 2. অ্যাডমিন UI: MVPFeatureControl

**ফাইল:** `src/components/admin/MVPFeatureControl.tsx`

- ক্যাটাগরি অনুযায়ী গ্রুপ করা Switch কম্পোনেন্ট
- প্রতিটি ফিচারের জন্য নাম, বিবরণ এবং টগল
- "MVP প্রিসেট" বাটন - এক ক্লিকে সব অপ্রয়োজনীয় ফিচার বন্ধ
- "সব চালু করুন" বাটন - সব ফিচার অন
- সেভ করলে toast নোটিফিকেশন

---

#### 3. অ্যাডমিন ড্যাশবোর্ড আপডেট

**ফাইল:** `src/pages/AdminDashboard.tsx`

- সাইডবারে নতুন আইটেম: "MVP কন্ট্রোল"
- `activeModule === 'mvp-control'` এ `<MVPFeatureControl />` রেন্ডার

---

#### 4. ইউজার অ্যাপে কন্ডিশনাল রেন্ডারিং

**ফাইল পরিবর্তন:**

| ফাইল | পরিবর্তন |
|------|----------|
| `src/App.tsx` | `FeatureConfigProvider` wrap করা |
| `src/components/navbar/BottomNav.tsx` | ওয়ালেট/ফিচার কন্ডিশনাল |
| `src/components/sidebar/SidebarDrawer.tsx` | মেনু আইটেম কন্ডিশনাল |
| `src/RoutesConfig.tsx` | রাউট কন্ডিশনাল রেন্ডার |
| `src/pages/Index.tsx` | DigitalProductsSection কন্ডিশনাল |

**উদাহরণ - BottomNav:**

```tsx
const { isFeatureEnabled } = useFeatureConfig();

const navLinks = [
  { title: 'হোম', path: '/', icon: <Home />, feature: null }, // সবসময় দেখাবে
  { title: 'রেন্ট', path: '/rentals', icon: <Building />, feature: 'rentals' },
  { title: 'সার্ভিস', path: '/services', icon: <Search />, feature: 'services' },
  { title: 'মার্কেটপ্লেস', path: '/marketplace', icon: <ShoppingBag />, feature: 'marketplace' },
];

// ফিল্টার - শুধু enabled ফিচার দেখাবে
const visibleLinks = navLinks.filter(link => 
  link.feature === null || isFeatureEnabled(link.feature)
);
```

**উদাহরণ - SidebarDrawer:**

```tsx
// ওয়ালেট মেনু শুধু তখনই দেখাবে যখন wallet ফিচার enabled
{isFeatureEnabled('wallet') && (
  <CollapsibleMenuSection 
    title="পেমেন্ট এবং ট্রানজেকশন" 
    items={paymentMenuItems} 
  />
)}

// রেফারেল সিস্টেম
{isFeatureEnabled('referralSystem') && <ReferralSystem />}
```

**উদাহরণ - RoutesConfig:**

```tsx
// ওয়ালেট রাউট শুধু যখন enabled
{isFeatureEnabled('wallet') && (
  <Route path="/wallet" element={<Wallet />} />
)}

// SecurePay রাউট
{isFeatureEnabled('securePay') && (
  <>
    <Route path="/securepay" element={<SecurePay />} />
    <Route path="/securepay/creator" element={<SecurePayCreator />} />
  </>
)}
```

---

### ফাইল তালিকা

| ফাইল | অ্যাকশন |
|------|--------|
| `src/context/FeatureConfigContext.tsx` | নতুন তৈরি |
| `src/components/admin/MVPFeatureControl.tsx` | নতুন তৈরি |
| `src/pages/AdminDashboard.tsx` | আপডেট - নতুন সাইডবার আইটেম |
| `src/App.tsx` | আপডেট - Provider যোগ |
| `src/components/navbar/BottomNav.tsx` | আপডেট - কন্ডিশনাল নেভ |
| `src/components/sidebar/SidebarDrawer.tsx` | আপডেট - কন্ডিশনাল মেনু |
| `src/RoutesConfig.tsx` | আপডেট - কন্ডিশনাল রাউট |
| `src/pages/Index.tsx` | আপডেট - কন্ডিশনাল সেকশন |

---

### ডিফল্ট MVP সেটিংস

```typescript
const defaultMVPConfig: FeatureConfig = {
  // MVP তে চালু থাকবে
  marketplace: true,
  rentals: true,
  services: true,
  sellerDashboard: true,
  
  // MVP তে বন্ধ থাকবে
  digitalProducts: false,
  wallet: false,
  securePay: false,
  paymentAnalytics: false,
  escrow: false,
  resellerSystem: false,
  creatorDashboard: false,
  onlineStoreBuilder: false,
  referralSystem: false,
  loyaltyProgram: false,
  kycVerification: false,
  disputeCenter: false,
  advancedAdminFeatures: false,
};
```

---

### কারিগরি বিবরণ

#### Context Hook Usage

```typescript
// যেকোনো কম্পোনেন্টে ব্যবহার
import { useFeatureConfig } from '@/context/FeatureConfigContext';

const MyComponent = () => {
  const { isFeatureEnabled, featureConfig, updateFeature } = useFeatureConfig();
  
  if (!isFeatureEnabled('wallet')) {
    return null; // ফিচার বন্ধ থাকলে কিছু রেন্ডার করবে না
  }
  
  return <WalletComponent />;
};
```

#### LocalStorage Key

```typescript
const FEATURE_CONFIG_KEY = 'app_feature_config';
```

#### Feature Toggle হলে কি হবে

1. অ্যাডমিন Switch টগল করে
2. Context স্টেট আপডেট হয়
3. LocalStorage-এ সেভ হয়
4. পুরো অ্যাপে রি-রেন্ডার ট্রিগার হয়
5. disabled ফিচার সব জায়গা থেকে হাইড হয়ে যায়

---

### সুবিধা

1. **সহজ MVP লঞ্চ**: এক ক্লিকে অপ্রয়োজনীয় ফিচার বন্ধ
2. **ফ্লেক্সিবল**: যেকোনো সময় ফিচার চালু/বন্ধ করা যায়
3. **নো কোড ডিলিট**: কোড থাকবে, শুধু UI থেকে হাইড
4. **ইউজার এক্সপেরিয়েন্স**: ক্লিন, সিম্পল ইন্টারফেস
5. **গ্র্যাজুয়াল রোলআউট**: ফেজ বাই ফেজ ফিচার অন করা সম্ভব

