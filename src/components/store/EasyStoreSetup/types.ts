
export interface StoreTemplate {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  type: 'store' | 'linkinbio';
}

export interface LinkData {
  title: string;
  url: string;
  icon?: string;
}

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
  links: LinkData[];
  category?: string;
}
