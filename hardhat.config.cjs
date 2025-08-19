require('@nomicfoundation/hardhat-toolbox');

const PRIVATE_KEY = (process.env.PRIVATE_KEY || '').replace(/^0x/, '');

module.exports = {
	solidity: '0.8.20',
	networks: {
		shardeum: {
			url: 'https://api-unstable.shardeum.org',
			chainId: 8080,
			accounts: PRIVATE_KEY ? ['0x' + PRIVATE_KEY] : [],
		},
	},
}; 