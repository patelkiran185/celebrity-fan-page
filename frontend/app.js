import { ethers } from "ethers";

const RPC_URL = 'https://api-unstable.shardeum.org';
const CHAIN_ID = 8080; // Unstablenet
const CONTRACT_ADDRESS = '0xb08E78fCB8D9cc29cfE7D8f1E3Ef322611598BAE';
let abi = [];

async function ensureNetwork() {
	const provider = window.ethereum;
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

async function connect() {
	try {
		await ensureNetwork();
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		document.getElementById('account').textContent = accounts[0];
	} catch (e) {
		setStatus(e.message);
	}
}

function setStatus(text) {
	document.getElementById('status').textContent = text || '';
}

async function sendMessage() {
	try {
		if (CONTRACT_ADDRESS.startsWith('REPLACE')) throw new Error('Deploy contract first and set CONTRACT_ADDRESS');
		abi = await (await fetch('/abi.json')).json();
		await ensureNetwork();
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
		const message = document.getElementById('msg').value.trim();
		if (!message) throw new Error('Message cannot be empty');
		setStatus('Sending transaction...');
		const tx = await contract.sendMessage(message, { value: ethers.parseEther('0.2') });
		await tx.wait();
		setStatus('Message sent! Tx: ' + tx.hash);
	} catch (e) {
		setStatus('Error: ' + (e?.message || e));
	}
}

window.connect = connect;
window.sendMessage = sendMessage;
