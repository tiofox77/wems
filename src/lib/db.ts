import Dexie from "dexie";

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
  website?: string;
  description?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  detailedInfo: string;
  features: string[];
  order?: number;
  isActive?: boolean;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
  description: string;
  website?: string;
  industry?: string;
}

export interface ClientCategory {
  id: string;
  name: string;
  clients: Client[];
  order?: number;
}

export interface Image {
  id: number;
  name: string;
  url: string;
  section: string;
  uploadedAt: string;
  altText?: string;
  size?: number;
}

export interface ContactData {
  id?: number;
  title: string;
  subtitle: string;
  contactInfo: {
    address: string;
    email: string;
    phone: string;
    mapIframe: string;
    whatsapp?: string;
    workingHours?: string;
  };
}

export interface AboutData {
  id?: number;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  stats?: Array<{ label: string; value: string }>;
}

export interface MissionVisionData {
  id?: number;
  mission: {
    title: string;
    content: string;
    imageUrl?: string;
  };
  vision: {
    title: string;
    content: string;
    imageUrl?: string;
  };
  values?: Array<{ title: string; description: string; icon?: string }>;
}

export interface SiteSettings {
  id?: number;
  siteName: string;
  logoUrl: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  metaTags?: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface ContactFormSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: "new" | "read" | "responded";
}

// Define the database
class WemsDatabase extends Dexie {
  slides!: Dexie.Table<Slide, string>;
  partners!: Dexie.Table<Partner, number>;
  services!: Dexie.Table<Service, number>;
  clientCategories!: Dexie.Table<ClientCategory, string>;
  images!: Dexie.Table<Image, number>;
  contact!: Dexie.Table<ContactData, number>;
  about!: Dexie.Table<AboutData, number>;
  missionVision!: Dexie.Table<MissionVisionData, number>;
  siteSettings!: Dexie.Table<SiteSettings, number>;
  siteLogo!: Dexie.Table<{ id?: number; url: string }, number>;
  contactSubmissions!: Dexie.Table<ContactFormSubmission, string>;
  dbVersion!: Dexie.Table<{ id?: number; version: number }, number>;

  constructor() {
    super("wemsDatabase");
    this.version(1).stores({
      slides: "id",
      partners: "id",
      services: "id",
      clientCategories: "id",
      images: "id",
      contact: "++id",
      about: "++id",
      missionVision: "++id",
      siteSettings: "++id",
      siteLogo: "++id",
      contactSubmissions: "id",
      dbVersion: "++id",
    });
  }
}

export const db = new WemsDatabase();

// Initialize database with version check
export const initDatabase = async (): Promise<void> => {
  try {
    // Check if DB_VERSION exists
    const dbVersionRecord = await db.dbVersion.toArray();
    const CURRENT_DB_VERSION = 1;

    if (dbVersionRecord.length === 0) {
      // If no version record, create it
      await db.dbVersion.add({ version: CURRENT_DB_VERSION });
      console.log("Database initialized with version", CURRENT_DB_VERSION);

      // Migrate data from localStorage if needed
      await migrateFromLocalStorage();
    } else if (dbVersionRecord[0].version < CURRENT_DB_VERSION) {
      // Migration logic could be added here for future versions
      await db.dbVersion.update(dbVersionRecord[0].id!, {
        version: CURRENT_DB_VERSION,
      });
      console.log("Database migrated to version", CURRENT_DB_VERSION);
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Migrate data from localStorage to IndexedDB
const migrateFromLocalStorage = async (): Promise<void> => {
  try {
    // Check if migration has already been done
    const migrationKey = "wems_migration_completed";
    if (localStorage.getItem(migrationKey) === "true") {
      return;
    }

    // Define mapping between localStorage keys and IndexedDB tables
    const tableMapping = {
      wems_slides: db.slides,
      wems_partners: db.partners,
      wems_services: db.services,
      wems_client_categories: db.clientCategories,
      wems_images: db.images,
      wems_contact: db.contact,
      wems_about: db.about,
      wems_mission_vision: db.missionVision,
      wems_site_settings: db.siteSettings,
      wems_site_logo: db.siteLogo,
      wems_contact_submissions: db.contactSubmissions,
    };

    // Migrate each data type
    for (const [localKey, table] of Object.entries(tableMapping)) {
      const localData = localStorage.getItem(localKey);

      if (localData) {
        const parsedData = JSON.parse(localData);

        // Skip empty arrays or objects
        if (Array.isArray(parsedData) && parsedData.length === 0) continue;
        if (
          typeof parsedData === "object" &&
          Object.keys(parsedData).length === 0
        )
          continue;

        // Insert data into IndexedDB
        if (Array.isArray(parsedData)) {
          await table.bulkAdd(parsedData);
        } else {
          await table.add(parsedData);
        }

        console.log(`Successfully migrated ${localKey} data`);
      }
    }

    // Mark migration as completed
    localStorage.setItem(migrationKey, "true");
    console.log("Migration from localStorage completed");
  } catch (error) {
    console.error("Error during migration:", error);
  }
};

// Initialize database on module load
initDatabase();

// Export database for direct access if needed
export default db;
