import sharp from 'sharp';
import { mkdirSync } from 'fs';

const dir = 'src/assets/headshots';
mkdirSync(dir, { recursive: true });

const people = [
  { file: 'andrej-karpathy', initials: 'AK', color: '#c0522a' },
  { file: 'anish-acharya', initials: 'AA', color: '#8a7d6e' },
  { file: 'ethan-mollick', initials: 'EM', color: '#7a9e8a' },
  { file: 'dario-amodei', initials: 'DA', color: '#5c3d2e' },
  { file: 'daniela-amodei', initials: 'DA', color: '#dab87a' },
  { file: 'sam-altman', initials: 'SA', color: '#6b8cae' },
  { file: 'lenny-rachitsky', initials: 'LR', color: '#9b7cb8' },
];

for (const { file, initials, color } of people) {
  const svg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="${color}"/>
    <text x="100" y="112" text-anchor="middle" font-family="system-ui,sans-serif"
          font-size="72" font-weight="700" fill="white">${initials}</text>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(`${dir}/${file}.png`);
  console.log(`✓ ${file}.png`);
}
