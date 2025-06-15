
import React from "react";
import SecurePayHero from "../components/securepay/SecurePayHero";
import SecurePayPremiumGrid from "../components/securepay/SecurePayPremiumGrid";
import SecurePayHowItWorks from "../components/securepay/SecurePayHowItWorks";
import SecurePayBankSecurity from "../components/securepay/SecurePayBankSecurity";

const SecurePay = () => {
  return (
    <div>
      <SecurePayHero />
      <SecurePayPremiumGrid />
      <SecurePayHowItWorks />
      <SecurePayBankSecurity />
    </div>
  );
};

export default SecurePay;
