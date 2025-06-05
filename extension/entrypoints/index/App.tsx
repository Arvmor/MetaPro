import React from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

function WalletInfo() {
  const { publicKey } = useWallet();
  if (!publicKey) return <p>Please connect your wallet.</p>;
  return <p>Connected wallet: {publicKey.toBase58()}</p>;
}

export default function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="index-container">
            <h1>MetaPro Solana Wallet</h1>
            <WalletMultiButton />
            <WalletInfo />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
