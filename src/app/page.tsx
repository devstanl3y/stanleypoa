'use client';

import { useState, useEffect } from 'react';
// The incorrect NFT component has been removed from the imports.
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Avatar, Name, Identity } from '@coinbase/onchainkit/identity';
import { Address } from 'viem';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

const contractABI = [
  { "type": "function", "name": "mint", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }
];
const contractAddress = '0x212009dc8764DCB8e583e0A23c6Ab1221a8BD571';
const tokenId = '0';

// We define a type for our NFT's metadata
type NftMetadata = {
  name: string;
  image: string;
};

export default function Home() {
  const { address, isConnected } = useAccount();
  const [hasMintedAfterConnect, setHasMintedAfterConnect] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  // New state to hold our fetched NFT metadata and its loading status
  const [nftMetadata, setNftMetadata] = useState<NftMetadata | null>(null);
  const [isMetadataLoading, setIsMetadataLoading] = useState(false);

  const { data: hash, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) {
      setHasMintedAfterConnect(true);
    }
  }, [isConfirmed]);
  
  useEffect(() => {
    if (hash) {
      setTxHash(hash);
    }
  }, [hash]);

  // This new useEffect fetches the NFT metadata when a mint is confirmed
  useEffect(() => {
    const fetchMetadata = async () => {
      // We only run this if the mint is confirmed and we haven't fetched the data yet
      if (isConfirmed && !nftMetadata) {
        setIsMetadataLoading(true);
        // This is the placeholder IPFS URI from our smart contract
        const metadataUri = "ipfs://bafkreihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku";
        // We use a public IPFS gateway to fetch the JSON file
        const gatewayUrl = metadataUri.replace("ipfs://", "https://ipfs.io/ipfs/");
        try {
          const response = await fetch(gatewayUrl);
          const data = await response.json();
          // We also replace the ipfs:// protocol for the image URL
          setNftMetadata({ name: data.name, image: data.image.replace("ipfs://", "https://ipfs.io/ipfs/") });
        } catch (err) {
          console.error("Failed to fetch NFT metadata:", err);
        } finally {
          setIsMetadataLoading(false);
        }
      }
    };
    fetchMetadata();
  }, [isConfirmed, nftMetadata]);

  const handleMint = () => {
    writeContract({
      address: contractAddress as Address,
      abi: contractABI,
      functionName: 'mint',
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gray-900 text-white font-mono">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-3xl shadow-lg p-8 border border-blue-500/50">
        <div className="flex justify-end mb-6">
          <ConnectWallet />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">StanleyPOA Minter</h1>
          <p className="text-gray-400">Claim your Proof-of-Attendance NFT</p>
        </div>

        {isConnected && address ? (
          <div className="bg-gray-700/50 p-6 rounded-2xl mb-8">
            <Identity address={address as Address} schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317eff0a775">
              <Avatar />
              <Name className="font-bold text-xl mt-2" />
              <p className="text-sm text-gray-500 mt-1 break-all">{address}</p>
            </Identity>
          </div>
        ) : (
          <div className="text-center bg-gray-700/50 p-6 rounded-2xl mb-8">
            <p className="text-gray-400">Please connect your wallet to mint.</p>
          </div>
        )}

        {hasMintedAfterConnect ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Mint Successful!</h2>
            <p className="text-gray-300 mb-4">You now own the StanleyPOA token.</p>
            <div className="flex justify-center">
              {/* --- NEW DISPLAY LOGIC --- */}
              {isMetadataLoading && <p>Loading your NFT...</p>}
              {nftMetadata && (
                <div className="flex flex-col items-center p-4 border border-blue-500/50 rounded-lg bg-gray-700/50">
                  <img src={nftMetadata.image} alt={nftMetadata.name} className="w-48 h-48 rounded-md object-cover" />
                  <p className="font-bold mt-2">{nftMetadata.name}</p>
                </div>
              )}
              {/* --- END NEW DISPLAY LOGIC --- */}
            </div>
            {txHash && (
              <a
                href={`https://sepolia.basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-400 hover:text-blue-300 transition-colors"
              >
                View on Basescan
              </a>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <button
              onClick={handleMint}
              disabled={isConfirming || !isConnected}
              className={`w-full px-8 py-4 text-lg font-bold text-white rounded-xl transition-all duration-300 ${
                isConfirming || !isConnected
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50'
              }`}
            >
              {isConfirming ? 'Confirming Transaction...' : 'Mint Your POA'}
            </button>
            {error && (
              <p className="text-red-400 mt-4">
                Minting failed. You may have already minted. Check console.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}