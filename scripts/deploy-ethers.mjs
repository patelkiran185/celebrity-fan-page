import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const RPC_URL = process.env.RPC_URL || 'https://api-unstable.shardeum.org';
let PRIVATE_KEY = process.env.PRIVATE_KEY || '';
if (PRIVATE_KEY && !PRIVATE_KEY.startsWith('0x')) PRIVATE_KEY = '0x' + PRIVATE_KEY;

const artifactPath = path.resolve('artifacts', 'contracts', 'CelebrityFanMessages.sol', 'CelebrityFanMessages.json');
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

async function main() {
	if (!PRIVATE_KEY) throw new Error('Set PRIVATE_KEY in .env');
	const provider = new ethers.JsonRpcProvider(RPC_URL);
	const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
	const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
	console.log('Deploying...');
	const contract = await factory.deploy();
	await contract.waitForDeployment();
	const address = await contract.getAddress();
	console.log('Deployed at:', address);
	console.log('Exporting ABI to frontend/backend...');
	fs.writeFileSync(path.resolve('backend', 'abi.json'), JSON.stringify(artifact.abi, null, 2));
	fs.writeFileSync(path.resolve('frontend', 'abi.json'), JSON.stringify(artifact.abi, null, 2));
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
}); 