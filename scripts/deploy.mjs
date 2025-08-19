import hardhat from 'hardhat';
const { ethers } = hardhat;

async function main() {
	const signers = await ethers.getSigners();
	if (!signers || signers.length === 0) {
		throw new Error('No signer available. Set PRIVATE_KEY in .env (funded on Shardeum) so Hardhat can configure an account.');
	}
	const [deployer] = signers;
	const Contract = await ethers.getContractFactory('CelebrityFanMessages', deployer);
	const contract = await Contract.deploy();
	await contract.waitForDeployment();
	console.log('CelebrityFanMessages deployed to:', await contract.getAddress());
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
}); 