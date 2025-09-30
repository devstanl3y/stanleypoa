'use client';

import { motion, Variants } from 'framer-motion';

export function HeroSection() {
  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-blue-900/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
      ></motion.div>
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      ></motion.div>

      <div className="relative px-6 pt-20 lg:px-8 w-full">
        <motion.div
          className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-white/10 to-blue-600/20 blur-3xl opacity-30"></div>
              <h1 className="relative font-mono text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
                A Verifiable,{' '}
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                  On-Chain
                </span>{' '}
                Proof of Attendance
              </h1>
            </motion.div>
            
            <motion.p
              className="mt-8 text-lg leading-8 text-gray-300 sm:text-xl max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Experience the future of on-chain UX. This app leverages the full power of{' '}
              <span className="font-semibold text-blue-400">Base</span>, including the EIP-5792 standard, Smart Wallets, and the Paymaster to deliver a truly seamless, one-click, gasless mint.
            </motion.p>
            
            <motion.div
              className="mt-12 flex items-center justify-center gap-x-6"
              variants={itemVariants}
            >
              <motion.button
                onClick={scrollToFeatures}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-blue-600/25 transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-500/40"
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  Learn More & Mint
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 text-gray-500"
              >
                <span className="text-xs font-medium tracking-wide">SCROLL</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}