import fs from 'fs';
import path from 'path';

export const social: { readonly [icon: string]: string } = {
  instagram: fs.readFileSync(path.join(__dirname, 'social', 'instagram.svg'), 'utf8'),
};

export const logo = fs.readFileSync(path.join(__dirname, 'logo.svg'), 'utf8');
export const back = fs.readFileSync(path.join(__dirname, 'back.svg'), 'utf8');
