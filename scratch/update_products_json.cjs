const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const imageMap = {
  'br06': '/images/hardware/br06.svg',
  't5324-mdvr': '/images/hardware/t5324-mdvr.svg',
  'sp-ble4-fuel': '/images/hardware/sp-ble4-fuel.svg',
  'eh15': '/images/hardware/eh15.svg',
  'v5-mini': '/images/hardware/v5-mini.svg',
  'br05-4g': '/images/hardware/br05-4g.svg',
  'gl500-2g': '/images/hardware/gl500-2g.svg',
  '7h-elock': '/images/hardware/7h-elock.svg',
  'eco5-lite': '/images/hardware/eco5-lite.svg',
  'gb440': '/images/hardware/gb440.svg',
  'v5-4g': '/images/hardware/v5-4g.svg',
  'prithvi-140-rto': '/images/hardware/prithvi-140-rto.svg',
  'gl500-4g': '/images/hardware/gl500-4g.svg',
  'falcon-f1-ai-4g': '/images/hardware/falcon-f1.svg',
  'titan-t4-ai-4g': '/images/hardware/titan-t4.svg',
  'sentinel-s3-ai-4g': '/images/hardware/sentinel-s3.svg',
  'vector-v2-pro-4g': '/images/hardware/vector-v2-pro.svg',
  'vector-v2-ai-4g': '/images/hardware/vector-v2-ai.svg',
  'sentinel-s4': '/images/hardware/sentinel-s4.svg',
  'ecogas-track': '/images/hardware/ecogas-track.svg',
  'prithvi-140-mining': '/images/hardware/prithvi-140-mining.svg',
  'prithvi-140-oem': '/images/hardware/prithvi-140-oem.svg',
  'prithvi-140': '/images/hardware/prithvi-140.svg'
};

products.forEach(p => {
  if (imageMap[p.id]) {
    p.image = imageMap[p.id];
  } else {
    p.image = '/images/hardware/br06.svg';
  }
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log('Successfully updated image paths in products.json for all', products.length, 'products');
