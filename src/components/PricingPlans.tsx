
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingPlans = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing for Everyone</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you and start creating amazing promotional content today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plus Plan */}
          <div className="bg-background rounded-lg overflow-hidden shadow-lg border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="text-2xl font-semibold">Plus</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold">$14.99</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="mt-2 text-muted-foreground">Perfect for getting started</p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>5 AI images per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>Unlimited product uploads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>Full resolution downloads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>Basic scene templates</span>
                </li>
                <li className="flex items-start text-muted-foreground">
                  <span className="h-5 w-5 flex items-center justify-center mr-2">-</span>
                  <span>No video generation</span>
                </li>
                <li className="flex items-start text-muted-foreground">
                  <span className="h-5 w-5 flex items-center justify-center mr-2">-</span>
                  <span>No AI influencers</span>
                </li>
              </ul>
              
              <Button className="w-full mt-8 bg-gradient-to-r from-brand-purple to-brand-blue">
                Choose Plus
              </Button>
            </div>
          </div>
          
          {/* Pro Plan - Featured */}
          <div className="bg-background rounded-lg overflow-hidden shadow-xl border border-brand-purple/30 relative transform scale-105 sm:scale-105 z-10">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple to-brand-teal"></div>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-purple to-brand-teal text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            
            <div className="p-6 border-b border-border">
              <h3 className="text-2xl font-semibold">Pro</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold">$24.99</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="mt-2 text-muted-foreground">For growing businesses</p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>10 AI images per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>10 AI videos per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>Unlimited product uploads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>Full resolution downloads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>All scene templates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>Access to AI influencers</span>
                </li>
              </ul>
              
              <Button className="w-full mt-8 bg-gradient-to-r from-brand-purple to-brand-teal hover:opacity-90">
                Choose Pro
              </Button>
            </div>
          </div>
          
          {/* Pro Max Plan */}
          <div className="bg-background rounded-lg overflow-hidden shadow-lg border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="text-2xl font-semibold">Pro Max</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold">$34.99</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="mt-2 text-muted-foreground">For power users</p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>20 AI images per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>20 AI videos per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>Unlimited product uploads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>Full resolution downloads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>Custom scene creation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-purple shrink-0 mr-2" />
                  <span>Priority rendering</span>
                </li>
              </ul>
              
              <Button className="w-full mt-8 bg-gradient-to-r from-brand-blue to-brand-teal">
                Choose Pro Max
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
