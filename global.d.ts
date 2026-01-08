declare module "*.css"


interface TablePropertyCard {
    id: string;
    title: string;
    type: string;
    purpose: string;
    price: number;
    location: string;
    bedrooms?: number | null;
    bathrooms?: number | null;
    status: string;
    featured: boolean;
    images: string[];
}

interface PropertyProps {
    id: string;
    slug: string;

    title: string;
    description: string;
    type: "apartment" | "house" | "condo" | "townhouse" | "villa" | "studio" | string;
    purpose: "sale" | "rent" | "both";

    pricing: {
        price: number;
        currency: "USD" | "EUR" | "GBP" | string;
        period?: "monthly" | "yearly" | string;
        negotiable?: boolean;
    };
    address: {
        street?: string;
        city: string;
        state?: string;
        country: string;
        zipCode?: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        };
    };

    status: "active" | "pending" | "sold" | "rented" | "draft";
    featured: boolean;
    images: string[];
    amenities: JSON[];

    analytics: {
        views: number;
        favorites: number;
        shares: number;
        inquiries: number;
    }

    details: {
        area: number;
        bedrooms: number;
        bathrooms: number;
        garages: number;
        yearBuilt: number;
        [key: string]: string | number | boolean | null;
    }
}


// address types
interface Regions {
    id: string;
    name: string;
}

interface Districts {
    id: string;
    name: string;
    regionId: string;
}

interface Locations {
    id: string;
    name: string;
    districtId: string;
}

interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;

  type: "apartment" | "house" | "villa" | "condo" | "land" | "commercial";
  purpose: "rent" | "sale" | "both";
  status: "active" | "inactive" | "pending";

  featured: boolean;
  negotiable: boolean;

  rentPrice: string;      // kept as string for currency precision
  salePrice: string;
  currency: "USD" | "UGX" | "EUR";

  rentalPeriod: "daily" | "weekly" | "monthly" | "yearly";

    amenities: {
        bedrooms: number;
        bathrooms: number;
        area: number;
        yearBuilt: number;
  };
  images: string[];

  details: PropertyDetails;

  views: number;
  favorites: number;
  inquiries: number;
  shares: number;

  authorId: string;

  country: string;
  region: string;
  regionId: string;
  district: string;
  districtId: string;
  city: string;
  neighbourhood: string;
  zipCode: string;

  latitude: number | null;
  longitude: number | null;
  locationId: string;

  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


