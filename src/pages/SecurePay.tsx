
import React from "react";
import SecurePayHero from "../components/securepay/SecurePayHero";
import SecurePayHowItWorks from "../components/securepay/SecurePayHowItWorks";
import SecurePayBankSecurity from "../components/securepay/SecurePayBankSecurity";

const SecurePay = () => {
  return (
    <div>
      <SecurePayHero />
      <SecurePayHowItWorks />
      <SecurePayBankSecurity />
    </div>
  );
};

export default SecurePay;
