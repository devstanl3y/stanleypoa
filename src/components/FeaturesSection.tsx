'use client';

import { motion, Variants } from 'framer-motion';

const features = [
  {
    name: 'Single-Click Transactions (EIP-5792)',
    description:
      'This app utilizes the EIP-5792 standard, allowing complex actions like minting multiple tokens to be bundled into a single, user-friendly transaction. No more confusing multi-step approvals.',
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    name: 'Truly Gasless Transactions',
    description:
      'Leveraging the Coinbase Paymaster, we sponsor the network fees for every user. You can mint your POA token with zero gas costs, removing the need to own or spend cryptocurrency to participate.',
    icon: (
      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'Effortless & Secure Onboarding',
    description:
      'Powered by the Coinbase Smart Wallet, users sign in securely with a Passkey. This eliminates complex seed phrases, making the experience as simple as logging into a traditional app.',
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    name: 'Native Social Integration',
    description:
      'As a Farcaster Mini App, StanleyPOA can be embedded and used directly within the social feed, creating a seamless discovery and interaction model without ever leaving the Farcaster client.',
    icon: (
      <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <div id="features-section" className="py-24 sm:py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>
      
      <motion.div
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-blue-400 text-sm font-semibold tracking-wide">A WORLD-CLASS EXPERIENCE ON BASE</span>
            </div>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6"
          >
            The Future of{' '}
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
              On-Chain Interaction
            </span>{' '}
            is Seamless
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            Experience the next generation of blockchain applications with zero friction, maximum security, and unparalleled user experience.
          </motion.p>
        </div>
        
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="group relative"
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={index}
              >
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-8 shadow-2xl group-hover:shadow-3xl group-hover:border-white/20 transition-all duration-500">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-blue-600/20 to-blue-600/5 rounded-3xl transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/10 mb-6 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
                      {feature.name}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}