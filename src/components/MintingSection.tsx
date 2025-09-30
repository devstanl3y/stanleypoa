'use client';

import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@uidotdev/usehooks';
import { Transaction, TransactionButton } from '@coinbase/onchainkit/transaction';
import { Avatar, Name, Identity } from '@coinbase/onchainkit/identity';
import { Address, encodeFunctionData } from 'viem';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useReadContract } from 'wagmi';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { base } from 'wagmi/chains';
import Link from 'next/link';

const contractABI = [
  { "type": "function", "name": "mint", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
  { "type": "function", "name": "mintWithBonus", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
  { "type": "function", "name": "hasMinted", "inputs": [{ "name": "user", "type": "address" }], "outputs": [{ "name": "", "type": "bool" }], "stateMutability": "view" }
];
const contractAddress = '0x8013768537A2491155f5D269e389cAddF1A9CE4c';

export function MintingSection() {
  const account = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: hash, error, isPending, writeContract, reset: resetWriteContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  
  const { data: hasAlreadyMinted, isLoading: isCheckingEligibility, refetch: refetchHasMinted } = useReadContract({
    address: contractAddress as Address,
    abi: contractABI,
    functionName: 'hasMinted',
    args: [account.address as Address],
    query: {
      enabled: !!account.address,
    },
  });

  const [mintError, setMintError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  
  const isWrongNetwork = account.isConnected && account.chainId !== base.id;

  useEffect(() => {
    if (isConfirmed) {
      setShowConfetti(true);
      refetchHasMinted();
    }
  }, [isConfirmed, refetchHasMinted]);

  useEffect(() => {
    if (error) {
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes('user rejected')) {
        setMintError('Transaction rejected. Please try again.');
      } else if (errorMessage.includes('address has already minted')) {
        setMintError('This wallet has already minted a POA.');
        refetchHasMinted();
      } else if (errorMessage.includes('insufficient funds')) {
        setMintError('Insufficient funds for gas. Please add ETH to your wallet.');
      } else {
        setMintError('An unexpected error occurred. Please try again.');
      }
    } else {
      setMintError(null);
    }
  }, [error, refetchHasMinted]);
  
  const isConnectedWithSmartWallet = account.isConnected && account.connector?.id === 'coinbaseWallet';
  const isConnectedWithStandardWallet = account.isConnected && account.connector?.id !== 'coinbaseWallet';

  const handleStandardMint = () => {
    setMintError(null);
    writeContract({
      address: contractAddress as Address,
      abi: contractABI,
      functionName: 'mint',
    });
  };

  const sectionVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } },
  };
  
  const calls = [{
    to: contractAddress as Address,
    data: encodeFunctionData({ abi: contractABI, functionName: 'mintWithBonus' }),
    value: BigInt(0),
  }];
  
  useEffect(() => {
    if (!account.isConnected) {
      resetWriteContract();
      setMintError(null);
      setShowConfetti(false);
    }
  }, [account.isConnected, resetWriteContract]);

  const renderMintButton = () => {
    if (!account.isConnected) {
      return (
        <div className="text-center py-8 px-6 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20">
          <p className="text-yellow-400 font-medium">Connect your wallet above to mint your POA</p>
        </div>
      );
    }
    if (isWrongNetwork) {
      return (
        <motion.button 
          onClick={() => switchChain({ chainId: base.id })} 
          className="group relative w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl shadow-lg transition-all duration-300 hover:from-yellow-500 hover:to-yellow-600 hover:shadow-xl hover:shadow-yellow-500/40"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <span className="relative">Switch to Base Mainnet</span>
        </motion.button>
      );
    }
    if (isCheckingEligibility) {
      return (
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent"></div>
            <p className="text-gray-400 font-medium">Checking eligibility...</p>
          </div>
        </div>
      );
    }
    if (hasAlreadyMinted || isConfirmed) {
      return (
        <motion.div 
          className="text-center py-8 px-6 rounded-xl bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-green-400 mb-2">Mint Successful!</h2>
          <p className="text-gray-400">This wallet has already claimed its POA.</p>
        </motion.div>
      );
    }

    if (isConnectedWithSmartWallet) {
      return (
        <Transaction calls={calls} onSuccess={() => refetchHasMinted()}>
          <TransactionButton
            text="Mint + Get Bonus (1-Click)"
            className="group relative w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg transition-all duration-300 hover:from-green-500 hover:to-green-600 hover:shadow-xl hover:shadow-green-500/40 hover:scale-[1.02] hover:-translate-y-1"
          />
        </Transaction>
      );
    }
    
    if (isConnectedWithStandardWallet) {
      return (
        <motion.button 
          onClick={handleStandardMint} 
          disabled={isPending || isConfirming} 
          className="group relative w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-500/40 disabled:from-gray-600 disabled:to-gray-700 disabled:shadow-none disabled:cursor-not-allowed"
          whileHover={!isPending && !isConfirming ? { scale: 1.02, y: -2 } : {}}
          whileTap={!isPending && !isConfirming ? { scale: 0.98 } : {}}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <span className="relative flex items-center justify-center gap-2">
            {(isPending || isConfirming) && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            )}
            {isPending ? 'Approve in Wallet...' : isConfirming ? 'Confirming Transaction...' : 'Mint Your POA'}
          </span>
        </motion.button>
      );
    }

    return null;
  };

  return (
    <>
      {showConfetti && <ReactConfetti width={width!} height={height!} recycle={false} numberOfPieces={500} />}
      <motion.div
        id="mint-section"
        className="flex flex-col items-center justify-center py-24 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="w-full max-w-lg mx-auto">
          <motion.div 
            className="rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-8 shadow-2xl backdrop-blur-xl border border-white/10"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl opacity-50"></div>
                <h2 className="relative font-mono text-3xl font-bold text-white mb-4">Get Your POA</h2>
              </motion.div>
              <p className="text-gray-400 leading-relaxed">
                Connect with a <span className="font-semibold text-blue-400">Coinbase Smart Wallet</span> for a gasless experience, or use a standard wallet and pay for gas.
              </p>
            </div>
            
            {account.isConnected && (
              <motion.div 
                className="bg-gradient-to-r from-black/20 via-gray-900/20 to-black/20 p-6 rounded-2xl mb-8 border border-white/10 backdrop-blur-sm"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Identity address={account.address as Address} schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317eff0a775">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div className="text-left flex-1">
                      <Name className="font-bold text-sm text-white mb-1" />
                      <p className="text-xs text-gray-400 break-all font-mono">{account.address}</p>
                    </div>
                  </div>
                </Identity>
              </motion.div>
            )}
            
            <div className="space-y-4">
              {renderMintButton()}
              <AnimatePresence>
                {mintError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20"
                  >
                    <div className="flex items-center gap-3">
                      <p className="text-red-400 text-sm font-medium">{mintError}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
             <div className="text-center mt-8">
              <Link
                href={`https://basescan.org/address/${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 font-mono transition-colors hover:text-blue-400"
              >
                Verify Contract: {contractAddress}
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}