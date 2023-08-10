import formsPlugin from "@tailwindcss/forms"
import typographyPlugin from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./app/**/*.{js,ts,jsx,tsx}"
   ],
   theme:{
      extend: {
         colors: {
            main: "#f6f0ee",
            highlight: "#2f2423",
            accent: "#e9e5e3"
         },
         gridColumn: {
            "span-16": "span 16 / span 16",
          }
      }
   },
   plugins: [
      formsPlugin, 
      typographyPlugin
   ],
}
