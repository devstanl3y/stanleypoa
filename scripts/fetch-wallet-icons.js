const https = require('https');
const fs = require('fs');
const path = require('path');

const walletIcons = {
  'coinbase': 'https://avatars.githubusercontent.com/u/18060234?s=200&v=4',
  'metamask': 'https://github.com/MetaMask/brand-resources/raw/master/SVG/metamask-fox.svg',
  'walletconnect': 'https://avatars.githubusercontent.com/u/37784886?s=200&v=4',
  'zerion': 'https://avatars.githubusercontent.com/u/33968667?s=200&v=4'
};

const downloadIcon = (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join('public', 'wallet-icons', filename));
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(path.join('public', 'wallet-icons', filename), () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const createWalletIconsDirectory = () => {
  const dir = path.join('public', 'wallet-icons');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const downloadAllIcons = async () => {
  createWalletIconsDirectory();
  
  console.log('Downloading wallet icons...');
  
  for (const [wallet, url] of Object.entries(walletIcons)) {
    try {
      const extension = url.includes('.svg') ? '.svg' : '.png';
      await downloadIcon(url, `${wallet}${extension}`);
    } catch (error) {
      console.error(`Failed to download ${wallet} icon:`, error);
    }
  }
  
  console.log('All wallet icons downloaded!');
};

downloadAllIcons();