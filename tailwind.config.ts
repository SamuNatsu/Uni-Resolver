/// Tailwind CSS config
import { Config } from 'tailwindcss';

/* Export default */
export default <Config>{
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
};
