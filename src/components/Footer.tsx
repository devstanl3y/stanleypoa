'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Twitter, ExternalLink } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export function Footer() {
  const footerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <motion.footer
      className="relative bg-black border-t border-white/5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerVariants}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500/20 via-blue-500/5 to-transparent"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center gap-y-12">
          
          <motion.div 
            className="max-w-3xl text-center"
            variants={itemVariants}
          >
            <h3 className="font-mono text-xl font-bold text-white mb-4">About This Project</h3>
            <p className="text-gray-300 leading-relaxed">
              This Mini App leverages the full power of{' '}
              <Link href="https://www.base.org" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300/50 transition-all duration-200">Base</Link>, including the EIP-5792 standard, Smart Wallets, and the Paymaster to deliver a truly seamless, one-click, gasless mint.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Gasless Experience</h4>
              <p className="text-xs text-gray-400 text-center">Zero transaction fees with Coinbase Paymaster</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Secure & Verifiable</h4>
              <p className="text-xs text-gray-400 text-center">On-chain proof of attendance forever</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Social Integration</h4>
              <p className="text-xs text-gray-400 text-center">Native Farcaster Mini App experience</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-8"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="https://github.com/devstanl3y" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/10 text-gray-400 hover:text-white hover:bg-white/20 hover:border-white/20 transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="https://x.com/Devstanley1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/10 text-gray-400 hover:text-white hover:bg-white/20 hover:border-white/20 transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="https://devstanley.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 hover:bg-blue-600/30 hover:border-blue-400/40 transition-all duration-300"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center gap-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link 
                href="https://devstanley.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/30 text-blue-400 hover:from-blue-600/30 hover:to-blue-700/30 hover:border-blue-400/40 hover:text-blue-300 transition-all duration-300"
              >
                <span className="text-sm font-semibold tracking-wide">BUILT BY DEVSTANLEY</span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/devstancredit.png"
                alt="DevStanley Credit"
                width={150}
                height={75}
                className="opacity-80 hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                unoptimized
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full pt-8 border-t border-white/5"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
              <p>© 2025 StanleyPOA. All rights reserved.</p>
              <div className="flex items-center gap-1">
                <span>Powered by</span>
                <Link href="https://www.coinbase.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Coinbase</Link>
                <span>&</span>
                <Link href="https://www.base.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Base</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}