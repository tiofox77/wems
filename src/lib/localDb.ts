// Verificar se o Supabase está configurado
import { isSupabaseConfigured } from "./supabase";

// Importar funções de armazenamento local e no servidor
import * as localStorage from "./localDbIndexed";
import * as serverStorage from "./serverStorage";
import * as jsonFileStorage from "./jsonFileStorage";

// Exportar todos os tipos do módulo localDbIndexed
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
} from "./db";

// Exportar constantes
export { DATABASE_TABLES, DATABASE_KEYS } from "./localDbIndexed";

// Função para determinar qual armazenamento usar
const getStorageType = () => {
  // Verificar preferência de armazenamento
  let storageType = "jsonFile"; // Default to jsonFile

  if (typeof localStorage !== "undefined") {
    storageType = localStorage.getItem("wems_storage_type") || "jsonFile";
  }

  // Não fazer verificação adicional aqui, pois isSupabaseConfigured já verifica a preferência
  // e isso pode causar referência circular

  return storageType; // "local", "server" ou "jsonFile"
};

// Função auxiliar para verificar se deve usar armazenamento no servidor (Supabase)
const useServerStorage = () => {
  return getStorageType() === "server";
};

// Função auxiliar para verificar se deve usar armazenamento em arquivo JSON
const useJsonFileStorage = () => {
  return getStorageType() === "jsonFile";
};

// Funções de gerenciamento de dados que escolhem entre armazenamento local e servidor
export const clearData = async (table: string): Promise<boolean> => {
  return localStorage.clearData(table);
};

export const clearAllData = async (): Promise<boolean> => {
  return localStorage.clearAllData();
};

export const getDatabaseInfo = async () => {
  return localStorage.getDatabaseInfo();
};

export const exportAllData = async (): Promise<boolean> => {
  return localStorage.exportAllData();
};

export const importAllData = async (file: File): Promise<boolean> => {
  return localStorage.importAllData(file);
};

// Funções específicas para cada tipo de dado
export const saveSlides = async (
  slides: localStorage.Slide[],
): Promise<boolean> => {
  if (useServerStorage()) {
    return serverStorage.saveSlides(slides);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.saveSlides(slides);
  }
  return localStorage.saveSlides(slides);
};

export const loadSlides = async (
  defaultSlides: localStorage.Slide[],
): Promise<localStorage.Slide[]> => {
  if (useServerStorage()) {
    return serverStorage.loadSlides(defaultSlides);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.loadSlides(defaultSlides);
  }
  return localStorage.loadSlides(defaultSlides);
};

export const savePartners = async (
  partners: localStorage.Partner[],
): Promise<boolean> => {
  if (useServerStorage()) {
    return serverStorage.savePartners(partners);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.savePartners(partners);
  }
  return localStorage.savePartners(partners);
};

export const loadPartners = async (
  defaultPartners: localStorage.Partner[],
): Promise<localStorage.Partner[]> => {
  if (useServerStorage()) {
    return serverStorage.loadPartners(defaultPartners);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.loadPartners(defaultPartners);
  }
  return localStorage.loadPartners(defaultPartners);
};

export const saveServices = async (
  services: localStorage.Service[],
): Promise<boolean> => {
  if (useServerStorage()) {
    return serverStorage.saveServices(services);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.saveServices(services);
  }
  return localStorage.saveServices(services);
};

export const loadServices = async (
  defaultServices: localStorage.Service[],
): Promise<localStorage.Service[]> => {
  if (useServerStorage()) {
    return serverStorage.loadServices(defaultServices);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.loadServices(defaultServices);
  }
  return localStorage.loadServices(defaultServices);
};

export const saveClientCategories = async (
  categories: localStorage.ClientCategory[],
): Promise<boolean> => {
  if (useServerStorage()) {
    return serverStorage.saveClientCategories(categories);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.saveClientCategories(categories);
  }
  return localStorage.saveClientCategories(categories);
};

export const loadClientCategories = async (
  defaultCategories: localStorage.ClientCategory[],
): Promise<localStorage.ClientCategory[]> => {
  if (useServerStorage()) {
    return serverStorage.loadClientCategories(defaultCategories);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.loadClientCategories(defaultCategories);
  }
  return localStorage.loadClientCategories(defaultCategories);
};

export const saveContactData = async (
  contactData: localStorage.ContactData,
): Promise<boolean> => {
  if (useServerStorage()) {
    return serverStorage.saveContactData(contactData);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.saveContactData(contactData);
  }
  return localStorage.saveContactData(contactData);
};

export const loadContactData = async (
  defaultContactData: localStorage.ContactData,
): Promise<localStorage.ContactData> => {
  if (useServerStorage()) {
    return serverStorage.loadContactData(defaultContactData);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.loadContactData(defaultContactData);
  }
  return localStorage.loadContactData(defaultContactData);
};

export const saveAboutData = async (
  aboutData: localStorage.AboutData,
): Promise<boolean> => {
  if (useServerStorage()) {
    return serverStorage.saveAboutData(aboutData);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.saveAboutData(aboutData);
  }
  return localStorage.saveAboutData(aboutData);
};

export const loadAboutData = async (
  defaultAboutData: localStorage.AboutData,
): Promise<localStorage.AboutData> => {
  if (useServerStorage()) {
    return serverStorage.loadAboutData(defaultAboutData);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.loadAboutData(defaultAboutData);
  }
  return localStorage.loadAboutData(defaultAboutData);
};

export const saveMissionVisionData = async (
  data: localStorage.MissionVisionData,
): Promise<boolean> => {
  if (useServerStorage()) {
    return serverStorage.saveMissionVisionData(data);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.saveMissionVisionData(data);
  }
  return localStorage.saveMissionVisionData(data);
};

export const loadMissionVisionData = async (
  defaultData: localStorage.MissionVisionData,
): Promise<localStorage.MissionVisionData> => {
  if (useServerStorage()) {
    return serverStorage.loadMissionVisionData(defaultData);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.loadMissionVisionData(defaultData);
  }
  return localStorage.loadMissionVisionData(defaultData);
};

export const saveSiteSettings = async (
  settings: localStorage.SiteSettings,
): Promise<boolean> => {
  if (useServerStorage()) {
    return serverStorage.saveSiteSettings(settings);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.saveSiteSettings(settings);
  }
  return localStorage.saveSiteSettings(settings);
};

export const loadSiteSettings = async (
  defaultSettings: localStorage.SiteSettings,
): Promise<localStorage.SiteSettings> => {
  if (useServerStorage()) {
    return serverStorage.loadSiteSettings(defaultSettings);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.loadSiteSettings(defaultSettings);
  }
  return localStorage.loadSiteSettings(defaultSettings);
};

export const saveSiteLogo = async (logoUrl: string): Promise<boolean> => {
  if (useServerStorage()) {
    return serverStorage.saveSiteLogo(logoUrl);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.saveSiteLogo(logoUrl);
  }
  return localStorage.saveSiteLogo(logoUrl);
};

export const loadSiteLogo = async (defaultLogoUrl: string): Promise<string> => {
  if (useServerStorage()) {
    return serverStorage.loadSiteLogo(defaultLogoUrl);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.loadSiteLogo(defaultLogoUrl);
  }
  return localStorage.loadSiteLogo(defaultLogoUrl);
};

export const saveContactSubmission = async (
  submission: Omit<
    localStorage.ContactFormSubmission,
    "id" | "timestamp" | "status"
  >,
): Promise<string> => {
  if (useServerStorage()) {
    return serverStorage.saveContactSubmission(submission);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.saveContactSubmission(submission);
  }
  return localStorage.saveContactSubmission(submission);
};

export const loadContactSubmissions = async (
  defaultSubmissions: localStorage.ContactFormSubmission[],
): Promise<localStorage.ContactFormSubmission[]> => {
  if (useServerStorage()) {
    return serverStorage.loadContactSubmissions(defaultSubmissions);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.loadContactSubmissions(defaultSubmissions);
  }
  return localStorage.loadContactSubmissions(defaultSubmissions);
};

export const updateContactSubmissionStatus = async (
  id: string,
  status: "new" | "read" | "responded",
): Promise<boolean> => {
  if (useServerStorage()) {
    return serverStorage.updateContactSubmissionStatus(id, status);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.updateContactSubmissionStatus(id, status);
  }
  return localStorage.updateContactSubmissionStatus(id, status);
};

export const deleteContactSubmission = async (id: string): Promise<boolean> => {
  if (useServerStorage()) {
    return serverStorage.deleteContactSubmission(id);
  } else if (useJsonFileStorage()) {
    return jsonFileStorage.deleteContactSubmission(id);
  }
  return localStorage.deleteContactSubmission(id);
};
