// Simple local database using localStorage

// Define types for our data
export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
  buttonHref?: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  detailedInfo: string;
  features: string[];
}

export interface Client {
  id: number;
  name: string;
  logo: string;
  description: string;
}

export interface ClientCategory {
  id: string;
  name: string;
  clients: Client[];
}

export interface Image {
  id: number;
  name: string;
  url: string;
  section: string;
  uploadedAt: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  contactInfo: {
    address: string;
    email: string;
    phone: string;
    mapIframe: string;
  };
}

// Database keys
const DB_KEYS = {
  SLIDES: "wems_slides",
  PARTNERS: "wems_partners",
  SERVICES: "wems_services",
  CLIENT_CATEGORIES: "wems_client_categories",
  IMAGES: "wems_images",
  CONTACT: "wems_contact",
  SITE_LOGO: "wems_site_logo",
};

// Generic functions to save and load data
const saveData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to ${key}:`, error);
  }
};

const loadData = <T>(key: string, defaultData: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultData;
  } catch (error) {
    console.error(`Error loading data from ${key}:`, error);
    return defaultData;
  }
};

// Specific functions for each data type
export const saveSlides = (slides: Slide[]): void => {
  saveData(DB_KEYS.SLIDES, slides);
};

export const loadSlides = (defaultSlides: Slide[]): Slide[] => {
  return loadData(DB_KEYS.SLIDES, defaultSlides);
};

export const savePartners = (partners: Partner[]): void => {
  saveData(DB_KEYS.PARTNERS, partners);
};

export const loadPartners = (defaultPartners: Partner[]): Partner[] => {
  return loadData(DB_KEYS.PARTNERS, defaultPartners);
};

export const saveServices = (services: Service[]): void => {
  saveData(DB_KEYS.SERVICES, services);
};

export const loadServices = (defaultServices: Service[]): Service[] => {
  return loadData(DB_KEYS.SERVICES, defaultServices);
};

export const saveClientCategories = (categories: ClientCategory[]): void => {
  saveData(DB_KEYS.CLIENT_CATEGORIES, categories);
};

export const loadClientCategories = (
  defaultCategories: ClientCategory[],
): ClientCategory[] => {
  return loadData(DB_KEYS.CLIENT_CATEGORIES, defaultCategories);
};

export const saveImages = (images: Image[]): void => {
  saveData(DB_KEYS.IMAGES, images);
};

export const loadImages = (defaultImages: Image[]): Image[] => {
  return loadData(DB_KEYS.IMAGES, defaultImages);
};

export const saveContactData = (contactData: ContactData): void => {
  saveData(DB_KEYS.CONTACT, contactData);
};

export const loadContactData = (
  defaultContactData: ContactData,
): ContactData => {
  return loadData(DB_KEYS.CONTACT, defaultContactData);
};

export const saveSiteLogo = (logoUrl: string): void => {
  saveData(DB_KEYS.SITE_LOGO, { url: logoUrl });
  // Dispatch a storage event to notify other components
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: DB_KEYS.SITE_LOGO,
      newValue: JSON.stringify({ url: logoUrl }),
      storageArea: localStorage,
    }),
  );
};

export const loadSiteLogo = (defaultLogoUrl: string): string => {
  const data = loadData(DB_KEYS.SITE_LOGO, { url: defaultLogoUrl });
  return data.url;
};
