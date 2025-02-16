import os from 'node:os'
import path from 'node:path'
import { candidate, css, html, json, test, getStandaloneBinary } from '../utils'

const STANDALONE_BINARY = getStandaloneBinary()

test(
  'includes first-party plugins',
  {
    fs: {
      'package.json': json`
        {
          "dependencies": {
            "tailwindcss": "workspace:^",
            "@tailwindcss/cli": "workspace:^"
          }
        }
      `,
      'index.html': html`
        <div className="prose">
          <h1>Headline</h1>
        </div>
        <input type="text" class="form-input" />
        <div class="aspect-w-16"></div>
      `,
      'src/index.css': css`
        @import 'tailwindcss/theme' theme(reference);
        @import 'tailwindcss/utilities';

        @plugin '@tailwindcss/forms';
        @plugin '@tailwindcss/typography';
        @plugin '@tailwindcss/aspect-ratio';
      `,
    },
  },
  async ({ fs, exec }) => {
    await exec(
      `${path.resolve(__dirname, `../../packages/@tailwindcss-standalone/dist/${STANDALONE_BINARY}`)} --input src/index.css --output dist/out.css`,
    )

    await fs.expectFileToContain('dist/out.css', [
      candidate`form-input`,
      candidate`prose`,
      candidate`aspect-w-16`,
    ])
  },
)
