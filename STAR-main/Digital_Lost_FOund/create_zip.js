const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Generating final project zip archive...');

try {
  const rootDir = __dirname;
  const zipPath = path.join(rootDir, 'Digital_Lost_And_Found_System_Final.zip');

  const psCommand = `powershell -Command "Compress-Archive -Path '${rootDir}\\client', '${rootDir}\\server', '${rootDir}\\package.json', '${rootDir}\\README.md' -DestinationPath '${zipPath}' -Force"`;
  execSync(psCommand, { stdio: 'inherit' });
  
  console.log(`Zip archive created successfully at: ${zipPath}`);
} catch (err) {
  console.error('Error creating zip archive:', err.message);
}
