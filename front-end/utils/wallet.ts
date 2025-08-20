// utils/wallet.ts
import { ethers } from "ethers";

export const RPC_URL = 'https://api-unstable.shardeum.org';
export const CHAIN_ID = 8080;
export const CONTRACT_ADDRESS = '0xb08E78fCB8D9cc29cfE7D8f1E3Ef322611598BAE';

export async function ensureNetwork() {
  const provider = (window as any).ethereum;
  if (!provider) throw new Error('MetaMask not found');
  const network = await provider.request({ method: 'eth_chainId' });
  if (parseInt(network, 16) !== CHAIN_ID) {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x' + CHAIN_ID.toString(16),
        chainName: 'Shardeum Unstablenet',
        nativeCurrency: { name: 'Shardeum', symbol: 'SHM', decimals: 18 },
        rpcUrls: [RPC_URL],
        blockExplorerUrls: ['https://explorer-unstable.shardeum.org/']
      }]
    });
  }
}

export async function connectWallet(setAccount: (a: string) => void, setStatus: (s: string) => void) {
  try {
    await ensureNetwork();
    const provider = (window as any).ethereum;
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    setStatus("Wallet connected!");
  } catch (e: any) {
    setStatus(e.message);
  }
}

export async function sendMessage(
  account: string,
  message: string,
  setStatus: (s: string) => void
) {
  try {
    if (!account) throw new Error('Connect wallet first');
    if (CONTRACT_ADDRESS.startsWith('REPLACE')) throw new Error('Deploy contract first and set CONTRACT_ADDRESS');
    const abi = await (await fetch('/abi.json')).json();
    await ensureNetwork();
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    if (!message.trim()) throw new Error('Message cannot be empty');
    setStatus('Sending transaction...');
    const tx = await contract.sendMessage(message, { value: ethers.parseEther('0.2') });
    await tx.wait();
    setStatus('Message sent! Tx: ' + tx.hash);
    
  } catch (e: any) {
    setStatus('Error: ' + (e?.message || e));
  }
}
