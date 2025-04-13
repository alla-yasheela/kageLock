"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footerdemo } from "@/components/ui/footer-section"; // Updated import
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Eye,
  AlertCircle,
  CheckCircle,
  Image,
  Code,
  FileText,
  Briefcase,
  Search,
  BarChart4,
  Bell,
  Settings,
  PlusCircle,
  Clock,
  Download,
  Upload,
  Globe,
  Lock,
} from "lucide-react";
import { ThreatVisualization } from "@/components/ui/threat-visualization";
import { ZkpRegistration } from "@/components/ui/zkp-registration";
import { AISimilarityScanner } from "@/components/ui/ai-similarity-scanner";
import { TakedownWorkflow } from "@/components/ui/takedown-workflow";
import { AIColorEngine } from "@/components/ui/ai-color-engine";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [showThreatVisualization, setShowThreatVisualization] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showTakedown, setShowTakedown] = useState(false);
  const [uploadedContent, setUploadedContent] = useState<string | null>(null);
  const [customColors, setCustomColors] = useState({
    primary: "#3b82f6", // Default blue
    secondary: "#8b5cf6", // Default purple
    accent: "#f97316", // Default orange
    background: "#f8fafc", // Default light background
  });
  const [recentAssets, setRecentAssets] = useState<any[]>([]);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Potential match found",
      description: "A potential match to your 'Logo Design' was found on X.com",
      similarity: "92%",
      status: "Pending",
      date: "2 hours ago",
      platform: "X",
      platformLogo: "https://placehold.co/20x20",
      urgency: "high"
    },
    {
      id: 2,
      title: "Potential match found",
      description: "A potential match to your 'Payment Algorithm' was found on GitHub",
      similarity: "78%",
      status: "Pending",
      date: "1 day ago",
      platform: "GitHub",
      platformLogo: "https://placehold.co/20x20",
      urgency: "medium"
    },
    {
      id: 3,
      title: "Takedown successful",
      description: "Takedown of 'Logo Design' copy was successful",
      similarity: "95%",
      status: "Resolved",
      date: "3 days ago",
      platform: "Dribbble",
      platformLogo: "https://placehold.co/20x20",
      urgency: "resolved"
    },
  ]);
  const [matchData, setMatchData] = useState<any | null>(null);

  // Existing stats array
  const stats = [
    { label: "Protected Assets", value: "23", icon: <Shield className="h-5 w-5 text-blue-600" /> },
    { label: "Active Scans", value: "9", icon: <Eye className="h-5 w-5 text-purple-600" /> },
    { label: "Potential Matches", value: "2", icon: <AlertCircle className="h-5 w-5 text-orange-600" /> },
    { label: "Takedowns", value: "7", icon: <CheckCircle className="h-5 w-5 text-green-600" /> },
  ];

  // Existing assets array
  const assets = [
    { id: 1, name: "Logo Design", type: "Image", icon: <Image className="h-4 w-4" />, status: "Protected", statusColor: "bg-green-500", date: "May 10, 2023" },
    { id: 2, name: "Payment Algorithm", type: "Code", icon: <Code className="h-4 w-4" />, status: "Protected", statusColor: "bg-green-500", date: "Jun 14, 2023" },
    { id: 3, name: "Product Whitepaper", type: "Document", icon: <FileText className="h-4 w-4" />, status: "Protected", statusColor: "bg-green-500", date: "Jul 22, 2023" },
    { id: 4, name: "Business Model", type: "Document", icon: <Briefcase className="h-4 w-4" />, status: "Protected", statusColor: "bg-green-500", date: "Jul 05, 2023" },
    { id: 5, name: "Frontend Code", type: "Code", icon: <Code className="h-4 w-4" />, status: "Scanning", statusColor: "bg-blue-500", date: "Jul 18, 2023" },
  ];

  // Handle asset registration completion
  const handleRegistrationComplete = (assetData: any) => {
    setRecentAssets(prev => [assetData, ...prev].slice(0, 5));
    setRegistrationModalOpen(false);

    // Update uploaded content for color engine
    setUploadedContent(assetData.name + " " + assetData.type);

    // After a moment, show the threat visualization demo
    setTimeout(() => {
      setShowThreatVisualization(true);
    }, 1000);
  };

  // Handle match found during scanning
  const handleMatchFound = (match: any) => {
    setMatchData(match);

    // Show the takedown workflow after a short delay
    setTimeout(() => {
      setShowTakedown(true);
    }, 2000);
  };

  // Handle theme generation from AI Color Engine
  const handleThemeGenerated = (colors: any) => {
    setCustomColors(colors);
    // Would apply these colors to the UI in a real implementation
  };

  // Start demo sequence on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setRegistrationModalOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col bg-gray-50 dark:bg-black"
      style={{ backgroundColor: customColors.background }}
    >
      <Header />
      <div className="flex-grow pt-24 pb-12">
        <div className="container-width">
          {/* AI Color Engine - Hidden but functional */}
          <div className="hidden">
            <AIColorEngine
              uploadedContent={uploadedContent}
              onThemeGenerated={handleThemeGenerated}
            />
          </div>

          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Monitor and manage your intellectual property assets
              </p>
            </div>
            <Button
              className="rounded-lg"
              style={{ backgroundColor: customColors.primary }}
              onClick={() => setRegistrationModalOpen(true)}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Asset
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="dashboard-card flex items-center p-6">
                <div
                  className="mr-4 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: index % 2 === 0 ? `${customColors.primary}20` : `${customColors.secondary}20`,
                    color: index % 2 === 0 ? customColors.primary : customColors.secondary
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Registration Process Modal */}
          <AnimatePresence>
            {registrationModalOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-8"
              >
                <ZkpRegistration onRegistrationComplete={handleRegistrationComplete} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Threat Visualization */}
          <AnimatePresence>
            {showThreatVisualization && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-8"
              >
                <ThreatVisualization showLiveDemo={true} />
                <div className="mt-4 text-center">
                  <Button
                    className="rounded-lg"
                    style={{ backgroundColor: customColors.secondary }}
                    onClick={() => setShowScanner(true)}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Start AI Similarity Scan
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Similarity Scanner */}
          <AnimatePresence>
            {showScanner && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-8"
              >
                <AISimilarityScanner
                  assetName={recentAssets[0]?.name || "New Asset"}
                  assetType={(recentAssets[0]?.type as any) || "code"}
                  demoMode={true}
                  onMatchFound={handleMatchFound}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Takedown Workflow */}
          <AnimatePresence>
            {showTakedown && matchData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-8"
              >
                <TakedownWorkflow
                  matchData={{
                    id: matchData.id,
                    platform: matchData.platform,
                    url: matchData.url || "https://github.com/fake-user/copied-repo",
                    similarity: matchData.similarity,
                    description: matchData.description,
                    date: matchData.date,
                    assetName: recentAssets[0]?.name || "New Asset",
                    assetType: (recentAssets[0]?.type as any) || "code"
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList className="bg-white dark:bg-black p-1 rounded-lg border border-gray-200 dark:border-gray-800">
              <TabsTrigger value="overview" className="custom-tab">
                <BarChart4 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="assets" className="custom-tab">
                <Shield className="h-4 w-4 mr-2" />
                My Assets
              </TabsTrigger>
              <TabsTrigger value="alerts" className="custom-tab">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
                {alerts.filter(a => a.status === "Pending").length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {alerts.filter(a => a.status === "Pending").length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="settings" className="custom-tab">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Recent Alerts */}
              <Card className="dashboard-card overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Recent Alerts</h2>
                  <Button variant="outline" size="sm" className="rounded-lg text-sm">
                    View All
                  </Button>
                </div>
                <div>
                  {alerts.slice(0, 3).map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          alert.urgency === "high"
                            ? "bg-red-500"
                            : alert.urgency === "medium"
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`} />
                        <div>
                          <h3 className="font-medium text-sm">{alert.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">{alert.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{alert.date}</span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5">
                              {alert.similarity} match
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`rounded-lg text-xs ${
                          alert.status === "Pending"
                            ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                            : "text-gray-500"
                        }`}
                      >
                        {alert.status === "Pending" ? "Review" : "Details"}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Protected Assets */}
              <Card className="dashboard-card overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Protected Assets</h2>
                  <Button variant="outline" size="sm" className="rounded-lg text-sm">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Show new registered assets first if available */}
                  {recentAssets.map((asset, idx) => (
                    <div
                      key={`new-${idx}`}
                      className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/10 rounded-full flex items-center justify-center">
                          {asset.type === 'image' ? <Image className="h-4 w-4 text-blue-600" /> :
                           asset.type === 'code' ? <Code className="h-4 w-4 text-purple-600" /> :
                           <FileText className="h-4 w-4 text-green-600" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{asset.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{asset.type}</span>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Protected
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">Just now</div>
                    </div>
                  ))}

                  {/* Show existing assets */}
                  {assets.slice(0, Math.max(0, 4 - recentAssets.length)).map((asset) => (
                    <div
                      key={asset.id}
                      className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center">
                          {asset.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{asset.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{asset.type}</span>
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                              asset.status === "Protected" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}>
                              {asset.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{asset.date}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="assets" className="space-y-6">
              <Card className="dashboard-card">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">All Assets</h2>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full px-2 py-0.5">
                      {assets.length + recentAssets.length}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg text-sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button
                      className="rounded-lg text-sm"
                      style={{ backgroundColor: customColors.primary }}
                      onClick={() => setRegistrationModalOpen(true)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {/* New assets first */}
                      {recentAssets.map((asset, idx) => (
                        <tr key={`new-${idx}`} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/10 rounded-full flex items-center justify-center flex-shrink-0">
                                {asset.type === 'image' ? <Image className="h-4 w-4 text-blue-600" /> :
                                 asset.type === 'code' ? <Code className="h-4 w-4 text-purple-600" /> :
                                 <FileText className="h-4 w-4 text-green-600" />}
                              </div>
                              <span className="font-medium text-sm">{asset.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{asset.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Protected
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Just now</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-lg"
                              style={{ color: customColors.primary }}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}

                      {/* Existing assets */}
                      {assets.map((asset) => (
                        <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                                {asset.icon}
                              </div>
                              <span className="font-medium text-sm">{asset.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{asset.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              asset.status === "Protected" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}>
                              {asset.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-lg"
                              style={{ color: customColors.primary }}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card className="dashboard-card">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">All Alerts</h2>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full px-2 py-0.5">
                      {alerts.length}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg text-sm flex items-center">
                      <Search className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
                <div>
                  {/* Add new match if available */}
                  {matchData && (
                    <div
                      key={`match-new`}
                      className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-3 h-3 rounded-full mt-1 bg-red-500" />
                          <div>
                            <h3 className="font-medium">New Match Found</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                              {matchData.description || `Potential match to ${recentAssets[0]?.name || "your asset"} found`}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Clock className="h-3.5 w-3.5" />
                                Just now
                              </div>
                              <span className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5">
                                {matchData.similarity || "92"}% match
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="rounded-lg">Dismiss</Button>
                          <Button
                            size="sm"
                            className="rounded-lg"
                            style={{ backgroundColor: customColors.primary }}
                          >
                            Take Action
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Existing alerts */}
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`w-3 h-3 rounded-full mt-1 ${
                            alert.urgency === "high"
                              ? "bg-red-500"
                              : alert.urgency === "medium"
                              ? "bg-orange-500"
                              : "bg-green-500"
                          }`} />
                          <div>
                            <h3 className="font-medium">{alert.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{alert.description}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Clock className="h-3.5 w-3.5" />
                                {alert.date}
                              </div>
                              <span className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5">
                                {alert.similarity} match
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                alert.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {alert.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        {alert.status === "Pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="rounded-lg">Dismiss</Button>
                            <Button
                              size="sm"
                              className="rounded-lg"
                              style={{ backgroundColor: customColors.primary }}
                            >
                              Take Action
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="dashboard-card">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium">Account Settings</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Manage your account preferences and notification settings
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Email Alerts</p>
                            <p className="text-xs text-gray-500">Receive email notifications for new alerts</p>
                          </div>
                          <div
                            className="w-12 h-6 rounded-full relative cursor-pointer"
                            style={{ backgroundColor: customColors.primary }}
                          >
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Real-time Alerts</p>
                            <p className="text-xs text-gray-500">Get push notifications in real-time</p>
                          </div>
                          <div
                            className="w-12 h-6 rounded-full relative cursor-pointer"
                            style={{ backgroundColor: customColors.primary }}
                          >
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Weekly Reports</p>
                            <p className="text-xs text-gray-500">Receive weekly summary reports</p>
                          </div>
                          <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-4">Monitoring Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">GitHub Monitoring</p>
                            <p className="text-xs text-gray-500">Monitor code repositories on GitHub</p>
                          </div>
                          <div
                            className="w-12 h-6 rounded-full relative cursor-pointer"
                            style={{ backgroundColor: customColors.primary }}
                          >
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Social Media</p>
                            <p className="text-xs text-gray-500">Monitor X, Instagram and Facebook</p>
                          </div>
                          <div
                            className="w-12 h-6 rounded-full relative cursor-pointer"
                            style={{ backgroundColor: customColors.primary }}
                          >
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Dark Web Monitoring</p>
                            <p className="text-xs text-gray-500">Premium feature for dark web protection</p>
                          </div>
                          <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button
                      className="rounded-lg"
                      style={{ backgroundColor: customColors.primary }}
                    >
                      Save Settings
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footerdemo /> {/* Updated Footer component */}
    </main>
  );
}
