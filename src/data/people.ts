import karpathy from '../assets/headshots/andrej-karpathy.png';
import acharya from '../assets/headshots/anish-acharya.png';
import mollick from '../assets/headshots/ethan-mollick.png';
import dario from '../assets/headshots/dario-amodei.png';
import daniela from '../assets/headshots/daniela-amodei.png';
import altman from '../assets/headshots/sam-altman.png';
import rachitsky from '../assets/headshots/lenny-rachitsky.png';

export const people = {
  'andrej-karpathy': {
    name: 'Andrej Karpathy',
    initials: 'AK',
    color: '#c0522a',
    headshot: karpathy,
  },
  'anish-acharya': {
    name: 'Anish Acharya',
    initials: 'AA',
    color: '#8a7d6e',
    headshot: acharya,
  },
  'ethan-mollick': {
    name: 'Ethan Mollick',
    initials: 'EM',
    color: '#7a9e8a',
    headshot: mollick,
  },
  'dario-amodei': {
    name: 'Dario Amodei',
    initials: 'DA',
    color: '#5c3d2e',
    headshot: dario,
  },
  'daniela-amodei': {
    name: 'Daniela Amodei',
    initials: 'DA',
    color: '#dab87a',
    headshot: daniela,
  },
  'sam-altman': {
    name: 'Sam Altman',
    initials: 'SA',
    color: '#6b8cae',
    headshot: altman,
  },
  'lenny-rachitsky': {
    name: 'Lenny Rachitsky',
    initials: 'LR',
    color: '#9b7cb8',
    headshot: rachitsky,
  },
} as const;

export type PersonId = keyof typeof people;
