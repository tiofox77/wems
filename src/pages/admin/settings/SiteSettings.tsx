import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LogoUploader from "@/components/admin/LogoUploader";
import DataManagement from "@/components/admin/DataManagement";
import JsonDataManager from "@/components/admin/JsonDataManager";
import StorageConfigPanel from "@/components/admin/StorageConfigPanel";

const SiteSettings = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/wemsadmin/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold">Configurações do Site</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LogoUploader />
          <DataManagement />
          <StorageConfigPanel />
          <div className="lg:col-span-2">
            <JsonDataManager />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SiteSettings;
