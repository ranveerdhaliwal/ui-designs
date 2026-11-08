import reactHooks from 'eslint-plugin-react-hooks';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
export default tseslint.config(
  { ignores: ['dist/**', 'src/features/wet-paint-flow/Engine.ts', 'src/features/scrollworld/scrubEngine.js'] },
  js.configs.recommended,
  {files:['src/**/*.{ts,tsx}'],plugins:{'react-hooks':reactHooks},rules:{'react-hooks/rules-of-hooks':'error','react-hooks/exhaustive-deps':'error'}},
  ...tseslint.configs.recommended,
  { files: ['src/**/*.{ts,tsx}'], languageOptions: { globals: { window:'readonly', document:'readonly', navigator:'readonly', console:'readonly', requestAnimationFrame:'readonly', cancelAnimationFrame:'readonly', setTimeout:'readonly', clearTimeout:'readonly', setInterval:'readonly', clearInterval:'readonly', Image:'readonly', localStorage:'readonly', ResizeObserver:'readonly', IntersectionObserver:'readonly', performance:'readonly', URL:'readonly', Blob:'readonly', FileReader:'readonly', fetch:'readonly', devicePixelRatio:'readonly', matchMedia:'readonly', CustomEvent:'readonly', AbortController:'readonly', alert:'readonly', confirm:'readonly', createImageBitmap:'readonly', OffscreenCanvas:'readonly' } }, rules: { '@typescript-eslint/no-unused-vars':['error',{argsIgnorePattern:'^_',varsIgnorePattern:'^_'}], '@typescript-eslint/no-explicit-any':'error', 'no-undef':'off' } },
);
