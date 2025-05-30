import fs from 'fs';
import path from 'path';

export const footerDog = fs.readFileSync(path.join(__dirname, 'footer-dog.svg'), 'utf8');

export const social: { readonly [icon: string]: string } = {
  linkedin: fs.readFileSync(path.join(__dirname, 'social', 'linkedin.svg'), 'utf8'),
};
