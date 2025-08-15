import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

const artifactPath = resolve('./artifacts/contracts/CelebrityFanMessages.sol/CelebrityFanMessages.json');
const artifact = JSON.parse(readFileSync(artifactPath, 'utf-8'));
const abi = artifact.abi;

const outBackend = resolve('./backend/abi.json');
const outFrontend = resolve('./frontend/abi.json');

mkdirSync(dirname(outBackend), { recursive: true });
mkdirSync(dirname(outFrontend), { recursive: true });

writeFileSync(outBackend, JSON.stringify(abi, null, 2));
writeFileSync(outFrontend, JSON.stringify(abi, null, 2));

console.log('Exported ABI to backend/abi.json and frontend/abi.json'); 