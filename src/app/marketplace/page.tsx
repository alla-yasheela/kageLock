"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Image, Code, FileText, Star, DollarSign, Tag, Clock } from "lucide-react";
import Link from "next/link";
import ImageComponent from "next/image";
import { Footerdemo } from "@/components/ui/footer-section";

type Asset = {
  id: number;
  title: string;
  category: string;
  image: string;
  creator: string;
  rating: number;
  reviews: number;
  price: string;
  tags: string[];
  date: string;
};

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const assets: Asset[] = [
    {
      id: 1,
      title: "Blockchain-Verified Logo Design",
      category: "image",
      image: "https://placehold.co/600x400/3b82f6/ffffff.png?text=Gradient+Logo",
      creator: "Sarah Design",
      rating: 4.8,
      reviews: 124,
      price: "$149",
      tags: ["Logo", "Blockchain-Verified", "Smart Contract"],
      date: "3 days ago",
    },
    {
      id: 2,
      title: "Solana Payment Algorithm (ZKP)",
      category: "code",
      image: "https://placehold.co/600x400/6366f1/ffffff.png?text=Payment+Algorithm",
      creator: "TechFlow Startup",
      rating: 4.9,
      reviews: 86,
      price: "$499",
      tags: ["Solana", "Zero-Knowledge", "Fintech"],
      date: "1 week ago",
    },
    {
      id: 3,
      title: "AI-Protected Marketing Framework",
      category: "document",
      image: "https://placehold.co/600x400/8b5cf6/ffffff.png?text=Marketing+Strategy",
      creator: "Growth Experts",
      rating: 4.6,
      reviews: 58,
      price: "$99",
      tags: ["Marketing", "AI-Monitored", "Framework"],
      date: "2 weeks ago",
    },
    {
      id: 4,
      title: "NFT Art Collection (Theft-Proof)",
      category: "image",
      image: "https://placehold.co/600x400/ec4899/ffffff.png?text=Abstract+Art",
      creator: "Alex Digital",
      rating: 4.7,
      reviews: 92,
      price: "$299",
      tags: ["NFT", "Theft-Proof", "Blockchain"],
      date: "3 days ago",
    },
    {
      id: 5,
      title: "GitHub-Monitored E-commerce Code",
      category: "code",
      image: "https://placehold.co/600x400/14b8a6/ffffff.png?text=E-commerce+Backend",
      creator: "Web Solutions",
      rating: 4.9,
      reviews: 113,
      price: "$799",
      tags: ["E-commerce", "AI-Protected", "Scalable"],
      date: "5 days ago",
    },
    {
      id: 6,
      title: "Startup Pitch Deck (IP-Protected)",
      category: "document",
      image: "https://placehold.co/600x400/f59e0b/ffffff.png?text=Business+Proposal",
      creator: "Business Experts",
      rating: 4.5,
      reviews: 76,
      price: "$79",
      tags: ["Startup", "Pitch Deck", "IP-Protected"],
      date: "1 week ago",
    },
    {
      id: 7,
      title: "Designer Icon Set (Blockchain-Verified)",
      category: "image",
      image: "https://placehold.co/600x400/10b981/ffffff.png?text=Icon+Set",
      creator: "Design Studio",
      rating: 4.8,
      reviews: 104,
      price: "$59",
      tags: ["Icons", "Blockchain-Verified", "UI"],
      date: "4 days ago",
    },
    {
      id: 8,
      title: "Machine Learning Model (ZKP-Protected)",
      category: "code",
      image: "https://placehold.co/600x400/6366f1/ffffff.png?text=AI+Algorithm",
      creator: "AI Innovations",
      rating: 4.9,
      reviews: 153,
      price: "$899",
      tags: ["AI", "Zero-Knowledge", "ML Model"],
      date: "2 days ago",
    },
  ];

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = activeCategory === "all" || asset.category === activeCategory;
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", label: "All", icon: <Search className="h-4 w-4" /> },
    { id: "image", label: "Images", icon: <Image className="h-4 w-4" /> },
    { id: "code", label: "Code", icon: <Code className="h-4 w-4" /> },
    { id: "document", label: "Documents", icon: <FileText className="h-4 w-4" /> },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      <div className="flex-grow pt-24 pb-12 bg-white dark:bg-gray-900">
        <div className="container-width">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">IP Marketplace</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover and license blockchain-verified IP assets. All listings include ownership proofs and smart contract automation.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-10 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for assets, creators, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 w-full"
              />
            </div>
            <Button variant="outline" className="rounded-lg flex-shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Categories */}
          <Tabs
            defaultValue="all"
            className="mb-8"
            onValueChange={(value) => setActiveCategory(value)}
          >
            <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="custom-tab">
                  {category.icon}
                  <span className="ml-2">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="image" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="document" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Empty State */}
          {filteredAssets.length === 0 && (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No assets found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any assets matching your search criteria.
              </p>
              <Button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footerdemo />
    </main>
  );
}

// Updated AssetCard component using next/image
function AssetCard({ asset }: { asset: Asset }) {
  return (
    <div className="marketplace-item group">
      <div className="relative">
        <ImageComponent
          src={asset.image}
          alt={asset.title}
          className="marketplace-image object-cover w-full h-48"
          width={600}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <Button
              className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-lg"
              size="sm"
              asChild
            >
              <Link href={`/marketplace/${asset.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <DollarSign className="h-3 w-3 mr-1 text-green-500" />
          {asset.price}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-sm line-clamp-1">{asset.title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">{asset.creator}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-500 mr-1" />
            <span className="text-xs">{asset.rating} ({asset.reviews})</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            {asset.date}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {asset.tags.map((tag, i) => (
            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
