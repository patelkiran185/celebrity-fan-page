import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const RPC_URL = process.env.RPC_URL || 'https://api-unstable.shardeum.org';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '';
const PORT = process.env.PORT || 3000;

const provider = new ethers.JsonRpcProvider(RPC_URL);
const abi = JSON.parse(readFileSync(resolve('./backend/abi.json'), 'utf-8'));
const contract = CONTRACT_ADDRESS ? new ethers.Contract(CONTRACT_ADDRESS, abi, provider) : null;

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/verify/:wallet', async (req, res) => {
	try {
		if (!contract) return res.status(400).json({ error: 'Contract not configured' });
		const wallet = (req.params.wallet || '').toLowerCase();
		const filter = contract.filters.MessageSent(wallet);
		const events = await contract.queryFilter(filter);
		return res.json({ status: events.length > 0 ? 'pass' : 'fail', count: events.length });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

// serve static frontend
app.use(express.static(resolve('./frontend')));

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
	if (!CONTRACT_ADDRESS) {
		console.log('Warning: CONTRACT_ADDRESS not set. Set it in .env once deployed.');
	}
}); 