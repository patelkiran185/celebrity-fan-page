import { ethers } from 'hardhat';

async function main() {
	const Contract = await ethers.getContractFactory('CelebrityFanMessages');
	const contract = await Contract.deploy();
	await contract.waitForDeployment();
	console.log('CelebrityFanMessages deployed to:', await contract.getAddress());
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
}); 