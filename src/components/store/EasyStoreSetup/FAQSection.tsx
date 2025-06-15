
import React from "react";

const faqs = [
  {
    q: "কিভাবে নতুন পণ্য যোগ করবো?",
    a: "স্টোর সেটআপ ফর্মে 'নতুন পণ্য যোগ করুন' বাটন ক্লিক করুন এবং প্রয়োজনীয় তথ্য দিন।"
  },
  {
    q: "একাধিক ছবি কিভাবে দিবো?",
    a: "প্রোডাক্ট এডিট অপশনে গ্যালারিতে ছবি আপলোড করুন।"
  },
  {
    q: "Wishlist কিভাবে কাজ করে?",
    a: "হার্ট আইকনে ক্লিক করলেই প্রোডাক্ট wishlist-এ যোগ/বাদ হবে।"
  },
];
const FAQSection: React.FC = () => (
  <section className="bg-gray-50 rounded-lg p-4 my-4" aria-labelledby="faq-heading">
    <h2 id="faq-heading" className="text-lg font-bold mb-3">সাধারণ জিজ্ঞাসা</h2>
    <ul>
      {faqs.map((item, i) => (
        <li key={i} className="mb-2">
          <span className="font-semibold">Q: {item.q}</span>
          <div className="pl-5 text-gray-600">A: {item.a}</div>
        </li>
      ))}
    </ul>
  </section>
);
export default FAQSection;
