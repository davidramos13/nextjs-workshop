'use server';

import path from 'path';
import fs from 'fs/promises';

export default async function write(formData: FormData) {
  const value = formData.get('value');
  const timestamp = new Date().toUTCString();

  const log = `# ${timestamp} ### ${value}\n`;

  const filePath = path.join(process.cwd(), '..', 'shared', 'logfile.txt');
  await fs.appendFile(filePath, log, 'utf-8');
}
