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
        ember: '#F59E0B',
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
