// /** @type {import('tailwindcss').Config} */
// export const content = ["./src/**/*.{html,js,jsx}"];
// export const theme = {
//   extend: {
//     // maxWidth: {
//     //   '1/2': '50%',
//     //   '3/4': '75%',
//     //   '4/5': '80%',
//     //   '6/10': '60%',
//     //   '9/10': '90%',
//     // },
//   },
// };
// export const plugins = [
//   require('@tailwindcss/forms'),
//   // - the data table issue
// ];



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  
  theme: {
    extend: {
      maxWidth: {
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%',
        '6/10': '60%',
        '9/10': '90%',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), 
  
  ],
}