import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1F2937',
        body: '#374151',
        paper: '#F9FAFB',
        ember: 'hsl(35 85% 55%)',
        emberLight: 'hsl(35 90% 65%)',
        teal: 'hsl(165 70% 45%)',
        tealLight: 'hsl(165 70% 65%)',
        link: '#3B82F6'
      },
      maxWidth: {
        site: '1200px'
      }
    }
  },
  plugins: []
};

export default config;
