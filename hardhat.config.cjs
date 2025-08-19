require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const PRIVATE_KEY = (process.env.PRIVATE_KEY || '').replace(/^0x/, '');
const RPC_URL = process.env.RPC_URL || 'https://api-unstable.shardeum.org';

module.exports = {
	solidity: '0.8.20',
	networks: {
		shardeum: {
			url: RPC_URL,
			chainId: 8080,
			accounts: PRIVATE_KEY ? ['0x' + PRIVATE_KEY] : [],
		},
	},
}; 