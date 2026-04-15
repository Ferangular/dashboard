/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  glob: (pattern: string) => Record<string, () => Promise<unknown>>;
  globEager: (pattern: string) => Record<string, unknown>;
}
