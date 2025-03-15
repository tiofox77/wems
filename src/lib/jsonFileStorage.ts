import {
  Slide,
  Partner,
  Service,
  ClientCategory,
  ContactData,
  AboutData,
  MissionVisionData,
  SiteSettings,
  ContactFormSubmission,
} from "./db";

// Base URL for API endpoints
const API_BASE_URL = "http://localhost:3001/api";

// Fallback to local storage if server is not available
const handleServerError = async <T>(error: any, defaultData: T): Promise<T> => {
  console.error(
    "Error accessing JSON server, falling back to local storage:",
    error,
  );
  // Save the error state to prevent continuous retries
  localStorage.setItem("json_server_error", "true");

  // Show a more helpful error message
  console.warn(
    "O servidor JSON não está rodando. Reinicie a aplicação com 'npm run dev' para iniciar ambos os servidores simultaneamente. Se o problema persistir, execute 'npm run server' em um terminal separado.",
  );

  return defaultData;
};

// Função para verificar se o servidor JSON está rodando
export const isJsonServerRunning = async (): Promise<boolean> => {
  try {
    // Clear any previous error state
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("json_server_error");
    }

    // Try to connect with a timeout to prevent long waits
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000); // Reduced timeout

    const response = await fetch(`${API_BASE_URL}/data`, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store", // Prevent caching
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.error("Erro ao verificar servidor JSON:", error);
    return false;
  }
};

// Function to fetch data from the server
export const fetchDataFromServer = async <T>(section: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${section}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${section}:`, error);
    throw error;
  }
};

// Function to save data to the server
export const saveDataToServer = async <T>(
  section: string,
  data: T,
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${section}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to save data: ${response.statusText}`);
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error(`Error saving data to ${section}:`, error);
    return false;
  }
};

// Specific functions for each data type
export const saveSlides = async (slides: Slide[]): Promise<boolean> => {
  return saveDataToServer("slides", slides);
};

export const loadSlides = async (defaultSlides: Slide[]): Promise<Slide[]> => {
  try {
    return await fetchDataFromServer<Slide[]>("slides");
  } catch (error) {
    return handleServerError(error, defaultSlides);
  }
};

export const savePartners = async (partners: Partner[]): Promise<boolean> => {
  return saveDataToServer("partners", partners);
};

export const loadPartners = async (
  defaultPartners: Partner[],
): Promise<Partner[]> => {
  try {
    return await fetchDataFromServer<Partner[]>("partners");
  } catch (error) {
    console.error("Error loading partners from server:", error);
    return defaultPartners;
  }
};

export const saveServices = async (services: Service[]): Promise<boolean> => {
  return saveDataToServer("services", services);
};

export const loadServices = async (
  defaultServices: Service[],
): Promise<Service[]> => {
  try {
    return await fetchDataFromServer<Service[]>("services");
  } catch (error) {
    console.error("Error loading services from server:", error);
    return defaultServices;
  }
};

export const saveClientCategories = async (
  categories: ClientCategory[],
): Promise<boolean> => {
  return saveDataToServer("clientCategories", categories);
};

export const loadClientCategories = async (
  defaultCategories: ClientCategory[],
): Promise<ClientCategory[]> => {
  try {
    return await fetchDataFromServer<ClientCategory[]>("clientCategories");
  } catch (error) {
    console.error("Error loading client categories from server:", error);
    return defaultCategories;
  }
};

export const saveContactData = async (
  contactData: ContactData,
): Promise<boolean> => {
  return saveDataToServer("contact", contactData);
};

export const loadContactData = async (
  defaultContactData: ContactData,
): Promise<ContactData> => {
  try {
    return await fetchDataFromServer<ContactData>("contact");
  } catch (error) {
    console.error("Error loading contact data from server:", error);
    return defaultContactData;
  }
};

export const saveAboutData = async (aboutData: AboutData): Promise<boolean> => {
  return saveDataToServer("about", aboutData);
};

export const loadAboutData = async (
  defaultAboutData: AboutData,
): Promise<AboutData> => {
  try {
    return await fetchDataFromServer<AboutData>("about");
  } catch (error) {
    console.error("Error loading about data from server:", error);
    return defaultAboutData;
  }
};

export const saveMissionVisionData = async (
  data: MissionVisionData,
): Promise<boolean> => {
  return saveDataToServer("missionVision", data);
};

export const loadMissionVisionData = async (
  defaultData: MissionVisionData,
): Promise<MissionVisionData> => {
  try {
    return await fetchDataFromServer<MissionVisionData>("missionVision");
  } catch (error) {
    console.error("Error loading mission vision data from server:", error);
    return defaultData;
  }
};

export const saveSiteSettings = async (
  settings: SiteSettings,
): Promise<boolean> => {
  return saveDataToServer("siteSettings", settings);
};

export const loadSiteSettings = async (
  defaultSettings: SiteSettings,
): Promise<SiteSettings> => {
  try {
    return await fetchDataFromServer<SiteSettings>("siteSettings");
  } catch (error) {
    console.error("Error loading site settings from server:", error);
    return defaultSettings;
  }
};

export const saveSiteLogo = async (logoUrl: string): Promise<boolean> => {
  try {
    const settings = await loadSiteSettings({
      id: 1,
      siteName: "WEMS",
      logoUrl: "/wems-logo.png",
    });
    settings.logoUrl = logoUrl;
    return saveSiteSettings(settings);
  } catch (error) {
    console.error("Error saving site logo to server:", error);
    return false;
  }
};

export const loadSiteLogo = async (defaultLogoUrl: string): Promise<string> => {
  try {
    const settings = await loadSiteSettings({
      id: 1,
      siteName: "WEMS",
      logoUrl: defaultLogoUrl,
    });
    return settings.logoUrl || defaultLogoUrl;
  } catch (error) {
    console.error("Error loading site logo from server:", error);
    return defaultLogoUrl;
  }
};

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

    const submissions = await loadContactSubmissions([]);
    submissions.push(newSubmission);

    const success = await saveDataToServer("contactSubmissions", submissions);
    return success ? newSubmission.id : "";
  } catch (error) {
    console.error("Error saving contact submission to server:", error);
    return "";
  }
};

export const loadContactSubmissions = async (
  defaultSubmissions: ContactFormSubmission[],
): Promise<ContactFormSubmission[]> => {
  try {
    return await fetchDataFromServer<ContactFormSubmission[]>(
      "contactSubmissions",
    );
  } catch (error) {
    console.error("Error loading contact submissions from server:", error);
    return defaultSubmissions;
  }
};

export const updateContactSubmissionStatus = async (
  id: string,
  status: "new" | "read" | "responded",
): Promise<boolean> => {
  try {
    const submissions = await loadContactSubmissions([]);
    const updatedSubmissions = submissions.map((submission) =>
      submission.id === id ? { ...submission, status } : submission,
    );

    return saveDataToServer("contactSubmissions", updatedSubmissions);
  } catch (error) {
    console.error("Error updating submission status on server:", error);
    return false;
  }
};

export const deleteContactSubmission = async (id: string): Promise<boolean> => {
  try {
    const submissions = await loadContactSubmissions([]);
    const filteredSubmissions = submissions.filter(
      (submission) => submission.id !== id,
    );

    return saveDataToServer("contactSubmissions", filteredSubmissions);
  } catch (error) {
    console.error("Error deleting submission from server:", error);
    return false;
  }
};
