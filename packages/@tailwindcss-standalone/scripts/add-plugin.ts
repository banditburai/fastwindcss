import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PACKAGE_ROOT = path.resolve(__dirname, '..')

interface Plugin {
  name: string
  packageName: string
  version: string
}

export async function addPlugin(plugin: Plugin) {  
  if (!fs.existsSync(PACKAGE_ROOT)) {
    fs.mkdirSync(PACKAGE_ROOT, { recursive: true })
  }

  // 1. Update package.json
  const packageJsonPath = path.join(PACKAGE_ROOT, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  
  packageJson.dependencies[plugin.packageName] = plugin.version
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')

  // 2. Update index.ts if it exists
  const indexPath = path.join(PACKAGE_ROOT, 'src/index.ts')
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8')

    // Add to likelyEmbeddedFile check if not already present
    if (!indexContent.includes(`id === '${plugin.packageName}'`)) {
      indexContent = indexContent.replace(
        /(\s+)id\.startsWith\('@tailwindcss\/'\) \|\|\s*\n\s+isEmbeddedFileBase/,
        `$1id.startsWith('@tailwindcss/') ||\n    id === '${plugin.packageName}' ||\n    isEmbeddedFileBase`
      )
    }

    // Add to switch statement if not already present
    if (!indexContent.includes(`case '${plugin.packageName}':`)) {      
      indexContent = indexContent.replace(
        /case '@tailwindcss\/aspect-ratio':\s*\n\s+return id/,
        `case '@tailwindcss/aspect-ratio':\n    case '${plugin.packageName}':\n      return id`
      )
    }

    // Add to __tw_load if not already present
    if (!indexContent.includes(`if (id.endsWith('${plugin.packageName}'))`)) {      
      indexContent = indexContent.replace(
        /(\s+)else {\s*\n\s+return undefined/,
        `$1else if (id.endsWith('${plugin.packageName}')) {\n    return require('${plugin.packageName}')\n  } else {\n    return undefined`
      )
    }

    fs.writeFileSync(indexPath, indexContent)
  } else {
    console.error(`Index file not found at: ${indexPath}`)
  }
}
