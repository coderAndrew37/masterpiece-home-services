import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './schemaTypes'
import { structure } from './schemaTypes/structure';

// These two env vars are required — get them from sanity.io/manage
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Masterpiece Home Services',

  projectId,
  dataset,

  // This makes the Studio live at /studio instead of the site root
  basePath: '/studio',

  plugins: [
    structureTool({structure}),
    // Lets you write and test raw GROQ queries inside the Studio ("Vision" tab)
    visionTool(),
  ],

  schema,
})