
import React from 'react';
import { Sparkles, Video, ImageIcon, Mic, Upload, Clock, Download, RefreshCw, Users, Lightbulb } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 px-6 bg-muted/50" id="features">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Transform Your Marketing Content</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
            Genfluence combines multiple AI technologies to create powerful promotional 
            content that converts - all within minutes, not days.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "0.2s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-brand-purple" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Simple Product Upload</h3>
            <p className="text-muted-foreground">Upload your product image, add a description and watch AI do the rest</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "0.3s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6 text-brand-blue" />
            </div>
            <h3 className="font-semibold text-xl mb-2">AI Image Generation</h3>
            <p className="text-muted-foreground">Create beautiful marketing images with advanced AI technology</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "0.4s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-brand-teal" />
            </div>
            <h3 className="font-semibold text-xl mb-2">AI Video Creation</h3>
            <p className="text-muted-foreground">Transform images into engaging videos with cutting-edge AI</p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "0.5s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-brand-purple" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Virtual Influencers</h3>
            <p className="text-muted-foreground">Choose from our library of AI influencers to promote your products</p>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "0.6s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-brand-blue" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Realistic Voiceovers</h3>
            <p className="text-muted-foreground">Add professional voiceovers with our AI voice synthesis</p>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "0.7s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6 text-brand-teal" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Unlimited Regeneration</h3>
            <p className="text-muted-foreground">Keep regenerating until you find the perfect content</p>
          </div>
          
          {/* Feature 7 */}
          <div className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "0.8s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-brand-purple" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Save Time & Money</h3>
            <p className="text-muted-foreground">Create in minutes what would take days and thousands of dollars</p>
          </div>
          
          {/* Feature 8 */}
          <div className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "0.9s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-brand-blue" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Easy Downloads</h3>
            <p className="text-muted-foreground">Download your creations in high quality for immediate use</p>
          </div>
          
          {/* Feature 9 */}
          <div className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 animate-fade-in" style={{animationDelay: "1s"}}>
            <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-brand-teal" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Creative Control</h3>
            <p className="text-muted-foreground">Full control over the creative direction with detailed descriptions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
