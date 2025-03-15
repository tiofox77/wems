import { supabase } from "./supabase";
import { isSupabaseConfigured } from "./supabase";
import {
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

// Função para verificar se o Supabase está configurado
const checkSupabaseConfig = () => {
  if (!isSupabaseConfigured()) {
    console.warn(
      "Supabase não está configurado. Os dados serão armazenados localmente.",
    );
    return false;
  }
  return true;
};

// Funções para salvar dados no Supabase
export const saveToSupabase = async <T>(
  tableName: string,
  data: T,
): Promise<boolean> => {
  if (!checkSupabaseConfig()) return false;

  try {
    // Para arrays, usamos upsert em lote
    if (Array.isArray(data)) {
      // Primeiro, excluímos todos os registros existentes
      await supabase.from(tableName).delete().neq("id", 0);

      // Depois, inserimos os novos dados
      const { error } = await supabase.from(tableName).insert(data);

      if (error) throw error;
    } else {
      // Para objetos únicos, usamos upsert
      const { error } = await supabase.from(tableName).upsert(data);

      if (error) throw error;
    }

    return true;
  } catch (error) {
    console.error(`Erro ao salvar dados em ${tableName}:`, error);
    return false;
  }
};

// Funções para carregar dados do Supabase
export const loadFromSupabase = async <T>(
  tableName: string,
  defaultData: T,
): Promise<T> => {
  if (!checkSupabaseConfig()) return defaultData;

  try {
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) throw error;

    return data.length > 0 ? (data as T) : defaultData;
  } catch (error) {
    console.error(`Erro ao carregar dados de ${tableName}:`, error);
    return defaultData;
  }
};

// Funções específicas para cada tipo de dado
export const saveSlides = async (slides: Slide[]): Promise<boolean> => {
  return saveToSupabase("slides", slides);
};

export const loadSlides = async (defaultSlides: Slide[]): Promise<Slide[]> => {
  return loadFromSupabase("slides", defaultSlides);
};

export const savePartners = async (partners: Partner[]): Promise<boolean> => {
  return saveToSupabase("partners", partners);
};

export const loadPartners = async (
  defaultPartners: Partner[],
): Promise<Partner[]> => {
  return loadFromSupabase("partners", defaultPartners);
};

export const saveServices = async (services: Service[]): Promise<boolean> => {
  return saveToSupabase("services", services);
};

export const loadServices = async (
  defaultServices: Service[],
): Promise<Service[]> => {
  return loadFromSupabase("services", defaultServices);
};

export const saveClientCategories = async (
  categories: ClientCategory[],
): Promise<boolean> => {
  return saveToSupabase("client_categories", categories);
};

export const loadClientCategories = async (
  defaultCategories: ClientCategory[],
): Promise<ClientCategory[]> => {
  return loadFromSupabase("client_categories", defaultCategories);
};

export const saveContactData = async (
  contactData: ContactData,
): Promise<boolean> => {
  return saveToSupabase("contact", contactData);
};

export const loadContactData = async (
  defaultContactData: ContactData,
): Promise<ContactData> => {
  return loadFromSupabase("contact", defaultContactData);
};

export const saveAboutData = async (aboutData: AboutData): Promise<boolean> => {
  return saveToSupabase("about", aboutData);
};

export const loadAboutData = async (
  defaultAboutData: AboutData,
): Promise<AboutData> => {
  return loadFromSupabase("about", defaultAboutData);
};

export const saveMissionVisionData = async (
  data: MissionVisionData,
): Promise<boolean> => {
  return saveToSupabase("mission_vision", data);
};

export const loadMissionVisionData = async (
  defaultData: MissionVisionData,
): Promise<MissionVisionData> => {
  return loadFromSupabase("mission_vision", defaultData);
};

export const saveSiteSettings = async (
  settings: SiteSettings,
): Promise<boolean> => {
  return saveToSupabase("site_settings", settings);
};

export const loadSiteSettings = async (
  defaultSettings: SiteSettings,
): Promise<SiteSettings> => {
  return loadFromSupabase("site_settings", defaultSettings);
};

export const saveSiteLogo = async (logoUrl: string): Promise<boolean> => {
  try {
    if (!checkSupabaseConfig()) return false;

    const { error } = await supabase
      .from("site_logo")
      .upsert({ id: 1, url: logoUrl });

    if (error) throw error;

    // Dispatch a custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("logo-updated", { detail: { url: logoUrl } }),
    );

    return true;
  } catch (error) {
    console.error("Erro ao salvar logo do site:", error);
    return false;
  }
};

export const loadSiteLogo = async (defaultLogoUrl: string): Promise<string> => {
  try {
    if (!checkSupabaseConfig()) return defaultLogoUrl;

    const { data, error } = await supabase
      .from("site_logo")
      .select("url")
      .eq("id", 1)
      .single();

    if (error) throw error;

    return data ? data.url : defaultLogoUrl;
  } catch (error) {
    console.error("Erro ao carregar logo do site:", error);
    return defaultLogoUrl;
  }
};

// Contact form submissions
export const saveContactSubmission = async (
  submission: Omit<ContactFormSubmission, "id" | "timestamp" | "status">,
): Promise<string> => {
  try {
    if (!checkSupabaseConfig()) return "";

    const newSubmission: ContactFormSubmission = {
      ...submission,
      id: `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      status: "new",
    };

    const { error } = await supabase
      .from("contact_submissions")
      .insert(newSubmission);

    if (error) throw error;

    return newSubmission.id;
  } catch (error) {
    console.error("Erro ao salvar submissão de contato:", error);
    return "";
  }
};

export const loadContactSubmissions = async (
  defaultSubmissions: ContactFormSubmission[],
): Promise<ContactFormSubmission[]> => {
  return loadFromSupabase("contact_submissions", defaultSubmissions);
};

export const updateContactSubmissionStatus = async (
  id: string,
  status: "new" | "read" | "responded",
): Promise<boolean> => {
  try {
    if (!checkSupabaseConfig()) return false;

    const { error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Erro ao atualizar status da submissão:", error);
    return false;
  }
};

export const deleteContactSubmission = async (id: string): Promise<boolean> => {
  try {
    if (!checkSupabaseConfig()) return false;

    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Erro ao excluir submissão:", error);
    return false;
  }
};
