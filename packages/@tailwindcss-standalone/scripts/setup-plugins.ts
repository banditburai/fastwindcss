import { plugins } from './plugins.config'
import { addPlugin } from './add-plugin'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { exec } from 'node:child_process'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PACKAGE_ROOT = path.resolve(__dirname, '..')

export async function setupPlugins() {
  console.error('Setting up plugins...')
  
  for (const plugin of plugins) {
    console.error(`Adding plugin: ${plugin.name}`)
    await addPlugin(plugin)
  }
    
  console.error('Installing dependencies...')
  await execCommand('pnpm install --no-frozen-lockfile', {
    cwd: PACKAGE_ROOT,
  })  
  
  console.error('Plugins setup complete!')
}

function execCommand(command: string, options: { cwd: string }) {
  return new Promise((resolve, reject) => {
    exec(
      command,
      {
        cwd: options.cwd,
      },
      (error, stdout, stderr) => {
        if (error) {
          console.error(stderr)
          console.error(stdout)
          reject(error)
        } else {
          resolve(stdout.toString())
        }
      }
    )
  })
}

// Always run setupPlugins when this file is executed
setupPlugins().catch(error => {
  console.error('Error in setup-plugins:', error)
  process.exit(1)
})