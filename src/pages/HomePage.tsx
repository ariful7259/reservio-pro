
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">হোম পেজ</h1>
      <p>স্বাগতম আমাদের প্ল্যাটফর্মে</p>
    </div>
  );
};

export default HomePage;
