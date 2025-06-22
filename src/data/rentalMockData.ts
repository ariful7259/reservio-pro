
export const featuredListings = [
  {
    id: 1,
    title: "৩ বেডরুম অ্যাপার্টমেন্ট",
    location: "গুলশান, ঢাকা",
    price: "৳২৫,০০০/মাস",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
    category: "apartment",
    latitude: 23.7937,
    longitude: 90.4137
  },
  {
    id: 2,
    title: "অফিস স্পেস",
    location: "বনানী, ঢাকা",
    price: "৳৫০,০০০/মাস",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
    category: "office",
    latitude: 23.7937,
    longitude: 90.3938
  },
  {
    id: 3,
    title: "টয়োটা কোরোলা",
    location: "মিরপুর, ঢাকা",
    price: "৳৫,০০০/দিন",
    image: "https://images.unsplash.com/photo-1494965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
    category: "car",
    latitude: 23.8103,
    longitude: 90.3420
  },
  {
    id: 4,
    title: "ডিএসএলআর ক্যামেরা",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳১,০০০/দিন",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    category: "equipment",
    latitude: 23.7465,
    longitude: 90.3751
  }
];

export const featuredServices = [
  {
    id: 1,
    title: "ইলেকট্রনিক্স মেরামত",
    image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1000&auto=format&fit=crop",
    price: "৳ ৮০০/ঘণ্টা",
    location: "ঢাকা",
    rating: 4.8,
    category: "মেরামত"
  },
  {
    id: 2,
    title: "ফার্নিচার ইন্সটলেশন",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop",
    price: "৳ ১,২০০/সেশন",
    location: "ঢাকা",
    rating: 4.6,
    category: "ইন্সটলেশন"
  },
  {
    id: 3,
    title: "ড্রাইভার সার্ভিস",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
    price: "৳ ১,০০০/দিন",
    location: "ঢাকা",
    rating: 4.7,
    category: "ট্রান্সপোর্ট"
  },
  {
    id: 4,
    title: "ফটোগ্রাফি সার্ভিস",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
    price: "৳ ৩,০০০/সেশন",
    location: "ঢাকা",
    rating: 4.9,
    category: "ইভেন্ট"
  }
];

export const bannerImages = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop'
];

export const generateMockResults = (subcategory: any) => {
  return Array.from({ length: Math.floor(Math.random() * 10) + 5 }, (_, i) => ({
    id: i + 1,
    title: `${subcategory.name} - আইটেম ${i + 1}`,
    location: `ঢাকা, চট্টগ্রাম, সিলেট`.split(', ')[Math.floor(Math.random() * 3)],
    price: `৳${(Math.random() * 50000 + 5000).toFixed(0)}/${Math.random() > 0.5 ? 'মাস' : 'দিন'}`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 200) + 10,
    availability: Math.random() > 0.3,
    featured: Math.random() > 0.7
  }));
};
