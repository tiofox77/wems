import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Database,
  HardDrive,
  Server,
  AlertCircle,
  Check,
  FileJson,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const StorageConfigPanel = () => {
  const { toast } = useToast();
  const [isSupabaseAvailable, setIsSupabaseAvailable] = useState(false);
  const [storageType, setStorageType] = useState("local");
  const [isLoading, setIsLoading] = useState(true);
  const [isJsonServerRunning, setIsJsonServerRunning] = useState(false);

  // Verificar se o Supabase está configurado e se o servidor JSON está rodando
  useEffect(() => {
    const checkServices = async () => {
      setIsLoading(true);
      try {
        // Verificar se o servidor JSON está rodando
        try {
          // Use um timeout para evitar que a verificação demore muito
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1000); // Reduced timeout

          const response = await fetch("http://localhost:3001/api/data", {
            method: "HEAD",
            signal: controller.signal,
            cache: "no-store", // Prevent caching
          });

          clearTimeout(timeoutId);
          setIsJsonServerRunning(response.ok);
        } catch (error) {
          console.log("JSON server não está rodando:", error);
          setIsJsonServerRunning(false);
        }

        // Carregar preferência de armazenamento
        const storagePref = localStorage.getItem("wems_storage_type");
        if (storagePref) {
          setStorageType(storagePref);
        } else {
          // Se não houver preferência, usar jsonFile como padrão
          setStorageType("jsonFile");
          localStorage.setItem("wems_storage_type", "jsonFile");
        }

        // Verificar Supabase - fazer isso depois de carregar a preferência
        // para que a verificação leve em conta a preferência atual
        const available = isSupabaseConfigured();
        setIsSupabaseAvailable(available);
      } catch (error) {
        console.error("Erro ao verificar configurações:", error);
        setIsSupabaseAvailable(false);
        setIsJsonServerRunning(false);
        // Manter a preferência atual, não forçar para local
        const currentPref =
          localStorage.getItem("wems_storage_type") || "jsonFile";
        setStorageType(currentPref);
      } finally {
        setIsLoading(false);
      }
    };

    checkServices();

    // Forçar o tipo de armazenamento para jsonFile se não estiver definido
    if (!localStorage.getItem("wems_storage_type")) {
      localStorage.setItem("wems_storage_type", "jsonFile");
    }
  }, []);

  const handleStorageChange = async (type: string) => {
    // Sempre permitir a mudança para jsonFile, mesmo se o servidor não estiver rodando
    // Isso permite que o usuário configure o armazenamento antes de iniciar o servidor
    if (type === "jsonFile") {
      if (!isJsonServerRunning) {
        toast({
          title: "Aviso",
          description:
            "O servidor JSON não está rodando. Os dados serão armazenados localmente até que o servidor seja iniciado.",
        });
      }
    }

    // Verificar se o Supabase está configurado quando tentar mudar para server
    if (type === "server" && !isSupabaseAvailable) {
      toast({
        title: "Erro ao mudar armazenamento",
        description: "O Supabase não está configurado corretamente.",
        variant: "destructive",
      });
      return;
    }

    setStorageType(type);
    localStorage.setItem("wems_storage_type", type);

    let description = "";
    switch (type) {
      case "local":
        description = "localmente no navegador";
        break;
      case "server":
        description = "no servidor Supabase";
        break;
      case "jsonFile":
        description = "no arquivo data.json";
        break;
    }

    toast({
      title: "Configuração de armazenamento atualizada",
      description: `Os dados serão armazenados ${description}.`,
    });

    // Recarregar a página para aplicar as mudanças
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Configuração de Armazenamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!isSupabaseAvailable && storageType === "server" && (
            <Alert
              variant="warning"
              className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                O Supabase não está configurado. Para configurar o Supabase,
                adicione as variáveis de ambiente VITE_SUPABASE_URL e
                VITE_SUPABASE_ANON_KEY.
              </AlertDescription>
            </Alert>
          )}

          {!isJsonServerRunning && storageType === "jsonFile" && (
            <Alert
              variant="warning"
              className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                O servidor JSON não está rodando. Reinicie a aplicação com "npm
                run dev" para iniciar ambos os servidores simultaneamente.
              </AlertDescription>
            </Alert>
          )}

          {isJsonServerRunning && storageType === "jsonFile" && (
            <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              <Check className="h-4 w-4" />
              <AlertDescription>
                O servidor JSON está rodando e disponível para armazenamento de
                dados no arquivo data.json.
              </AlertDescription>
            </Alert>
          )}

          {isSupabaseAvailable && storageType === "server" && (
            <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              <Check className="h-4 w-4" />
              <AlertDescription>
                O Supabase está configurado e disponível para armazenamento de
                dados.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Modo de Armazenamento</h3>

            <RadioGroup
              value={storageType}
              onValueChange={handleStorageChange}
              className="space-y-4"
            >
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="local" id="local" />
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <HardDrive className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="local" className="font-medium">
                      Armazenamento Local
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Dados armazenados no navegador (IndexedDB/localStorage)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    value="server"
                    id="server"
                    disabled={!isSupabaseAvailable}
                  />
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <Server className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="server" className="font-medium">
                      Armazenamento no Supabase
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Dados armazenados no servidor Supabase
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="jsonFile" id="jsonFile" />
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <FileJson className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="jsonFile" className="font-medium">
                      Arquivo data.json
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Dados armazenados no arquivo data.json via API
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            <strong>Nota:</strong> Alterar o modo de armazenamento não transfere
            automaticamente os dados existentes. Use as opções de
            exportação/importação para migrar dados entre os diferentes modos de
            armazenamento.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageConfigPanel;
