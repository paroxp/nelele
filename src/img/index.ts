import fs from 'fs';
import path from 'path';

export const social: { readonly [icon: string]: string } = {
  // linkedin: fs.readFileSync(path.join(__dirname, 'social', 'linkedin.svg'), 'utf8'),
};

export const logo = fs.readFileSync(path.join(__dirname, 'logo.svg'), 'utf8');
