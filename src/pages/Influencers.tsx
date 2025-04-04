
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle, Users } from "lucide-react";
import DashboardLayout from '@/components/DashboardLayout';

const influencersData = [
  {
    id: 1,
    name: "Alex Carter",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Lifestyle",
    tags: ["Fashion", "Travel", "Fitness"],
    videos: 12,
    featured: true
  },
  {
    id: 2,
    name: "Taylor Reed",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    category: "Tech",
    tags: ["Gadgets", "Software", "Reviews"],
    videos: 24,
    featured: true
  },
  {
    id: 3,
    name: "Jordan Smith",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Fitness",
    tags: ["Workout", "Nutrition", "Wellness"],
    videos: 18,
    featured: false
  },
  {
    id: 4,
    name: "Morgan Walsh",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    category: "Beauty",
    tags: ["Makeup", "Skincare", "Hair"],
    videos: 15,
    featured: false
  },
  {
    id: 5,
    name: "Riley Johnson",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Food",
    tags: ["Cooking", "Recipes", "Restaurant"],
    videos: 20,
    featured: true
  },
  {
    id: 6,
    name: "Casey Kim",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
    category: "Gaming",
    tags: ["Reviews", "Streaming", "E-sports"],
    videos: 30,
    featured: false
  }
];

const categoryColors: Record<string, string> = {
  "Lifestyle": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  "Tech": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Fitness": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Beauty": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Food": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Gaming": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

const Influencers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredInfluencers = influencersData.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
                         
    const matchesCategory = selectedCategory ? influencer.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = Array.from(new Set(influencersData.map(inf => inf.category)));

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">AI Influencers</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search influencers by name, category, or tags..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button 
            variant={selectedCategory === null ? "secondary" : "outline"}
            className="rounded-full"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button 
              key={category}
              variant={selectedCategory === category ? "secondary" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
            <p className="text-sm text-muted-foreground">
              Showing {filteredInfluencers.length} of {influencersData.length} influencers
            </p>
          </div>
          
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredInfluencers.map((influencer) => (
                <Card key={influencer.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={influencer.image} 
                      alt={influencer.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {influencer.featured && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{influencer.name}</h3>
                    <Badge className={categoryColors[influencer.category] || ""}>
                      {influencer.category}
                    </Badge>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {influencer.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <p className="text-sm text-muted-foreground">{influencer.videos} videos available</p>
                    <Button size="sm" variant="outline">Select</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <Card>
              {filteredInfluencers.map((influencer, index) => (
                <React.Fragment key={influencer.id}>
                  <CardContent className={`p-4 flex items-center gap-4 ${index !== 0 ? 'border-t' : ''}`}>
                    <div className="w-16 h-16 rounded-md overflow-hidden">
                      <img 
                        src={influencer.image} 
                        alt={influencer.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{influencer.name}</h3>
                        {influencer.featured && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={categoryColors[influencer.category] || ""}>
                          {influencer.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{influencer.videos} videos</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {influencer.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="sm">Select</Button>
                  </CardContent>
                </React.Fragment>
              ))}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Influencers;
