import fs from 'fs';
import path from 'path';
import solc from 'solc';

const contractPath = path.resolve('contracts', 'CelebrityFanMessages.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
	language: 'Solidity',
	sources: {
		'CelebrityFanMessages.sol': { content: source },
	},
	settings: {
		optimizer: { enabled: true, runs: 200 },
		outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } },
	},
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
if (output.errors) {
	const errors = output.errors.filter((e) => e.severity === 'error');
	if (errors.length) {
		console.error(errors);
		process.exit(1);
	}
}

const contract = output.contracts['CelebrityFanMessages.sol']['CelebrityFanMessages'];
const outDir = path.resolve('artifacts', 'contracts', 'CelebrityFanMessages.sol');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'CelebrityFanMessages.json'), JSON.stringify({ abi: contract.abi, bytecode: contract.evm.bytecode.object }, null, 2));

// copy ABI to backend and frontend
fs.mkdirSync('backend', { recursive: true });
fs.mkdirSync('frontend', { recursive: true });
fs.writeFileSync(path.resolve('backend', 'abi.json'), JSON.stringify(contract.abi, null, 2));
fs.writeFileSync(path.resolve('frontend', 'abi.json'), JSON.stringify(contract.abi, null, 2));

console.log('Compiled. ABI and bytecode written.'); 