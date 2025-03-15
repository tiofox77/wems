import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, AlertCircle, Check, Database } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const JsonDataManager = () => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);
    setSuccess(null);

    try {
      // In a real application, this would fetch the entire database JSON
      // For this demo, we'll just fetch the data.json file
      try {
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();

        // Create a JSON string from the data
        const jsonData = JSON.stringify(data, null, 2);

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

        setSuccess(
          "Dados exportados com sucesso! Salve este arquivo para importar em outro servidor.",
        );
      } catch (fetchError) {
        console.error("Error fetching data.json:", fetchError);

        // Fallback to creating a dummy JSON file
        const dummyData = {
          slides: [],
          partners: [],
          services: [],
          clientCategories: [],
          contact: {},
          about: {},
          missionVision: {},
          siteSettings: {},
        };

        // Create a JSON string from the dummy data
        const jsonData = JSON.stringify(dummyData, null, 2);

        // Create a blob and download link
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        // Create a download link and trigger it
        const a = document.createElement("a");
        a.href = url;
        a.download = `wems_data_template_${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();

        // Clean up
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);

        setSuccess(
          "Template de dados exportado com sucesso! Você pode editar este arquivo e importá-lo posteriormente.",
        );
      }
    } catch (err) {
      console.error("Export error:", err);
      setError(
        "Erro ao exportar dados: " +
          (err instanceof Error ? err.message : String(err)),
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setError(null);
    setSuccess(null);

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

      // In a real application, this would send the data to the server to update the database
      // For this demo, we'll just simulate success
      console.log("Data to import:", importData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(
        "Dados importados com sucesso! Em um ambiente de produção, isso atualizaria o banco de dados JSON no servidor.",
      );

      toast({
        title: "Importação simulada",
        description: "Dados importados com sucesso (simulação)!",
      });
    } catch (err) {
      console.error("Import error:", err);
      setError(
        "Erro ao importar dados: " +
          (err instanceof Error ? err.message : String(err)),
      );
    } finally {
      setIsImporting(false);
      // Reset the file input
      e.target.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Gerenciamento do Banco de Dados JSON
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              <Check className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Exportar Dados</h3>
            <p className="text-sm text-muted-foreground">
              Exporte todos os dados do site para um arquivo JSON. Você pode
              usar este arquivo para importar os dados em outro servidor ou como
              backup.
            </p>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full sm:w-auto mt-2"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Exportando..." : "Exportar Dados JSON"}
            </Button>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <h3 className="text-lg font-medium">Importar Dados</h3>
            <p className="text-sm text-muted-foreground">
              Importe dados de um arquivo JSON exportado anteriormente. Em um
              ambiente de produção, isso atualizaria o banco de dados JSON no
              servidor.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Button
                variant="outline"
                className="relative w-full sm:w-auto"
                disabled={isImporting}
              >
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isImporting}
                />
                <Upload className="h-4 w-4 mr-2" />
                {isImporting ? "Importando..." : "Selecionar Arquivo JSON"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <strong>Nota:</strong> Esta é uma simulação. Em um ambiente de
              produção, os dados seriam enviados para o servidor para atualizar
              o banco de dados JSON.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JsonDataManager;
