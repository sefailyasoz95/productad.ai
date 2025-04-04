
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, RefreshCw, Download, Video, XCircle, Play, Pause } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from '@/components/DashboardLayout';

const GenerateVideo = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
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
      title: "Generating video...",
      description: "Please wait while we create your marketing video"
    });
    
    setIsGenerating(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setGeneratedVideo("https://static.videezy.com/system/resources/previews/000/008/145/original/Marketing_B_Roll_with_Office_Workers.mp4");
      setIsGenerating(false);
      toast({
        title: "Video generated!",
        description: "Your marketing video is ready to download",
      });
    }, 5000);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setGeneratedVideo(null);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
    const videoElement = document.getElementById('preview-video') as HTMLVideoElement;
    if (videoElement) {
      if (isPaused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Generate Videos</h1>
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
                  <Label htmlFor="script">Video Script</Label>
                  <Textarea 
                    id="script" 
                    placeholder="Write a script for your marketing video..."
                    rows={5} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Video Duration</Label>
                  <Select defaultValue="short">
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (15 sec)</SelectItem>
                      <SelectItem value="medium">Medium (30 sec)</SelectItem>
                      <SelectItem value="long">Long (60 sec)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Video Style</Label>
                  <Select defaultValue="promotional">
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="explainer">Explainer</SelectItem>
                      <SelectItem value="testimonial">Testimonial</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="influencer">Select Influencer (Optional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="No influencer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No influencer</SelectItem>
                      <SelectItem value="alex">Alex (Lifestyle)</SelectItem>
                      <SelectItem value="taylor">Taylor (Tech)</SelectItem>
                      <SelectItem value="jordan">Jordan (Fitness)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-blue"
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
                      <Video className="mr-2 h-4 w-4" />
                      Generate Video
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                
                {generatedVideo ? (
                  <div className="flex-1 flex flex-col">
                    <div className="relative flex-1 rounded-md overflow-hidden border border-border bg-muted/20">
                      <video 
                        id="preview-video"
                        src={generatedVideo} 
                        className="w-full h-full object-contain"
                        controls
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1" onClick={togglePlayPause}>
                        {isPaused ? (
                          <><Play className="mr-2 h-4 w-4" /> Play</>
                        ) : (
                          <><Pause className="mr-2 h-4 w-4" /> Pause</>
                        )}
                      </Button>
                      <Button className="flex-1" onClick={handleGenerate}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                      <Button className="flex-1 bg-brand-blue hover:bg-brand-blue/90">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-muted/20 rounded-md border border-dashed border-muted-foreground/20">
                    <div className="text-center text-muted-foreground">
                      <Video className="h-12 w-12 mx-auto mb-2" />
                      <p>Generated video will appear here</p>
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

export default GenerateVideo;
