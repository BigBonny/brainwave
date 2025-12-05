import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import landingPage from "./schemas/landingPage";


export default defineConfig({
  name: 'default',
  title: 'spheora',

  projectId: '42aruqyo',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [landingPage],
  },
})
