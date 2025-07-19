import { FeatureSteps } from "./feature-section"

const features = [
  {
    step: 'Step 1',
    title: 'Upload & Register',
    content: 'Upload your IP assets and get them timestamped on Solana blockchain with zero-knowledge proofs for privacy-preserving ownership.',
    image: 'https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    step: 'Step 2',
    title: 'AI Monitoring',
    content: 'Our AI continuously monitors platforms like X, GitHub, and NFT marketplaces for unauthorized use of your registered IP.',
    image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    step: 'Step 3',
    title: 'Enforce & Monetize',
    content: 'Get instant alerts, send automated takedowns, and list your IP on our marketplace for licensing deals with smart contract automation.',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
]

export function FeatureStepsDemo() {
  return (
      <FeatureSteps
        features={features}
        title="How KageLock Protects Your IP"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />
  )
}
