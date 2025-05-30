import fs from 'fs';
import path from 'path';

export const dog: { readonly [icon: string]: string } = {
  brushHolding: fs.readFileSync(path.join(__dirname, 'dogs', 'brush-holding.svg'), 'utf8'),
  lurking: fs.readFileSync(path.join(__dirname, 'dogs', 'lurking.svg'), 'utf8'),
  smirking: fs.readFileSync(path.join(__dirname, 'dogs', 'smirking.svg'), 'utf8'),
};

export const social: { readonly [icon: string]: string } = {
  linkedin: fs.readFileSync(path.join(__dirname, 'social', 'linkedin.svg'), 'utf8'),
};
