/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ejs}", "./src/views/**/*.ejs"],
  daisyui: {
    styled: true,
    themes: [
      "light", // You can specify predefined themes directly
      // You can also customize the dark theme like this:
      {
        mydark: {
          primary: "#570df8", // Customize primary color
          "base-100": "#ffffff", // Set your desired background color
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
