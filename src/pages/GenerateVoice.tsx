
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Mic, Download, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';

const GenerateVoice = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [script, setScript] = useState('');
  const { toast } = useToast();
  
  const handleGenerate = () => {
    if (!script.trim()) {
      toast({
        title: "Script is required",
        description: "Please enter a script for your voice generation.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedAudio("dummy-audio-url.mp3");
      toast({
        title: "Voice Generated Successfully",
        description: "Your voice has been generated and is ready to use.",
      });
    }, 2000);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Voice Generator</h1>
            <p className="text-muted-foreground">Create lifelike voiceovers for your marketing content</p>
          </div>
          <Button className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90" disabled={isGenerating} onClick={handleGenerate}>
            <Mic className="mr-2 h-4 w-4" /> Generate Voice
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="voice-script">Voice Script</Label>
                  <Textarea 
                    id="voice-script" 
                    placeholder="Enter the script for your voiceover..." 
                    className="min-h-[150px]"
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="voice-style">Voice Style</Label>
                  <Select defaultValue="natural">
                    <SelectTrigger>
                      <SelectValue placeholder="Select voice style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="authoritative">Authoritative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <Label htmlFor="voice-speed">Voice Speed</Label>
                    <span className="text-xs text-muted-foreground">Normal</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <Label htmlFor="voice-pitch">Voice Pitch</Label>
                    <span className="text-xs text-muted-foreground">Medium</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center animate-pulse">
                      <Mic className="h-8 w-8 text-brand-purple" />
                    </div>
                    <p className="text-muted-foreground">Generating voice...</p>
                  </div>
                ) : generatedAudio ? (
                  <div className="flex flex-col items-center justify-center space-y-4 w-full">
                    <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center">
                      <Mic className="h-8 w-8 text-brand-purple" />
                    </div>
                    <h3 className="font-semibold text-xl">Voice Generated!</h3>
                    
                    <audio controls className="w-full">
                      <source src={generatedAudio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    
                    <div className="flex gap-2 w-full pt-4">
                      <Button className="flex-1" onClick={handleGenerate}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center">
                      <Mic className="h-8 w-8 text-brand-purple" />
                    </div>
                    <h3 className="font-semibold text-xl">No Voice Generated Yet</h3>
                    <p className="text-muted-foreground text-center">
                      Fill in the details on the left and click "Generate Voice" to create your voiceover.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GenerateVoice;
