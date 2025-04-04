
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, RefreshCw, Download, Image, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from '@/components/DashboardLayout';

const GenerateImage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    toast({
      title: "Generating image...",
      description: "Please wait while we create your marketing image"
    });
    
    setIsGenerating(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setGeneratedImage("https://source.unsplash.com/random/800x800/?product");
      setIsGenerating(false);
      toast({
        title: "Image generated!",
        description: "Your marketing image is ready to download",
      });
    }, 3000);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setGeneratedImage(null);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Generate Images</h1>
          <Button variant="outline" size="sm" onClick={handleReset}>
            Start Over
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-image">Product Image</Label>
                  {uploadedImage ? (
                    <div className="relative aspect-square rounded-md overflow-hidden border border-border">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded product" 
                        className="w-full h-full object-cover"
                      />
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="absolute top-2 right-2" 
                        onClick={() => setUploadedImage(null)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-all" onClick={() => document.getElementById('product-image')?.click()}>
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop your product image
                      </p>
                      <Input 
                        id="product-image" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" placeholder="e.g. Smart Water Bottle" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-description">Product Description</Label>
                  <Textarea 
                    id="product-description" 
                    placeholder="Briefly describe your product..."
                    rows={3} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scene-description">Marketing Scene Description</Label>
                  <Textarea 
                    id="scene-description" 
                    placeholder="Describe how you want the product to be showcased..."
                    rows={4} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Style</Label>
                  <Select defaultValue="realistic">
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic Photo</SelectItem>
                      <SelectItem value="studio">Studio Photo</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-teal"
                  onClick={handleGenerate}
                  disabled={!uploadedImage || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Image className="mr-2 h-4 w-4" />
                      Generate Image
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Result</h2>
                
                {generatedImage ? (
                  <div className="flex-1 flex flex-col">
                    <div className="relative flex-1 rounded-md overflow-hidden border border-border bg-muted/20">
                      <img 
                        src={generatedImage} 
                        alt="Generated marketing" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" onClick={handleGenerate}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                      <Button className="flex-1 bg-brand-purple hover:bg-brand-purple/90">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-muted/20 rounded-md border border-dashed border-muted-foreground/20">
                    <div className="text-center text-muted-foreground">
                      <Image className="h-12 w-12 mx-auto mb-2" />
                      <p>Generated image will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GenerateImage;
