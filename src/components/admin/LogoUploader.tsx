import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Save, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { saveSiteLogo, loadSiteLogo } from "@/lib/localDb";
import { useLogo } from "@/components/LogoProvider";

interface LogoUploaderProps {
  onLogoChange?: (logoUrl: string) => void;
}

const LogoUploader = ({ onLogoChange }: LogoUploaderProps) => {
  const { toast } = useToast();
  const [logoUrl, setLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { refreshLogo } = useLogo();

  // Load logo from localStorage on component mount
  useEffect(() => {
    const defaultLogo = "/wems-logo.png";
    const savedLogo = loadSiteLogo(defaultLogo);
    setLogoUrl(savedLogo);
    setPreviewUrl(savedLogo);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Create a preview URL for the selected file
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      // Simulate upload process
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        toast({
          title: "Arquivo carregado",
          description:
            "O logo foi carregado com sucesso. Clique em Salvar para aplicar as alterações.",
        });
      }, 1000);
    }
  };

  const handleSave = () => {
    setIsSaving(true);

    // In a real application, you would upload the file to a server here
    // For this demo, we'll just use the preview URL
    const newLogoUrl = previewUrl;

    // Save to localStorage
    saveSiteLogo(newLogoUrl);
    setLogoUrl(newLogoUrl);

    // Refresh logo in context
    refreshLogo();

    // Notify parent component if callback provided
    if (onLogoChange) {
      onLogoChange(newLogoUrl);
    }

    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Logo salvo",
        description:
          "O novo logo foi salvo com sucesso e será usado em todo o site.",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logo do Site</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-48 h-24 border rounded-md flex items-center justify-center overflow-hidden bg-white">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Logo Preview"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/wems-logo.png";
                  }}
                />
              ) : (
                <span className="text-muted-foreground">Sem logo</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo-upload">Carregar novo logo</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
              </div>
              <Button
                onClick={handleSave}
                disabled={isUploading || isSaving || !previewUrl}
                className="min-w-24"
              >
                {isSaving ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Carregue uma imagem para ser usada como logo em todo o site.
              Recomendamos usar uma imagem PNG com fundo transparente.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogoUploader;
