'use client';

import { useState, Fragment } from 'react';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';
import { WalletSelectionModal } from './WalletSelectionModal';
import { Address } from 'viem';
import { motion } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ArrowRightOnRectangleIcon, DocumentDuplicateIcon } from '@heroicons/react/20/solid';

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address: address as Address });
  const { disconnect } = useDisconnect();

  const displayAddress = ensName || (address ? truncateAddress(address) : '');

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
    }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-gray-900/60 via-gray-900/20 to-transparent backdrop-blur-xl"
      >
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <motion.div 
            className="flex lg:flex-1"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <a href="#" className="-m-1.5 p-1.5 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <span className="relative font-mono text-xl font-bold text-white tracking-tight">StanleyPOA</span>
            </a>
          </motion.div>
          <div className="flex lg:flex-1 justify-end">
            {isConnected && address ? (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex w-full justify-center items-center gap-x-2 rounded-xl bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:from-gray-700/80 hover:to-gray-600/80 hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      {displayAddress}
                    </div>
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-300 transition-colors" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-3 w-64 origin-top-right rounded-xl bg-gray-800/95 backdrop-blur-xl shadow-2xl shadow-black/50 ring-1 ring-white/10 border border-gray-700/50 focus:outline-none">
                    <div className="p-2">
                      <Menu.Item>
                        {({ active }) => (
                          <button 
                            onClick={copyAddress} 
                            className={`${active ? 'bg-gray-700/70 text-white' : 'text-gray-300'} group flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200`}
                          >
                            <DocumentDuplicateIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                            Copy Address
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button 
                            onClick={() => disconnect()} 
                            className={`${active ? 'bg-red-500/20 text-red-400' : 'text-red-400'} group flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200`}
                          >
                            <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-300 transition-colors" aria-hidden="true" />
                            Disconnect
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative group rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-500/40"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">Connect Wallet</span>
              </motion.button>
            )}
          </div>
        </nav>
      </motion.header>
      <WalletSelectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}