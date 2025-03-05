import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Copy,
  Plus,
  Save,
  Trash2,
  Upload,
  Search,
} from "lucide-react";
import { loadImages, saveImages, Image } from "@/lib/localDb";
import { useToast } from "@/components/ui/use-toast";

const ImagesManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewImage, setViewImage] = useState<Image | null>(null);

  // Initial images data
  const initialImages = [
    {
      id: 1,
      name: "Hero Background 1",
      url: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200&q=80",
      section: "Hero Slider",
      uploadedAt: "20/05/2024",
    },
    {
      id: 2,
      name: "Hero Background 2",
      url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
      section: "Hero Slider",
      uploadedAt: "20/05/2024",
    },
    {
      id: 3,
      name: "Hero Background 3",
      url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80",
      section: "Hero Slider",
      uploadedAt: "20/05/2024",
    },
    {
      id: 4,
      name: "About Image",
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      section: "About",
      uploadedAt: "15/05/2024",
    },
    {
      id: 5,
      name: "Service Example 1",
      url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
      section: "Services",
      uploadedAt: "18/05/2024",
    },
    {
      id: 6,
      name: "Service Example 2",
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      section: "Services",
      uploadedAt: "18/05/2024",
    },
  ];

  const [images, setImages] = useState<Image[]>([]);

  // Load images from localStorage on component mount
  useEffect(() => {
    const savedImages = loadImages(initialImages);
    setImages(savedImages);
  }, []);

  const handleUploadImage = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      const maxId =
        images.length > 0 ? Math.max(...images.map((img) => img.id)) : 0;
      const newImage = {
        id: maxId + 1,
        name: "Nova Imagem",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        section: "Geral",
        uploadedAt: new Date().toLocaleDateString(),
      };
      const updatedImages = [...images, newImage];
      setImages(updatedImages);
      saveImages(updatedImages);
      setIsUploading(false);

      toast({
        title: "Imagem enviada",
        description: "A nova imagem foi adicionada com sucesso.",
      });
    }, 1500);
  };

  const handleDeleteImage = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta imagem?")) {
      const updatedImages = images.filter((image) => image.id !== id);
      setImages(updatedImages);
      saveImages(updatedImages);

      if (viewImage && viewImage.id === id) {
        setViewImage(null);
      }

      toast({
        title: "Imagem excluída",
        description: "A imagem foi excluída com sucesso.",
      });
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copiada",
      description: "URL copiada para a área de transferência!",
    });
  };

  const filteredImages = searchQuery
    ? images.filter(
        (image) =>
          image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          image.section.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : images;

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
            <h1 className="text-3xl font-bold">Gerenciador de Imagens</h1>
          </div>
          <Button onClick={handleUploadImage} disabled={isUploading}>
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Enviando..." : "Enviar Imagem"}
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar imagens por nome ou seção..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              className="hover:shadow-md transition-shadow overflow-hidden"
            >
              <div
                className="h-48 overflow-hidden cursor-pointer"
                onClick={() => setViewImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400?text=Imagem+não+encontrada";
                  }}
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate">{image.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    {image.section}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {image.uploadedAt}
                  </span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyUrl(image.url)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar URL
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image Preview Dialog */}
        <Dialog
          open={!!viewImage}
          onOpenChange={(open) => !open && setViewImage(null)}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{viewImage?.name}</DialogTitle>
              <DialogDescription>
                Seção: {viewImage?.section} | Enviada em:{" "}
                {viewImage?.uploadedAt}
              </DialogDescription>
            </DialogHeader>

            {viewImage && (
              <div className="space-y-4">
                <div className="border rounded-md overflow-hidden">
                  <img
                    src={viewImage.url}
                    alt={viewImage.name}
                    className="w-full object-contain max-h-[60vh]"
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">URL da Imagem</Label>
                  <div className="flex mt-1">
                    <Input id="imageUrl" value={viewImage.url} readOnly />
                    <Button
                      className="ml-2"
                      onClick={() => handleCopyUrl(viewImage.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setViewImage(null)}>
                Fechar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (viewImage) {
                    handleDeleteImage(viewImage.id);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Imagem
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ImagesManager;
