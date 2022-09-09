import { execa } from 'execa';
import { join } from 'path';
import { fileURLToPath } from 'url';

process.env.MODE = 'development';
const scriptPath = fileURLToPath(new URL('.', import.meta.url));

function serve() {
  execute('npx', ['vite']);
  if (process.argv[2] === '--electron') {
    const codePath = join(scriptPath, '..', 'backend-desktop', 'main.js');
    execute('npx', ['electron', codePath]);
  } else {
    const codePath = join(scriptPath, '..', 'backend-server', 'server.js');
    execute('node', [codePath]);
  }
}

function execute(...args) {
  const childProcess = execa(...args);
  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
}

serve();
