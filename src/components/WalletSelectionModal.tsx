'use client';

import { useConnect } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';

interface WalletSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getWalletIcon = (connectorName: string, connectorIcon?: string) => {
  if (connectorIcon) {
    return <img src={connectorIcon} alt={`${connectorName} icon`} className="h-7 w-7 rounded-lg" />;
  }

  const name = connectorName.toLowerCase();
  
  if (name.includes('coinbase')) {
    return <img src="/wallet-icons/coinbase.png" alt="Coinbase icon" className="h-7 w-7 rounded-lg" />;
  }
  
  if (name.includes('metamask')) {
    return <img src="/wallet-icons/metamask.png" alt="MetaMask icon" className="h-7 w-7 rounded-lg" />;
  }
  
  if (name.includes('walletconnect')) {
    return <img src="/wallet-icons/walletconnect.png" alt="WalletConnect icon" className="h-7 w-7 rounded-lg" />;
  }
  
  return (
    <div className="w-7 h-7 rounded-lg bg-gray-600 flex items-center justify-center">
      <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );
};

export function WalletSelectionModal({ isOpen, onClose }: WalletSelectionModalProps) {
  const { connectors, connect } = useConnect();

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: { 
      opacity: 1,
      x: 0
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="rounded-3xl bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-black/95 backdrop-blur-xl p-6 shadow-2xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 rounded-3xl"></div>
              
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                aria-label="Close"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              <motion.div
                className="relative text-center mb-6"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/20">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6-2l3-3m0 0l3-3m-3 3H4m8 0a9 9 0 100-18 9 9 0 000 18z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">Connect Wallet</h2>
                <p className="text-sm text-gray-400">Choose your preferred wallet to get started</p>
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={itemVariants}
              >
                {connectors.filter(connector => connector.name.toLowerCase() !== 'injected').map((connector, index) => (
                  <motion.button
                    key={connector.uid}
                    onClick={() => {
                      connect({ connector });
                      onClose();
                    }}
                    className="group relative w-full flex items-center justify-between rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 text-left transition-all duration-300 hover:from-gray-700/70 hover:to-gray-600/70 hover:shadow-lg hover:shadow-black/25 border border-white/10 hover:border-white/20"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.1 }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    <div className="relative flex items-center gap-3 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                        {getWalletIcon(connector.name, connector.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-white group-hover:text-blue-100 transition-colors block truncate">
                          {connector.name}
                        </span>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                          {connector.name === 'Coinbase Wallet' ? 'Gasless experience with Smart Wallet' : 'Standard wallet connection'}
                        </p>
                      </div>
                    </div>
                    <motion.svg 
                      className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </motion.button>
                ))}
              </motion.div>

              <motion.div 
                className="mt-4 text-center"
                variants={itemVariants}
              >
                <p className="text-xs text-gray-500">
                  By connecting, you agree to the Terms of Service
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}