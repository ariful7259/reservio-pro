
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);

export const mockEvents = [
  {
    id: 'event-1',
    title: 'টেক স্টার্টআপ মিটআপ',
    description: 'ঢাকার টেক স্টার্টআপ কমিউনিটির জন্য একটি নেটওয়ার্কিং ইভেন্ট। নতুন আইডিয়া শেয়ার করুন, অন্যান্য উদ্যোক্তাদের সাথে দেখা করুন এবং বাংলাদেশের টেক ইকোসিস্টেম সম্পর্কে আরও জানুন।',
    date: tomorrow.toISOString(),
    time: '18:00 - 21:00',
    location: 'বসুন্ধরা সিটি, ঢাকা',
    category: 'টেকনোলজি',
    maxAttendees: 50,
    createdBy: {
      id: '1',
      name: 'আকাশ আহমেদ',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    attendees: [
      {
        id: '1',
        name: 'আকাশ আহমেদ',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: '2',
        name: 'ফারহানা খান',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      {
        id: '3',
        name: 'রাকিব হাসান',
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    ],
    isNearby: true,
    isFeatured: true,
    isSaved: false
  },
  {
    id: 'event-2',
    title: 'ডিজিটাল মার্কেটিং ওয়ার্কশপ',
    description: 'ডিজিটাল মার্কেটিংয়ের মূল বিষয়গুলো শিখুন - সোশ্যাল মিডিয়া স্ট্র্যাটেজি, SEO, কন্টেন্ট মার্কেটিং, এবং পেইড এডভারটাইজিং নিয়ে আলোচনা করা হবে। সাথে থাকবে হ্যান্ডস-অন ওয়ার্কশপ সেশন।',
    date: nextWeek.toISOString(),
    time: '10:00 - 16:00',
    location: 'গুলশান-২, ঢাকা',
    category: 'ব্যবসা',
    maxAttendees: 30,
    createdBy: {
      id: '2',
      name: 'ফারহানা খান',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    attendees: [
      {
        id: '2',
        name: 'ফারহানা খান',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      {
        id: '4',
        name: 'সাদিয়া জাহান',
        avatar: 'https://i.pravatar.cc/150?img=10'
      }
    ],
    isNearby: true,
    isFeatured: false,
    isSaved: false
  },
  {
    id: 'event-3',
    title: 'বুক ক্লাব মিটিং',
    description: 'এই মাসের বই "ফেলুদা সমগ্র" নিয়ে আলোচনা করা হবে। বইপ্রেমীদের জন্য একটি আড্ডা। নতুন লেখকদের সাথে পরিচিত হওয়া এবং বাংলা সাহিত্য নিয়ে আলোচনা করার সুযোগ।',
    date: today.toISOString(),
    time: '17:00 - 19:00',
    location: 'কাফে রিডমোর, ধানমন্ডি, ঢাকা',
    category: 'সামাজিক',
    maxAttendees: 20,
    createdBy: {
      id: '4',
      name: 'সাদিয়া জাহান',
      avatar: 'https://i.pravatar.cc/150?img=10'
    },
    attendees: [
      {
        id: '4',
        name: 'সাদিয়া জাহান',
        avatar: 'https://i.pravatar.cc/150?img=10'
      },
      {
        id: '5',
        name: 'তানজিলা আক্তার',
        avatar: 'https://i.pravatar.cc/150?img=15'
      },
      {
        id: '7',
        name: 'হাসান মাহমুদ',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      {
        id: '9',
        name: 'ফাহিম রহমান',
        avatar: 'https://i.pravatar.cc/150?img=7'
      }
    ],
    isNearby: false,
    isFeatured: false,
    isSaved: false
  },
  {
    id: 'event-4',
    title: 'আইটি ক্যারিয়ার সেমিনার',
    description: 'বাংলাদেশে সফটওয়্যার ইঞ্জিনিয়ারিং ক্যারিয়ার নিয়ে ওরিয়েন্টেশন সেমিনার। শিক্ষার্থী এবং নবীন প্রফেশনালদের জন্য ক্যারিয়ার গাইডেন্স এবং আইটি সেক্টরে চাকরির সুযোগ নিয়ে আলোচনা করা হবে।',
    date: tomorrow.toISOString(),
    time: '15:00 - 18:00',
    location: 'আইইউবিএটি অডিটোরিয়াম, উত্তরা, ঢাকা',
    category: 'এডুকেশনাল',
    maxAttendees: 100,
    createdBy: {
      id: '3',
      name: 'রাকিব হাসান',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    attendees: [
      {
        id: '3',
        name: 'রাকিব হাসান',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      {
        id: '6',
        name: 'তানভীর আহমেদ',
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      {
        id: '8',
        name: 'নাফিসা আলী',
        avatar: 'https://i.pravatar.cc/150?img=9'
      }
    ],
    isNearby: true,
    isFeatured: true,
    isSaved: false
  },
  {
    id: 'event-5',
    title: 'মিউজিক ফেস্টিভাল',
    description: 'বাংলাদেশের শীর্ষস্থানীয় ব্যান্ড এবং সঙ্গীতশিল্পীদের নিয়ে একটি মিউজিক ফেস্টিভাল। রক, পপ, ফোক এবং ফিউশন সঙ্গীতের আয়োজন এবং সাংস্কৃতিক অনুষ্ঠান।',
    date: nextWeek.toISOString(),
    time: '16:00 - 22:00',
    location: 'আর্মি স্টেডিয়াম, ঢাকা',
    category: 'বিনোদন',
    maxAttendees: 500,
    createdBy: {
      id: '5',
      name: 'তানজিলা আক্তার',
      avatar: 'https://i.pravatar.cc/150?img=15'
    },
    attendees: [
      {
        id: '1',
        name: 'আকাশ আহমেদ',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: '2',
        name: 'ফারহানা খান',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      {
        id: '5',
        name: 'তানজিলা আক্তার',
        avatar: 'https://i.pravatar.cc/150?img=15'
      },
      {
        id: '9',
        name: 'ফাহিম রহমান',
        avatar: 'https://i.pravatar.cc/150?img=7'
      }
    ],
    isNearby: false,
    isFeatured: true,
    isSaved: false
  }
];
