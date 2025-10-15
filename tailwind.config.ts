import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
      },
    },
  },
  plugins: [forms],
} satisfies Config;
