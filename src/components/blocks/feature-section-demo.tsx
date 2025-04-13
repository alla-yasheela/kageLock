import { FeatureSteps } from "./feature-section"

const features = [
  {
    step: 'Step 1',
    title: 'Learn the Basics',
    content: 'Start your Web3 journey by learning the basics of blockchain.',
    image: 'https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    step: 'Step 2',
    title: 'Deep Dive',
    content: 'Dive deep into blockchain fundamentals and smart contract development.',
    image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    step: 'Step 3',
    title: 'Build Projects',
    content: 'Graduate with hands-on Web3 experience through building decentralized applications.',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
]

export function FeatureStepsDemo() {
  return (
      <FeatureSteps
        features={features}
        title="Your Journey Starts Here"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />
  )
}
