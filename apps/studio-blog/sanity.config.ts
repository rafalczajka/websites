import 'katex/dist/katex.min.css';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { getStudioEnv } from './lib/env';
import { schemaTypes } from './schemas';

const { projectId, dataset } = getStudioEnv();

export default defineConfig({
  name: 'default',
  title: 'Blog',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes
  }
});
