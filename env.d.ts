declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_AUTH: '1' | '0';
    NODE_ENV: 'development' | 'production' | 'test';
    TESTS_BASE_URL: string;
  }
}
