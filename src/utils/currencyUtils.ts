
export type Currency = 'BDT' | 'USD' | 'EUR' | 'INR' | 'GBP';

type CurrencyConfig = {
  code: Currency;
  symbol: string;
  name: string;
  exchangeRate: number; // BDT 1 = defined rate
  decimalPlaces: number;
  position: 'before' | 'after';
};

export const currencies: Record<Currency, CurrencyConfig> = {
  BDT: {
    code: 'BDT',
    symbol: '৳',
    name: 'বাংলাদেশী টাকা',
    exchangeRate: 1,
    decimalPlaces: 2,
    position: 'before'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'মার্কিন ডলার',
    exchangeRate: 0.009, // 1 BDT = 0.009 USD
    decimalPlaces: 2,
    position: 'before'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'ইউরো',
    exchangeRate: 0.0083, // 1 BDT = 0.0083 EUR
    decimalPlaces: 2,
    position: 'before'
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'ভারতীয় রুপি',
    exchangeRate: 0.75, // 1 BDT = 0.75 INR
    decimalPlaces: 2,
    position: 'before'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'ব্রিটিশ পাউন্ড',
    exchangeRate: 0.0072, // 1 BDT = 0.0072 GBP
    decimalPlaces: 2,
    position: 'before'
  }
};

/**
 * Convert amount from BDT to the desired currency
 */
export const convertCurrency = (amount: number, toCurrency: Currency): number => {
  const rate = currencies[toCurrency].exchangeRate;
  return amount * rate;
};

/**
 * Format an amount for display with currency symbol
 */
export const formatCurrency = (amount: number, currency: Currency = 'BDT'): string => {
  const { symbol, decimalPlaces, position } = currencies[currency];
  
  const formattedAmount = amount.toFixed(decimalPlaces);
  
  if (position === 'before') {
    return `${symbol}${formattedAmount}`;
  } else {
    return `${formattedAmount}${symbol}`;
  }
};

/**
 * Create a locale-friendly formatted currency with Bengali digits
 */
export const formatCurrencyBN = (amount: number, currency: Currency = 'BDT'): string => {
  const { symbol, decimalPlaces, position } = currencies[currency];
  
  // Convert to Bengali digits
  const formattedAmount = amount.toFixed(decimalPlaces)
    .replace(/0/g, '০')
    .replace(/1/g, '১')
    .replace(/2/g, '২')
    .replace(/3/g, '৩')
    .replace(/4/g, '৪')
    .replace(/5/g, '৫')
    .replace(/6/g, '৬')
    .replace(/7/g, '৭')
    .replace(/8/g, '৮')
    .replace(/9/g, '৯');
  
  if (position === 'before') {
    return `${symbol}${formattedAmount}`;
  } else {
    return `${formattedAmount}${symbol}`;
  }
};
