import fs from 'fs';
import path from 'path';

const srcDir = '/home/ranveer/.gemini/antigravity-ide/brain/96f56560-c5dd-4e24-adb4-c91a86fb9d31';
const destDir = '/home/ranveer/app/browser-designs/apps/web/public/assets/motionsites';

const files = [
  { src: 'floren_hd_landscape_1789271345637.jpg', dest: 'floren_hd_landscape.jpg' },
  { src: 'cinema_hd_night_1789271373740.jpg', dest: 'cinema_hd_night.jpg' }
];

for (const f of files) {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.src} to ${f.dest}`);
  } else {
    console.log(`File not found: ${srcPath}`);
  }
}
