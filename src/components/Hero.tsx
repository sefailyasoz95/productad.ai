import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ImageIcon,
  Video,
  Mic,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Hero = () => {
  //   const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  // Demo videos - add your video paths here
  const demoVideos = ["/beauty_product.mp4", "/stanley_product.mp4"];

  // Navigate to next video when current one ends
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % demoVideos.length);
  };

  // Handle manual navigation
  const navigateVideo = (direction) => {
    if (direction === "next") {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % demoVideos.length);
    } else {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === 0 ? demoVideos.length - 1 : prevIndex - 1
      );
    }
  };

  // Reset video playing when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((e) => console.log("Video play error:", e));
    }
  }, [currentVideoIndex]);

  return (
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden">
      {/* Full-screen background video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src={demoVideos[currentVideoIndex]}
          className="absolute inset-0 w-full h-[80%] lg:h-full object-contain lg:object-cover"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
        {/* Dark overlay to improve text readability */}
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute top-1/2 left-4 flex items-center z-20">
        <button
          onClick={() => navigateVideo("prev")}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Previous video"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 flex items-center z-20">
        <button
          onClick={() => navigateVideo("next")}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Next video"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Video indicator dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {demoVideos.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
              index === currentVideoIndex
                ? "w-6 bg-brand-purple"
                : "bg-white/60"
            }`}
            onClick={() => setCurrentVideoIndex(index)}
          />
        ))}
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center lg:h-full mt-24 lg:mt-0 max-w-6xl mx-auto px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl md:text-6xl font-bold lg:mb-6">
            <span className="gradient-text">Create. Influence. Sell.</span>
            <br />
            Instantly.
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium lg:mb-8 mb-4 text-white/80">
            Generate stunning promotional content for your products using AI.
            From images to videos with virtual influencers - all in seconds.
          </p>

          <div className="flex flex-col items-center justify-center gap-3">
            <Input
              placeholder="enter your email"
              className="w-full md:w-1/3 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/50"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              value={email}
              type="email"
            />
            <Button
              size="lg"
              disabled={!email}
              className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 transition-all hover:scale-105"
              onClick={async () => {
                const isValidEmail = emailRegex.test(email);
                if (isValidEmail) {
                  await supabase.from("waitlist").insert({ email }).select();
                  toast.success("You have been added to the waitlist!");
                  setEmail("");
                } else {
                  toast.error("Please enter a valid email address.");
                }
              }}
            >
              Join the waitlist <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Features preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-64 lg:mt-16">
          <div className="backdrop-blur-md bg-white/10 rounded-lg p-6 text-center flex flex-col items-center transform transition-all hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-brand-purple/30 flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-2">AI Images</h3>
            <p className="text-white/80">
              Generate stunning product showcases with our advanced AI
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/10 rounded-lg p-6 text-center flex flex-col items-center transform transition-all hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-brand-blue/30 flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-2">AI Videos</h3>
            <p className="text-white/80">
              Create engaging videos with or without virtual influencers
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/10 rounded-lg p-6 text-center flex flex-col items-center transform transition-all hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-brand-purple/30 flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Voice Synthesis</h3>
            <p className="text-white/80">
              Add lifelike voiceovers or let our influencers talk for you
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
