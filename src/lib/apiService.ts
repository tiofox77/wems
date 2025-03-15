// This file simulates a backend API service
// In a real application, these functions would make actual API calls to a server

// Base URL for API endpoints
const API_BASE_URL = "/api";

// Simulated API response delay (ms)
const SIMULATED_DELAY = 500;

// Generic function to simulate an API call
const simulateApiCall = async <T>(
  endpoint: string,
  method: string,
  data?: any,
): Promise<T> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

  // Log the API call (for debugging)
  console.log(`API ${method} to ${endpoint}:`, data || "No data");

  // In a real application, this would be a fetch or axios call to a real API
  // For this demo, we'll simulate success and return the data
  if (method === "GET") {
    try {
      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const jsonData = await response.json();
      return endpoint.includes("/")
        ? endpoint.split("/").reduce((obj, key) => obj[key], jsonData)
        : jsonData[endpoint];
    } catch (error) {
      console.error(`Error in API ${method} to ${endpoint}:`, error);
      throw error;
    }
  } else {
    // For POST, PUT, DELETE, we'll just simulate success
    // In a real app, this would update the server-side JSON file
    return { success: true, data } as unknown as T;
  }
};

// API functions for different data types
export const api = {
  // Slides
  getSlides: () => simulateApiCall("slides", "GET"),
  updateSlides: (slides: any[]) => simulateApiCall("slides", "PUT", slides),

  // About
  getAbout: () => simulateApiCall("about", "GET"),
  updateAbout: (about: any) => simulateApiCall("about", "PUT", about),

  // Mission & Vision
  getMissionVision: () => simulateApiCall("missionVision", "GET"),
  updateMissionVision: (data: any) =>
    simulateApiCall("missionVision", "PUT", data),

  // Services
  getServices: () => simulateApiCall("services", "GET"),
  updateServices: (services: any[]) =>
    simulateApiCall("services", "PUT", services),
  createService: (service: any) => simulateApiCall("services", "POST", service),
  deleteService: (id: number) => simulateApiCall(`services/${id}`, "DELETE"),

  // Client Categories
  getClientCategories: () => simulateApiCall("clientCategories", "GET"),
  updateClientCategories: (categories: any[]) =>
    simulateApiCall("clientCategories", "PUT", categories),

  // Partners
  getPartners: () => simulateApiCall("partners", "GET"),
  updatePartners: (partners: any[]) =>
    simulateApiCall("partners", "PUT", partners),
  createPartner: (partner: any) => simulateApiCall("partners", "POST", partner),
  deletePartner: (id: number) => simulateApiCall(`partners/${id}`, "DELETE"),

  // Contact
  getContact: () => simulateApiCall("contact", "GET"),
  updateContact: (contact: any) => simulateApiCall("contact", "PUT", contact),

  // Site Settings
  getSiteSettings: () => simulateApiCall("siteSettings", "GET"),
  updateSiteSettings: (settings: any) =>
    simulateApiCall("siteSettings", "PUT", settings),

  // Authentication
  login: async (username: string, password: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

      // In a real app, this would verify credentials against a database
      // For this demo, we'll use hardcoded credentials
      if (username === "admin" && password === "wems2024") {
        return { success: true, token: "simulated-jwt-token" };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An error occurred during login" };
    }
  },
};
