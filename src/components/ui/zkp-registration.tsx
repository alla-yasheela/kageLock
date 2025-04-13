import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  FileText,
  Shield,
  Upload,
  Check,
  Loader2,
  Code,
  File,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ZkpRegistrationProps {
  onRegistrationComplete?: (assetData: any) => void;
}

export function ZkpRegistration({ onRegistrationComplete }: ZkpRegistrationProps) {
  const [step, setStep] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'image' | 'code' | 'document' | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hash, setHash] = useState<string>('');
  const [proof, setProof] = useState<string>('');
  const [txId, setTxId] = useState<string>('');

  // Simulate file upload handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);

      // Determine file type based on extension
      const extension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (extension) {
        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
          setFileType('image');
        } else if (['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'py', 'java', 'cpp'].includes(extension)) {
          setFileType('code');
        } else {
          setFileType('document');
        }
      }
    }
  };

  // Simulate content hashing
  const generateHash = () => {
    setLoading(true);
    // Simulate hash generation
    setTimeout(() => {
      // Generate a mock SHA-256 hash
      const mockHash = Array.from({ length: 64 }, () =>
        "0123456789abcdef"[Math.floor(Math.random() * 16)]
      ).join('');
      setHash(mockHash);
      setStep(2);
      setLoading(false);
    }, 2000);
  };

  // Simulate ZKP generation
  const generateProof = () => {
    setLoading(true);
    // Simulate proof generation
    setTimeout(() => {
      // Generate a mock ZKP proof (would be much longer in reality)
      const mockProof = Array.from({ length: 128 }, () =>
        "0123456789abcdef"[Math.floor(Math.random() * 16)]
      ).join('');
      setProof(mockProof);
      setStep(3);
      setLoading(false);
    }, 3000);
  };

  // Simulate blockchain transaction
  const submitToBlockchain = () => {
    setLoading(true);
    // Simulate blockchain submission
    setTimeout(() => {
      // Generate a mock Solana transaction ID
      const mockTxId = Array.from({ length: 44 }, () =>
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"[Math.floor(Math.random() * 58)]
      ).join('');
      setTxId(mockTxId);
      setStep(4);
      setLoading(false);

      // Notify parent component of successful registration
      if (onRegistrationComplete) {
        onRegistrationComplete({
          name: fileName,
          type: fileType,
          hash: hash,
          proof: proof,
          txId: mockTxId,
          timestamp: new Date().toISOString(),
        });
      }
    }, 3000);
  };

  // Get icon based on file type
  const getFileIcon = () => {
    switch(fileType) {
      case 'image':
        return <ImageIcon className="h-12 w-12 text-blue-500" />;
      case 'code':
        return <Code className="h-12 w-12 text-purple-500" />;
      case 'document':
      default:
        return <FileText className="h-12 w-12 text-green-500" />;
    }
  };

  return (
    <Card className="p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Register Your IP</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step >= 4 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center mb-6">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Your IP</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Drag and drop your file here, or click to browse
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                variant="outline"
                className="w-full md:w-auto"
              >
                Browse Files
              </Button>
            </div>

            {file && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 flex items-center mb-6">
                {getFileIcon()}
                <div className="ml-4">
                  <p className="font-medium">{fileName}</p>
                  <p className="text-sm text-gray-500">{file.size} bytes</p>
                </div>
              </div>
            )}

            <Button
              onClick={generateHash}
              disabled={!file || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Hash Content
                </>
              )}
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium">Content Hashed Successfully</h3>
              </div>
              <div className="overflow-x-auto">
                <p className="text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                  SHA256: {hash}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Your content has been hashed and encrypted. The original content is not stored.
              </p>
            </div>

            <Button
              onClick={generateProof}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating ZKP...
                </>
              ) : (
                <>
                  Generate ZK Proof
                </>
              )}
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium">Zero-Knowledge Proof Generated</h3>
              </div>
              <div className="overflow-x-auto">
                <p className="text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                  {proof.substring(0, 64)}...
                  <span className="text-gray-500">[truncated]</span>
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Your zero-knowledge proof proves ownership without revealing content.
              </p>
            </div>

            <Button
              onClick={submitToBlockchain}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Writing to Solana...
                </>
              ) : (
                <>
                  Register on Blockchain
                </>
              )}
            </Button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mb-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Registration Complete!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Your IP has been registered on Solana testnet with a timestamped proof
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-left mb-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Transaction ID:</span>
                  <p className="text-xs font-mono overflow-x-auto">{txId}</p>
                </div>
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Timestamp:</span>
                  <p className="text-sm">{new Date().toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Status:</span>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" /> Confirmed
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="w-full"
              >
                Register Another Asset
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
