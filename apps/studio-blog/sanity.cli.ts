import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

import { defineCliConfig } from 'sanity/cli';

import { getStudioEnv } from './lib/env';

if (existsSync('.env')) {
  loadEnvFile('.env');
}

const TYPEGEN_PATH = '../../packages/sanity-blog';
const { projectId, dataset } = getStudioEnv();

export default defineCliConfig({
  api: {
    projectId,
    dataset
  },
  typegen: {
    path: `${TYPEGEN_PATH}/src/**/*.{ts,tsx,js,jsx}`,
    schema: './extract.json',
    generates: `${TYPEGEN_PATH}/src/types.ts`
  }
});
