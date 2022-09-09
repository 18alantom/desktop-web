import { execa } from 'execa';
import { join } from 'path';
import { fileURLToPath } from 'url';

process.env.MODE = 'production';
process.env.VITE_PORT_SERVER = 5000;

const scriptPath = fileURLToPath(new URL('.', import.meta.url));
const serverPath = join(scriptPath, '..', 'backend-server', 'server.js');
const serverProcess = execa('node', [serverPath]);

serverProcess.stdout.pipe(process.stdout);
serverProcess.stderr.pipe(process.stderr);
