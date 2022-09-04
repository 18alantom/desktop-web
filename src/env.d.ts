/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT_FRONTEND: string;
  readonly VITE_PORT_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
