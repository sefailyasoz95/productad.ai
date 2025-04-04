
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ImageIcon, Video, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignInDialog from '@/components/SignInDialog';

const Hero = () => {
  const navigate = useNavigate();
  
  const handleSignIn = () => {
    navigate('/dashboard');
  };
  
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-brand-blue/5 to-brand-teal/10 -z-10 animate-gradient-shift"></div>
      
      {/* Decorative elements with animation */}
      <div className="absolute top-1/4 right-[10%] w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-[10%] w-64 h-64 bg-brand-teal/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight animate-fade-in">
            <span className="gradient-text">Create. Influence. Sell.</span>
            <br />Instantly.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Generate stunning promotional content for your products using AI. 
            From images to videos with virtual influencers - all in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-brand-purple to-brand-teal hover:opacity-90 transition-all hover:scale-105">
                  Get Started <ArrowRight size={18} className="ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl text-center">Sign in to Genfluence</DialogTitle>
                </DialogHeader>
                <SignInDialog onSignIn={handleSignIn} />
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline" className="transition-all hover:scale-105" asChild>
              <a href="#features">See Demo</a>
            </Button>
          </div>
        </div>
        
        {/* Features preview with animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass-card dark:glass-card-dark rounded-lg p-6 text-center flex flex-col items-center transform transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "0.5s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6 text-brand-purple" />
            </div>
            <h3 className="font-semibold text-xl mb-2">AI Images</h3>
            <p className="text-muted-foreground">Generate stunning product showcases with our advanced AI</p>
          </div>
          
          <div className="glass-card dark:glass-card-dark rounded-lg p-6 text-center flex flex-col items-center transform transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "0.6s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-brand-blue" />
            </div>
            <h3 className="font-semibold text-xl mb-2">AI Videos</h3>
            <p className="text-muted-foreground">Create engaging videos with virtual influencers</p>
          </div>
          
          <div className="glass-card dark:glass-card-dark rounded-lg p-6 text-center flex flex-col items-center transform transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "0.7s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-brand-teal" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Voice Synthesis</h3>
            <p className="text-muted-foreground">Add lifelike voiceovers to your marketing content</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
