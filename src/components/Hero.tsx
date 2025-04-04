
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Video, ImageIcon, Mic } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-brand-blue/5 to-brand-teal/10 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-[10%] w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-[10%] w-64 h-64 bg-brand-teal/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            <span className="gradient-text">Create. Influence. Sell.</span>
            <br />Instantly.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Generate stunning promotional content for your products using AI. 
            From images to videos with virtual influencers - all in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-brand-purple to-brand-teal hover:opacity-90" asChild>
              <Link to="/signup">Get Started <ArrowRight size={18} className="ml-2" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/demo">See Demo</Link>
            </Button>
          </div>
        </div>
        
        {/* Features preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass-card dark:glass-card-dark rounded-lg p-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6 text-brand-purple" />
            </div>
            <h3 className="font-semibold text-xl mb-2">AI Images</h3>
            <p className="text-muted-foreground">Generate stunning product showcases with DALL·E 3</p>
          </div>
          
          <div className="glass-card dark:glass-card-dark rounded-lg p-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-brand-blue" />
            </div>
            <h3 className="font-semibold text-xl mb-2">AI Videos</h3>
            <p className="text-muted-foreground">Create engaging videos with virtual influencers</p>
          </div>
          
          <div className="glass-card dark:glass-card-dark rounded-lg p-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-brand-teal" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Voice Synthesis</h3>
            <p className="text-muted-foreground">Add lifelike voiceovers with ElevenLabs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
