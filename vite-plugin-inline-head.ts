import { Plugin, ResolvedConfig } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import { build } from 'esbuild';

interface InlineHeadPluginOptions {
  scriptPath: string;
  hashPlaceholder?: string;
}

export function inlineHeadPlugin(options: InlineHeadPluginOptions): Plugin {
  const { scriptPath, hashPlaceholder = '__HEAD_SCRIPT_HASH__' } = options;

  let config: ResolvedConfig;
  let compiledCode: string | null = null;
  let cspHash: string | null = null;

  async function compileScript(): Promise<string> {
    const absolutePath = path.resolve(scriptPath);

    // Convert Vite aliases to esbuild format
    const alias: Record<string, string> = {};
    if (config?.resolve?.alias) {
      const viteAliases = config.resolve.alias;
      if (Array.isArray(viteAliases)) {
        for (const { find, replacement } of viteAliases) {
          if (typeof find === 'string') {
            alias[find] = replacement;
          }
        }
      }
    }

    const result = await build({
      entryPoints: [absolutePath],
      bundle: true,
      write: false,
      format: 'iife',
      minify: true,
      target: 'es2020',
      alias,
    });

    return result.outputFiles[0].text.trim();
  }

  function calculateCSPHash(code: string): string {
    const hash = createHash('sha256').update(code).digest('base64');
    return `'sha256-${hash}'`;
  }

  return {
    name: 'inline-head-script',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    async buildStart() {
      compiledCode = await compileScript();
      cspHash = calculateCSPHash(compiledCode);
      console.log(`[inline-head] CSP hash: ${cspHash}`);
    },

    transformIndexHtml: {
      order: 'pre',
      async handler(html) {
        if (!compiledCode) {
          compiledCode = await compileScript();
          cspHash = calculateCSPHash(compiledCode);
        }

        const scriptTag = `<script>${compiledCode}</script>`;
        return html.replace(/<head>/, `<head>\n    ${scriptTag}`);
      },
    },

    writeBundle(outputOptions) {
      if (!cspHash || !outputOptions.dir) return;

      const headersPath = path.join(outputOptions.dir, '_headers');

      if (!fs.existsSync(headersPath)) {
        console.warn(`[inline-head] _headers not found in output: ${headersPath}`);
        return;
      }

      let content = fs.readFileSync(headersPath, 'utf-8');

      if (content.includes(hashPlaceholder)) {
        content = content.replace(hashPlaceholder, cspHash);
        fs.writeFileSync(headersPath, content);
        console.log(`[inline-head] Replaced ${hashPlaceholder} with ${cspHash} in _headers`);
      }
    },
  };
}
