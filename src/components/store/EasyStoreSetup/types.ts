export interface StoreData {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  category: string;
}

export interface LinkInBioData {
  displayName: string;
  bio: string;
  profileImage: string;
  links: { title: string; url: string }[];
  category?: string;
}

export interface StoreTemplate {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  type: 'store' | 'linkinbio';
  category: string;
}
// Optionally add accessibility metadata if needed for future extension
