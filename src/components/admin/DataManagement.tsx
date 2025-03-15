import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const DataManagement = () => {
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
      // Simulate exporting data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a dummy JSON with all localStorage data
      const exportData: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("wems_")) {
          try {
            exportData[key] = JSON.parse(localStorage.getItem(key) || "null");
          } catch (e) {
            exportData[key] = localStorage.getItem(key);
          }
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

      setSuccess(
        "Dados exportados com sucesso! Salve este arquivo para importar em outro navegador.",
      );
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

      // Import data into localStorage
      for (const [key, value] of Object.entries(importData)) {
        if (key.startsWith("wems_")) {
          localStorage.setItem(key, JSON.stringify(value));
        }
      }

      setSuccess(
        "Dados importados com sucesso! A página será recarregada para aplicar as alterações.",
      );
      toast({
        title: "Importação concluída",
        description: "Dados importados com sucesso!",
      });

      // Reload the page after a short delay to apply the imported data
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
        <CardTitle>Gerenciamento de Dados</CardTitle>
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
              usar este arquivo para importar os dados em outro navegador ou
              como backup.
            </p>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full sm:w-auto mt-2"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Exportando..." : "Exportar Dados"}
            </Button>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <h3 className="text-lg font-medium">Importar Dados</h3>
            <p className="text-sm text-muted-foreground">
              Importe dados de um arquivo JSON exportado anteriormente. Isso
              substituirá todos os dados atuais.
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
                {isImporting ? "Importando..." : "Selecionar Arquivo"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <strong>Atenção:</strong> A importação substituirá todos os dados
              atuais. Certifique-se de fazer um backup antes de importar.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagement;
