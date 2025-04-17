import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  RefreshCw,
  Image,
  XCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearGeneratedImage } from "@/redux/reducers";
import { generateImage, getAllInfluencers } from "@/redux/actions";
import ImageDownloader from "@/components/ImageDownloader";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
const PhotoStyles = [
  { key: "realistic", value: "Realistic Photo" },
  { key: "studio", value: "Studio Photo" },
  { key: "vintage", value: "Vintage" },
  { key: "minimalist", value: "Minimalist" },
  { key: "vibrant", value: "Vibrant" },
];

const GenerateImage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [resultLiked, setResultLiked] = useState<boolean | undefined>(
    undefined
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [publicAllowed, setPublicAllowed] = useState(true);
  const [influencerImage, setInfluencerImage] = useState<string | null>(null);
  const [influencerId, setInfluencerId] = useState<string | null>(null);
  const influencers = useAppSelector((state) => state.global.influencers);
  const generatedImage = useAppSelector((state) => state.global.generatedImage);
  const [photoStyle, setPhotoStyle] = useState<string>(PhotoStyles[0].key);
  const loading = useAppSelector((state) => state.global.loading);
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [sceneDescription, setSceneDescription] = useState("");
  const dispatch = useAppDispatch();
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (influencers.length === 0) {
      dispatch(getAllInfluencers());
    }
  }, []);

  const handleGenerate = () => {
    toast.info("Generating image...", {
      description: "Please wait while we create your ad image",
    });
    dispatch(
      generateImage({
        file: selectedFile,
        description,
        photoStyle,
        productName,
        sceneDescription,
        publicAllowed,
        influencerImage,
      })
    );
  };

  const handleReset = () => {
    dispatch(clearGeneratedImage());
    setPhotoStyle(PhotoStyles[0].key);
    setDescription("");
    setProductName("");
    setSceneDescription("");
    setPublicAllowed(true);
    setSelectedFile(null);
    setUploadedImage(null);
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
                  <Label htmlFor="product-image">Product Image *</Label>
                  {uploadedImage ? (
                    <div className="relative aspect-square rounded-md overflow-hidden border border-border">
                      <img
                        src={uploadedImage}
                        alt="Uploaded product"
                        className="w-full h-full object-contain"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setUploadedImage(null);
                          setSelectedFile(null);
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-muted-foreground/20 rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-all"
                      onClick={() =>
                        document.getElementById("product-image")?.click()
                      }
                    >
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
                  <Label htmlFor="style">Select an Influencer (optional)</Label>
                  <div className="flex flex-row gap-x-2 overflow-scroll flex-nowrap max-w-fit">
                    {influencers.map((influencer) => (
                      <div
                        onClick={() => {
                          if (influencer.id === influencerId) {
                            setInfluencerId(null);
                            setInfluencerImage(null);
                          } else {
                            setInfluencerId(influencer.id);
                            setInfluencerImage(influencer.images[0]);
                          }
                        }}
                        className={cn(
                          "flex flex-col  min-w-40 rounded-lg cursor-pointer relative group"
                        )}
                      >
                        <div className="relative">
                          <img
                            className={cn(
                              "w-full object-cover border-2 rounded-lg",
                              influencer.id === influencerId
                                ? "border-primary"
                                : "border-white"
                            )}
                            src={influencer.images[0]}
                            alt={influencer.name}
                          />

                          {/* Hover overlay - absolute positioned on top of the image */}
                          <div className="absolute inset-0 bg-black bg-opacity-70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-2 text-white overflow-y-auto">
                            <small>
                              <b>Name:</b> <i>{influencer.name}</i>
                            </small>
                            <small>
                              <b>Bio:</b> <i>{influencer.social_media_bio}</i>
                            </small>
                            <small>
                              <b>Age:</b> <i>{influencer.age}</i>
                            </small>
                            <small>
                              <b>From:</b>{" "}
                              <i>{influencer.background.birthplace}</i>
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <Select
                    value={influencerId}
                    onValueChange={(value) => {
                      setInfluencerId(value);
                      console.log("value: ", value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an Influencer" />
                    </SelectTrigger>
                    <SelectContent>
                      {influencers.map((influencer) => (
                        <SelectItem key={influencer.id} value={influencer.id}>
                          <div className="flex flex-row items-center gap-x-2">
                            <img
                              className="w-24 object-cover rounded-lg"
                              src={influencer.images[0]}
                            />
                            <div className="flex flex-col text-lg font-normal">
                              <span className="">{influencer.name}</span>
                              <span className="">
                                {influencer.social_media_bio}
                              </span>
                              <span className="">{influencer.age}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name *</Label>
                  <Input
                    id="product-name"
                    placeholder="e.g. Smart Water Bottle"
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.currentTarget.value);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-description">
                    Product Description
                  </Label>
                  <Textarea
                    id="product-description"
                    placeholder="Briefly describe your product..."
                    rows={3}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.currentTarget.value);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scene-description">
                    Ad Scene Description *
                  </Label>
                  <Textarea
                    id="scene-description"
                    placeholder="Describe how you want the product to be showcased..."
                    rows={4}
                    value={sceneDescription}
                    onChange={(e) => {
                      setSceneDescription(e.currentTarget.value);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Style</Label>
                  <Select
                    value={photoStyle}
                    onValueChange={(value) => {
                      setPhotoStyle(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {PhotoStyles.map((style) => (
                        <SelectItem key={style.key} value={style.key}>
                          {style.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 flex-1 justify-between">
                  <Label htmlFor="public-allowed">
                    Allow other users to see generated image
                  </Label>
                  <Switch
                    id="public-allowed"
                    name="public_allowed"
                    checked={publicAllowed}
                    onChange={(e: any) => {
                      setPublicAllowed(e.currentTarget.checked);
                    }}
                  />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-teal"
                  onClick={handleGenerate}
                  disabled={
                    loading ||
                    !(uploadedImage || sceneDescription || productName)
                  }
                >
                  {loading ? (
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
                  <div className="flex flex-col">
                    <div className="relative rounded-md overflow-hidden border group border-border bg-muted/20">
                      <img
                        src={generatedImage}
                        alt="Generated marketing"
                        className="w-full object-contain"
                      />
                      <div className="absolute bottom-3 w-full px-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-row items-center justify-between">
                        <ThumbsUp
                          color="black"
                          size={30}
                          className={cn(
                            "cursor-pointer",
                            resultLiked ? "fill-primary" : "fill-white"
                          )}
                          onClick={() => setResultLiked(true)}
                        />
                        <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                          <span className="font-medium text-white">
                            Good result ?
                          </span>
                        </div>

                        <ThumbsDown
                          onClick={() => setResultLiked(false)}
                          color="black"
                          size={30}
                          className={cn(
                            "cursor-pointer",
                            resultLiked === false
                              ? "fill-primary"
                              : "fill-white"
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" onClick={handleGenerate}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                      <ImageDownloader
                        base64Image={generatedImage}
                        altText="generated image"
                        fileName={productName}
                        imageType="png"
                      />
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
