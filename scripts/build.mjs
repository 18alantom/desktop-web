import builder from 'electron-builder';
import fs from 'fs-extra';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { build as viteBuild } from 'vite';

const scriptPath = fileURLToPath(new URL('.', import.meta.url));
const __dirname = join(scriptPath, '..');

async function build() {
  if (process.argv[2] === '--electron') {
    await buildElectron();
  } else {
    await buildNode();
  }
}

async function buildNode() {
  const outDir = join(__dirname, 'backend-server', 'dist');
  fs.removeSync(outDir);
  fs.ensureDirSync(outDir);

  await viteBuild({ build: { outDir } });
}

async function buildElectron() {
  const destDir = join(__dirname, 'dist');
  const bundledDir = join(destDir, 'bundled');
  fs.removeSync(destDir);

  console.log('building app bundle');
  await buildAppBundle(bundledDir);

  console.log('\npackaging app');
  await packageApp(destDir, bundledDir);
}

async function buildAppBundle(bundledDir) {
  await buildFrontend(bundledDir);
  await copyFiles(bundledDir);
}

async function buildFrontend(outDir) {
  const base = 'app://./';
  await viteBuild({
    base,
    build: { outDir },
  });

  removeBaseLeadingSlash(outDir, base);
}

async function copyFiles(bundledDir) {
  fs.copySync(
    join(__dirname, 'backend-desktop'),
    join(bundledDir, 'backend-desktop')
  );

  fs.copySync(
    join(__dirname, 'backend-common'),
    join(bundledDir, 'backend-common')
  );

  fs.ensureDirSync(join(bundledDir, 'node_modules'));
  await modifyAndCopyPackageJSON(bundledDir);
}

async function packageApp(destDir, bundledDir) {
  await builder.build({
    config: {
      directories: {
        output: destDir,
        app: bundledDir,
      },
      files: ['**'],
    },
  });
}

async function modifyAndCopyPackageJSON(bundledDir) {
  const fileBuffer = await fs.readFile(join(__dirname, 'package.json'));
  const packageJSON = JSON.parse(fileBuffer.toString('utf-8'));
  packageJSON.main = join('backend-desktop', 'main.js');

  await fs.writeFile(
    join(bundledDir, 'package.json'),
    JSON.stringify(packageJSON, null, 2)
  );
}

function removeBaseLeadingSlash(dir, base) {
  for (const file of fs.readdirSync(dir)) {
    const path = join(dir, file);
    if (fs.lstatSync(path).isDirectory()) {
      removeBaseLeadingSlash(path, base);
      continue;
    }

    const contents = fs.readFileSync(path).toString('utf-8');
    fs.writeFileSync(path, contents.replaceAll('/' + base, base));
  }
}

build();
