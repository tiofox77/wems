import db, {
  Slide,
  Partner,
  Service,
  ClientCategory,
  Image,
  ContactData,
  AboutData,
  MissionVisionData,
  SiteSettings,
  ContactFormSubmission,
  initDatabase,
} from "./db";

// Re-export types
export type {
  Slide,
  Partner,
  Service,
  ClientCategory,
  Image,
  ContactData,
  AboutData,
  MissionVisionData,
  SiteSettings,
  ContactFormSubmission,
};

// Database tables for reference
export const DATABASE_TABLES = {
  SLIDES: "slides",
  PARTNERS: "partners",
  SERVICES: "services",
  CLIENT_CATEGORIES: "clientCategories",
  IMAGES: "images",
  CONTACT: "contact",
  SITE_LOGO: "siteLogo",
  ABOUT: "about",
  MISSION_VISION: "missionVision",
  SITE_SETTINGS: "siteSettings",
  CONTACT_SUBMISSIONS: "contactSubmissions",
  STRATEGIC_CONSULTING: "strategicConsulting",
  SERVICE_EXAMPLES: "serviceExamples",
  DB_VERSION: "dbVersion",
};

// For backward compatibility
export const DATABASE_KEYS = { ...DATABASE_TABLES };

// Clear specific data
export const clearData = async (table: string): Promise<boolean> => {
  try {
    await db.table(table).clear();
    return true;
  } catch (error) {
    console.error(`Error clearing data from ${table}:`, error);
    return false;
  }
};

// Clear all application data
export const clearAllData = async (): Promise<boolean> => {
  try {
    for (const table of Object.values(DATABASE_TABLES)) {
      await db.table(table).clear();
    }
    return true;
  } catch (error) {
    console.error("Error clearing all data:", error);
    return false;
  }
};

// Export database version info
export const getDatabaseInfo = async () => {
  try {
    const versionRecord = await db.dbVersion.toArray();
    return {
      version:
        versionRecord.length > 0 ? versionRecord[0].version.toString() : "0",
      tables: Object.values(DATABASE_TABLES),
      storage: "indexedDB",
    };
  } catch (error) {
    console.error("Error getting database info:", error);
    return {
      version: "0",
      tables: Object.values(DATABASE_TABLES),
      storage: "indexedDB (error)",
    };
  }
};

// Export all data from IndexedDB to a JSON file
export const exportAllData = async (): Promise<boolean> => {
  try {
    // Create an object to hold all data
    const exportData: Record<string, any> = {};

    // Export data from each table
    for (const tableName of Object.values(DATABASE_TABLES)) {
      try {
        const tableData = await db.table(tableName).toArray();
        exportData[tableName] = tableData;
      } catch (err) {
        console.warn(`Error exporting data from ${tableName}:`, err);
        // Continue with other tables even if one fails
        exportData[tableName] = [];
      }
    }

    // Create a JSON string from the data
    const jsonData = JSON.stringify(exportData, null, 2);

    // Create a blob and download link
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger it
    const a = document.createElement("a");
    a.href = url;
    a.download = `wems_data_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    return true;
  } catch (error) {
    console.error("Error exporting data:", error);
    return false;
  }
};

// Import data from a JSON file into IndexedDB
export const importAllData = async (file: File): Promise<boolean> => {
  try {
    // Read the file
    const fileContent = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });

    // Parse the JSON data
    const importData = JSON.parse(fileContent);

    // Validate the data structure
    if (!importData || typeof importData !== "object") {
      throw new Error("Invalid data format");
    }

    // Clear existing data and import new data for each table
    for (const tableName of Object.values(DATABASE_TABLES)) {
      if (importData[tableName] && Array.isArray(importData[tableName])) {
        try {
          // Clear existing data
          await db.table(tableName).clear();

          // Import new data if there's any
          if (importData[tableName].length > 0) {
            await db.table(tableName).bulkAdd(importData[tableName]);
          }
        } catch (err) {
          console.warn(`Error importing data to ${tableName}:`, err);
          // Continue with other tables even if one fails
        }
      }
    }

    // Also save to localStorage for backward compatibility
    for (const tableName of Object.values(DATABASE_TABLES)) {
      if (importData[tableName]) {
        try {
          const localStorageKey = `wems_${tableName}`;
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(importData[tableName]),
          );
        } catch (err) {
          console.warn(`Error saving to localStorage for ${tableName}:`, err);
        }
      }
    }

    // Dispatch a custom event to notify components to refresh
    window.dispatchEvent(new CustomEvent("wems-data-imported"));

    return true;
  } catch (error) {
    console.error("Error importing data:", error);
    return false;
  }
};

// Specific functions for each data type
export const saveSlides = async (slides: Slide[]): Promise<boolean> => {
  try {
    await db.slides.clear();
    await db.slides.bulkAdd(slides);
    return true;
  } catch (error) {
    console.error("Error saving slides:", error);
    return false;
  }
};

export const loadSlides = async (defaultSlides: Slide[]): Promise<Slide[]> => {
  try {
    const slides = await db.slides.toArray();
    return slides.length > 0 ? slides : defaultSlides;
  } catch (error) {
    console.error("Error loading slides:", error);
    return defaultSlides;
  }
};

export const savePartners = async (partners: Partner[]): Promise<boolean> => {
  try {
    await db.partners.clear();
    await db.partners.bulkAdd(partners);
    return true;
  } catch (error) {
    console.error("Error saving partners:", error);
    return false;
  }
};

export const loadPartners = async (
  defaultPartners: Partner[],
): Promise<Partner[]> => {
  try {
    const partners = await db.partners.toArray();
    return partners.length > 0 ? partners : defaultPartners;
  } catch (error) {
    console.error("Error loading partners:", error);
    return defaultPartners;
  }
};

export const saveServices = async (services: Service[]): Promise<boolean> => {
  try {
    await db.services.clear();
    await db.services.bulkAdd(services);
    return true;
  } catch (error) {
    console.error("Error saving services:", error);
    return false;
  }
};

export const loadServices = async (
  defaultServices: Service[],
): Promise<Service[]> => {
  try {
    const services = await db.services.toArray();
    return services.length > 0 ? services : defaultServices;
  } catch (error) {
    console.error("Error loading services:", error);
    return defaultServices;
  }
};

export const saveClientCategories = async (
  categories: ClientCategory[],
): Promise<boolean> => {
  try {
    await db.clientCategories.clear();
    await db.clientCategories.bulkAdd(categories);
    return true;
  } catch (error) {
    console.error("Error saving client categories:", error);
    return false;
  }
};

export const loadClientCategories = async (
  defaultCategories: ClientCategory[],
): Promise<ClientCategory[]> => {
  try {
    const categories = await db.clientCategories.toArray();
    return categories.length > 0 ? categories : defaultCategories;
  } catch (error) {
    console.error("Error loading client categories:", error);
    return defaultCategories;
  }
};

export const saveImages = async (images: Image[]): Promise<boolean> => {
  try {
    await db.images.clear();
    await db.images.bulkAdd(images);
    return true;
  } catch (error) {
    console.error("Error saving images:", error);
    return false;
  }
};

export const loadImages = async (defaultImages: Image[]): Promise<Image[]> => {
  try {
    const images = await db.images.toArray();
    return images.length > 0 ? images : defaultImages;
  } catch (error) {
    console.error("Error loading images:", error);
    return defaultImages;
  }
};

export const saveContactData = async (
  contactData: ContactData,
): Promise<boolean> => {
  try {
    await db.contact.clear();
    await db.contact.add(contactData);
    return true;
  } catch (error) {
    console.error("Error saving contact data:", error);
    return false;
  }
};

export const loadContactData = async (
  defaultContactData: ContactData,
): Promise<ContactData> => {
  try {
    const contactData = await db.contact.toArray();
    return contactData.length > 0 ? contactData[0] : defaultContactData;
  } catch (error) {
    console.error("Error loading contact data:", error);
    return defaultContactData;
  }
};

export const saveAboutData = async (aboutData: AboutData): Promise<boolean> => {
  try {
    await db.about.clear();
    await db.about.add(aboutData);
    return true;
  } catch (error) {
    console.error("Error saving about data:", error);
    return false;
  }
};

export const loadAboutData = async (
  defaultAboutData: AboutData,
): Promise<AboutData> => {
  try {
    const aboutData = await db.about.toArray();
    return aboutData.length > 0 ? aboutData[0] : defaultAboutData;
  } catch (error) {
    console.error("Error loading about data:", error);
    return defaultAboutData;
  }
};

export const saveMissionVisionData = async (
  data: MissionVisionData,
): Promise<boolean> => {
  try {
    await db.missionVision.clear();
    await db.missionVision.add(data);
    return true;
  } catch (error) {
    console.error("Error saving mission vision data:", error);
    return false;
  }
};

export const loadMissionVisionData = async (
  defaultData: MissionVisionData,
): Promise<MissionVisionData> => {
  try {
    const data = await db.missionVision.toArray();
    return data.length > 0 ? data[0] : defaultData;
  } catch (error) {
    console.error("Error loading mission vision data:", error);
    return defaultData;
  }
};

export const saveSiteSettings = async (
  settings: SiteSettings,
): Promise<boolean> => {
  try {
    await db.siteSettings.clear();
    await db.siteSettings.add(settings);
    return true;
  } catch (error) {
    console.error("Error saving site settings:", error);
    return false;
  }
};

export const loadSiteSettings = async (
  defaultSettings: SiteSettings,
): Promise<SiteSettings> => {
  try {
    const settings = await db.siteSettings.toArray();
    return settings.length > 0 ? settings[0] : defaultSettings;
  } catch (error) {
    console.error("Error loading site settings:", error);
    return defaultSettings;
  }
};

export const saveSiteLogo = async (logoUrl: string): Promise<boolean> => {
  try {
    await db.siteLogo.clear();
    await db.siteLogo.add({ url: logoUrl });

    // Dispatch a custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("logo-updated", { detail: { url: logoUrl } }),
    );

    return true;
  } catch (error) {
    console.error("Error saving site logo:", error);
    return false;
  }
};

export const loadSiteLogo = async (defaultLogoUrl: string): Promise<string> => {
  try {
    const logo = await db.siteLogo.toArray();
    return logo.length > 0 ? logo[0].url : defaultLogoUrl;
  } catch (error) {
    console.error("Error loading site logo:", error);
    return defaultLogoUrl;
  }
};

// Contact form submissions
export const saveContactSubmission = async (
  submission: Omit<ContactFormSubmission, "id" | "timestamp" | "status">,
): Promise<string> => {
  try {
    const newSubmission: ContactFormSubmission = {
      ...submission,
      id: `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      status: "new",
    };

    await db.contactSubmissions.add(newSubmission);
    return newSubmission.id;
  } catch (error) {
    console.error("Error saving contact submission:", error);
    return "";
  }
};

export const loadContactSubmissions = async (
  defaultSubmissions: ContactFormSubmission[],
): Promise<ContactFormSubmission[]> => {
  try {
    const submissions = await db.contactSubmissions.toArray();
    return submissions.length > 0 ? submissions : defaultSubmissions;
  } catch (error) {
    console.error("Error loading contact submissions:", error);
    return defaultSubmissions;
  }
};

export const updateContactSubmissionStatus = async (
  id: string,
  status: "new" | "read" | "responded",
): Promise<boolean> => {
  try {
    await db.contactSubmissions.update(id, { status });
    return true;
  } catch (error) {
    console.error("Error updating submission status:", error);
    return false;
  }
};

export const deleteContactSubmission = async (id: string): Promise<boolean> => {
  try {
    await db.contactSubmissions.delete(id);
    return true;
  } catch (error) {
    console.error("Error deleting submission:", error);
    return false;
  }
};

// Initialize the database
initDatabase();
