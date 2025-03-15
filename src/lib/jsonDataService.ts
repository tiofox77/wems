import {
  Slide,
  Partner,
  Service,
  ClientCategory,
  ContactData,
  AboutData,
  MissionVisionData,
  SiteSettings,
} from "./db";

// Base URL for API endpoints
const API_BASE_URL = "/api";

// Function to fetch data from JSON file
export const fetchDataFromJson = async <T>(endpoint: string): Promise<T> => {
  try {
    // In a real application, this would be an API endpoint
    // For this demo, we're fetching directly from the JSON file
    const response = await fetch("/data.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return endpoint.includes("/")
      ? endpoint.split("/").reduce((obj, key) => obj[key], data)
      : data[endpoint];
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

// Function to save data to JSON file (simulated)
export const saveDataToJson = async <T>(
  endpoint: string,
  data: T,
): Promise<boolean> => {
  try {
    // In a real application, this would be an API endpoint that writes to the JSON file
    // For this demo, we'll simulate a successful save
    console.log(`Saving data to ${endpoint}:`, data);

    // Simulate API call
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // This is just a simulation - in a real app, this would actually save to the server
    return true;
  } catch (error) {
    console.error(`Error saving data to ${endpoint}:`, error);
    return false;
  }
};

// Specific functions for each data type
export const fetchSlides = async (): Promise<Slide[]> => {
  return fetchDataFromJson<Slide[]>("slides");
};

export const saveSlides = async (slides: Slide[]): Promise<boolean> => {
  return saveDataToJson<Slide[]>("slides", slides);
};

export const fetchPartners = async (): Promise<Partner[]> => {
  return fetchDataFromJson<Partner[]>("partners");
};

export const savePartners = async (partners: Partner[]): Promise<boolean> => {
  return saveDataToJson<Partner[]>("partners", partners);
};

export const fetchServices = async (): Promise<Service[]> => {
  return fetchDataFromJson<Service[]>("services");
};

export const saveServices = async (services: Service[]): Promise<boolean> => {
  return saveDataToJson<Service[]>("services", services);
};

export const fetchClientCategories = async (): Promise<ClientCategory[]> => {
  return fetchDataFromJson<ClientCategory[]>("clientCategories");
};

export const saveClientCategories = async (
  categories: ClientCategory[],
): Promise<boolean> => {
  return saveDataToJson<ClientCategory[]>("clientCategories", categories);
};

export const fetchContactData = async (): Promise<ContactData> => {
  return fetchDataFromJson<ContactData>("contact");
};

export const saveContactData = async (
  contactData: ContactData,
): Promise<boolean> => {
  return saveDataToJson<ContactData>("contact", contactData);
};

export const fetchAboutData = async (): Promise<AboutData> => {
  return fetchDataFromJson<AboutData>("about");
};

export const saveAboutData = async (aboutData: AboutData): Promise<boolean> => {
  return saveDataToJson<AboutData>("about", aboutData);
};

export const fetchMissionVisionData = async (): Promise<MissionVisionData> => {
  return fetchDataFromJson<MissionVisionData>("missionVision");
};

export const saveMissionVisionData = async (
  data: MissionVisionData,
): Promise<boolean> => {
  return saveDataToJson<MissionVisionData>("missionVision", data);
};

export const fetchSiteSettings = async (): Promise<SiteSettings> => {
  return fetchDataFromJson<SiteSettings>("siteSettings");
};

export const saveSiteSettings = async (
  settings: SiteSettings,
): Promise<boolean> => {
  return saveDataToJson<SiteSettings>("siteSettings", settings);
};

export const fetchSiteLogo = async (): Promise<string> => {
  const settings = await fetchSiteSettings();
  return settings.logoUrl || "/wems-logo.png";
};

export const saveSiteLogo = async (logoUrl: string): Promise<boolean> => {
  try {
    const settings = await fetchSiteSettings();
    settings.logoUrl = logoUrl;
    return saveSiteSettings(settings);
  } catch (error) {
    console.error("Error saving site logo:", error);
    return false;
  }
};

// Authentication functions
export const authenticateUser = async (
  username: string,
  password: string,
): Promise<boolean> => {
  try {
    // In a real application, this would be an API endpoint that verifies credentials
    // For this demo, we'll check against the users in the JSON file
    const users = await fetchDataFromJson<any[]>("users");

    // Find user with matching username
    const user = users.find((u) => u.username === username);

    if (!user) {
      return false;
    }

    // In a real app, you would use bcrypt to compare hashed passwords
    // For this demo, we'll just compare directly (not secure!)
    // In production, use: return await bcrypt.compare(password, user.password);
    return password === "wems2024"; // Hardcoded for demo purposes
  } catch (error) {
    console.error("Error authenticating user:", error);
    return false;
  }
};
