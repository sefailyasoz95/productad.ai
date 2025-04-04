
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Download, RefreshCw, Mic, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from '@/components/DashboardLayout';

const GenerateVoice = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [voiceAccent, setVoiceAccent] = useState("american");
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    toast({
      title: "Generating voice...",
      description: "Please wait while we create your voiceover"
    });
    
    setIsGenerating(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setGeneratedAudio("https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav");
      setIsGenerating(false);
      toast({
        title: "Voice generated!",
        description: "Your voiceover is ready to play and download",
      });
    }, 3000);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Generate Voice</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="script">Voice Script</Label>
                  <Textarea 
                    id="script" 
                    placeholder="Write the text you want to convert to speech..."
                    rows={8} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice">Voice Selection</Label>
                  <Select defaultValue="sarah" id="voice">
                    <SelectTrigger>
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah (Professional)</SelectItem>
                      <SelectItem value="james">James (Authoritative)</SelectItem>
                      <SelectItem value="lily">Lily (Friendly)</SelectItem>
                      <SelectItem value="david">David (Casual)</SelectItem>
                      <SelectItem value="emma">Emma (Enthusiastic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      defaultValue={voiceGender} 
                      onValueChange={setVoiceGender}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accent">Accent</Label>
                    <Select 
                      defaultValue={voiceAccent} 
                      onValueChange={setVoiceAccent}
                    >
                      <SelectTrigger id="accent">
                        <SelectValue placeholder="Select accent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="american">American</SelectItem>
                        <SelectItem value="british">British</SelectItem>
                        <SelectItem value="australian">Australian</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="speed">Speed</Label>
                  <Slider 
                    defaultValue={[1]} 
                    min={0.5} 
                    max={2} 
                    step={0.1} 
                    id="speed"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Slow</span>
                    <span>Normal</span>
                    <span>Fast</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pitch">Pitch</Label>
                  <Slider 
                    defaultValue={[0]} 
                    min={-10} 
                    max={10} 
                    step={1} 
                    id="pitch"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Lower</span>
                    <span>Normal</span>
                    <span>Higher</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-brand-teal to-brand-blue"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Generate Voice
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Audio Preview</h2>
                
                {generatedAudio ? (
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex items-center justify-center bg-muted/10 rounded-md border border-border p-8">
                      <div className="text-center">
                        <div className="w-32 h-32 rounded-full bg-brand-teal/10 flex items-center justify-center mx-auto mb-6 relative group">
                          <Button 
                            className="h-16 w-16 rounded-full bg-brand-teal hover:bg-brand-teal/90 transition-all"
                            onClick={togglePlayPause}
                          >
                            {isPlaying ? (
                              <Pause className="h-6 w-6" />
                            ) : (
                              <Play className="h-6 w-6 ml-1" />
                            )}
                          </Button>
                          <div className="absolute inset-0 rounded-full border-4 border-brand-teal/30 animate-pulse group-hover:border-brand-teal/50"></div>
                        </div>
                        <audio 
                          ref={audioRef} 
                          src={generatedAudio} 
                          onEnded={handleAudioEnded} 
                          className="hidden"
                        />
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Volume2 className="h-4 w-4 text-muted-foreground" />
                              <Label className="text-sm">Volume</Label>
                            </div>
                            <Slider 
                              defaultValue={[75]} 
                              min={0} 
                              max={100} 
                              step={1} 
                              onValueChange={handleVolumeChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" onClick={handleGenerate}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                      <Button className="flex-1 bg-brand-teal hover:bg-brand-teal/90">
                        <Download className="mr-2 h-4 w-4" />
                        Download Audio
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-muted/20 rounded-md border border-dashed border-muted-foreground/20">
                    <div className="text-center text-muted-foreground">
                      <Mic className="h-12 w-12 mx-auto mb-2" />
                      <p>Generated audio will appear here</p>
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

export default GenerateVoice;
