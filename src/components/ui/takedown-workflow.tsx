import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Copy,
  Download,
  FileText,
  Gavel,
  Mail,
  SendHorizontal,
  Clipboard,
  Clock,
  ExternalLink
} from "lucide-react";

interface TakedownWorkflowProps {
  matchData?: {
    id: string;
    platform: string;
    url: string;
    similarity: number;
    description: string;
    date: string;
    assetName?: string;
    assetType?: string;
  };
  onComplete?: (result: any) => void;
}

export function TakedownWorkflow({
  matchData = {
    id: 'match-123',
    platform: 'github',
    url: 'https://github.com/fake-user/copied-repo',
    similarity: 87,
    description: 'Code repository with similar code structure',
    date: new Date().toISOString(),
    assetName: 'Smart Contract',
    assetType: 'code'
  },
  onComplete
}: TakedownWorkflowProps) {
  const [activeTab, setActiveTab] = useState('dmca');
  const [status, setStatus] = useState<'initial' | 'processing' | 'completed' | 'failed'>('initial');
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const platformDetails = {
    github: {
      name: 'GitHub',
      takedownUrl: 'https://github.com/contact/dmca',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
    },
    twitter: {
      name: 'X/Twitter',
      takedownUrl: 'https://help.twitter.com/forms/dmca',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>,
    },
    dribbble: {
      name: 'Dribbble',
      takedownUrl: 'https://dribbble.com/contact',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.951.67 1.427-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.329zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/></svg>,
    },
    nft: {
      name: 'NFT Marketplace',
      takedownUrl: 'https://opensea.io/report',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 90 90"><path d="M45 0C20.2 0 0 20.2 0 45s20.2 45 45 45 45-20.2 45-45S69.8 0 45 0zM22.1 22.9l22.2-15.6.2-.1c.2-.1.4 0 .5.1l21.7 15.7c.3.2.3.6.1.9-.1.1-.2.1-.3.2l-9 3.8c-.2.1-.5 0-.7-.1l-11.8-9.1c-.3-.3-.8-.3-1.1 0-.1.1-.2.3-.2.5v17.6c0 .4-.3.7-.7.7H32c-.4 0-.7-.3-.7-.7V24.5c0-.3-.2-.6-.4-.7l-8.3-1c-.4 0-.6-.4-.5-.8-.1-.1 0-.1 0-.1zM90 45.2c0 .5-.3.8-.8.8h-2.5c-.5 0-.8-.2-.9-.6l-4.5-15c-.1-.5-.8-.7-1.2-.2L67 46.1c-.3.3-.9.3-1.3 0L52.2 31.5c-.3-.3-.9-.3-1.3 0l-13.2 14c-.3.3-.9.3-1.3 0L22.5 30.9c-.3-.3-.9-.3-1.3 0L7.6 45.4c-.3.3-.9.4-1.3 0-1.6-1.9-3.3-3.9-3.3-3.9-.3-.4-.3-.9 0-1.4.3-.4.8-.5 1.3-.3l14.7 8.4c.4.2.8.1 1.1-.2l10.7-12.5c.3-.4.9-.4 1.3 0l11.5 11.8c.4.4 1 .4 1.3 0L58 32.1c.4-.4 1-.4 1.3 0l12.3 14.3c.3.4.9.4 1.3.1l7.7-7.7c.3-.3.3-.7 0-1l-6.4-6.8c-.3-.3-.3-.7 0-1l8.2-8.4c.1-.1.2-.2.4-.2h6.8c.2 0 .4.1.5.3.1.1.1.3.1.5-.1 2.7 0 23 0 23z"/></svg>,
    },
    web: {
      name: 'Website',
      takedownUrl: '#',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19h-1.782v-1.542h1.782v1.542zm-8.782-4.408l1.589-.815c.318.617.793 1.08 1.411 1.411 1.015.535 2.31.535 3.326 0 .476-.265.794-.689 1.006-1.171.159-.424.212-.901.159-1.377-.106-.794-.477-1.376-1.221-1.694-.635-.264-1.271-.317-1.906-.264-2.256.106-3.738 2.203-3.209 4.381l-1.589.847c-.584-1.853-.211-3.865 1.113-5.359 1.059-1.165 2.598-1.8 4.17-1.8 1.112 0 2.184.318 3.139.9 1.8 1.094 2.598 3.085 2.203 5.147-.212 1.165-.848 2.185-1.801 2.862-1.43.952-3.315 1.06-4.911.423-1.403-.635-2.345-1.906-2.68-3.491zm4.666-11.169c.413 0 .743.33.743.742s-.33.741-.743.741c-.412 0-.743-.329-.743-.741s.331-.742.743-.742zm12.334 10.637l-1.589.847c-.317-.635-.794-1.095-1.412-1.43-1.006-.529-2.309-.529-3.326 0-.476.265-.794.688-1.006 1.171-.159.423-.212.9-.159 1.376.106.794.476 1.376 1.218 1.694.635.265 1.271.318 1.906.265 2.234-.106 3.739-2.204 3.209-4.381l1.589-.847c.583 1.853.212 3.866-1.113 5.36-1.059 1.165-2.598 1.8-4.17 1.8-1.112 0-2.184-.318-3.138-.9-1.8-1.094-2.598-3.085-2.204-5.147.212-1.165.848-2.185 1.8-2.862 1.43-.952 3.316-1.059 4.911-.423 1.43.635 2.374 1.906 2.684 3.477zm-5.4-10.637c-.413 0-.743.33-.743.742s.33.741.743.741c.412 0 .742-.329.742-.741s-.33-.742-.742-.742z"/></svg>,
    }
  };

  const getPlaceholderText = (type: string) => {
    const platformInfo = platformDetails[matchData.platform as keyof typeof platformDetails] || platformDetails.web;

    if (type === 'dmca') {
      return `
DMCA Takedown Notice

Date: ${new Date().toLocaleDateString()}

To: ${platformInfo.name} Legal Team
URL: ${matchData.url}

My name is [YOUR NAME] and I am the [copyright owner/authorized agent] of [${matchData.assetName || 'ASSET NAME'}], which has been infringed upon at the URL above.

The unauthorized material is an exact copy or a substantially similar copy of my original work, which can be found at:
[YOUR WORK URL]

I have a good faith belief that the use of the described material in the manner complained of is not authorized by the copyright owner, its agent, or the law.

I swear, under penalty of perjury, that the information in the notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.

Please expeditiously remove or disable access to this infringing material.

Sincerely,
[YOUR NAME]
[YOUR EMAIL]
[YOUR ADDRESS]
[YOUR PHONE]
      `.trim();
    } else if (type === 'cease') {
      return `
Cease and Desist Letter

Date: ${new Date().toLocaleDateString()}

To Whom It May Concern:

Re: Unauthorized Use of Intellectual Property

I am writing to you concerning the unauthorized use of my intellectual property, specifically my ${matchData.assetType || 'intellectual property'} titled "${matchData.assetName || '[ASSET NAME]'}" at the following location:
${matchData.url}

I am the legal owner of this content, which is protected under [country] intellectual property law.

I demand that you immediately:
1. Cease and desist all unauthorized use of my intellectual property
2. Remove all instances of my work from your website/platform
3. Provide written confirmation of these actions within 7 days

Failure to comply with these demands may result in further legal action, including but not limited to filing a lawsuit for copyright infringement, which could result in statutory damages of up to $150,000 per infringement.

This letter serves as formal notice of my intellectual property rights and your infringement. It is sent without prejudice to my rights and remedies, all of which are expressly reserved.

Sincerely,
[YOUR NAME]
[YOUR CONTACT INFORMATION]
      `.trim();
    } else {
      return 'Loading template...';
    }
  };

  const handleActionClick = () => {
    setStatus('processing');

    // Simulate takedown process
    setTimeout(() => {
      setStep(2);

      // Simulate takedown completion
      setTimeout(() => {
        setStep(3);
        setStatus('completed');
        if (onComplete) {
          onComplete({
            success: true,
            takedownId: `TD-${Date.now()}`,
            platform: matchData.platform,
            date: new Date().toISOString(),
            type: activeTab
          });
        }
      }, 3000);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platformInfo = platformDetails[matchData.platform as keyof typeof platformDetails] || platformDetails.web;

  return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Gavel className="h-5 w-5 text-orange-500 mr-2" />
            <h3 className="font-medium">Takedown Action</h3>
          </div>
          {status === 'completed' && (
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 dark:text-green-400">Takedown Submitted</span>
            </div>
          )}
        </div>

        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center">
          <span className="mr-2">Infringement on:</span>
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
            {platformInfo.icon}
            <span className="ml-1.5">{platformInfo.name}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {status === 'initial' && (
          <>
            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-md p-3 mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Potential IP Infringement Detected</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {matchData.description} (Similarity: {matchData.similarity}%)
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <span className="mr-2">URL:</span>
                    <a href="#" className="text-blue-600 dark:text-blue-400 flex items-center hover:underline">
                      {matchData.url.substring(0, 40)}...
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Select Action Type</h4>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="dmca" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    DMCA Takedown
                  </TabsTrigger>
                  <TabsTrigger value="cease" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Cease & Desist
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dmca" className="mt-0">
                  <div className="bg-gray-50 dark:bg-gray-800/30 rounded-md p-3 mb-4 text-sm">
                    <p>
                      A DMCA takedown notice is a formal request to a platform to remove content that infringes on your copyright.
                      This is typically the fastest way to remove infringing content.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="cease" className="mt-0">
                  <div className="bg-gray-50 dark:bg-gray-800/30 rounded-md p-3 mb-4 text-sm">
                    <p>
                      A cease and desist letter is a formal document demanding that the recipient stop an allegedly illegal activity and not restart it.
                      This is typically sent directly to the infringer.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Generated {activeTab === 'dmca' ? 'DMCA Notice' : 'Cease & Desist'}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs flex items-center"
                  onClick={() => copyToClipboard(getPlaceholderText(activeTab))}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1.5" />
                      Copy All
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 h-64 overflow-y-auto">
                <pre className="text-xs whitespace-pre-wrap font-mono text-gray-800 dark:text-gray-300">
                  {getPlaceholderText(activeTab)}
                </pre>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download as PDF
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleActionClick}
              >
                <SendHorizontal className="h-4 w-4 mr-2" />
                Submit Takedown
              </Button>
            </div>
          </>
        )}

        {status === 'processing' && (
          <div className="py-8">
            <div className="flex flex-col items-center text-center">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin mb-4 mx-auto"></div>
                  <h4 className="text-lg font-medium mb-2">Preparing Takedown</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Generating takedown document and collecting evidence...
                  </p>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin mb-4 mx-auto"></div>
                  <h4 className="text-lg font-medium mb-2">Submitting to {platformInfo.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sending takedown request to platform...
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {status === 'completed' && (
          <div className="py-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h4 className="text-lg font-medium mb-2">Takedown Submitted Successfully!</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Your {activeTab === 'dmca' ? 'DMCA takedown' : 'cease and desist'} has been submitted to {platformInfo.name}
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 w-full max-w-md mb-4 text-left">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-gray-500">Reference ID:</div>
                  <div className="font-mono">TD-{Date.now().toString().substring(5)}</div>

                  <div className="text-gray-500">Submission Date:</div>
                  <div>{new Date().toLocaleString()}</div>

                  <div className="text-gray-500">Status:</div>
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    Pending Review
                  </div>

                  <div className="text-gray-500">Est. Response:</div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    24-48 hours
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="text-sm">
                  <Clipboard className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-sm">
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
