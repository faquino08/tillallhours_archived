const activeEnv = 
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

console.log(`Using environment config: '${activeEnv}'`);

const dotenv = require("dotenv");
dotenv.config({
  path: `.env.${activeEnv}`,
});

module.exports = {
  siteMetadata: {
    title: `tillallhours`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `tillallhours`,
    baseUrl: process.env.BASE_DOMAIN,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/tillallhours-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-cms`,
      options: {
        dest: "http://cms.quoainfrank.com",
      },
    },
    {
      resolve: `gatsby-plugin-snipcart-advanced`,
      options: {
        version: "3.0.15",
        publicApiKey: process.env.SNIP_API_KEY, // use public api key here or in environment variable
        defaultLang: "en",
        currency: "usd",
        openCartOnAdd: true,
        locales: {
          en: {
            actions: {
              checkout: "Place Order",
            },
          },
        },
        innerHTML: `
            <billing section="bottom">
                <!-- Customization goes here -->
            </billing>`,
      },
    },
    /*{
      resolve: 'gatsby-plugin-snipcart',
        options: {
          apiKey: 'MjkwYzRkNjItYjdkNC00OTkzLWJiMGQtYzcwYzJmMTFjZDczNjM3MzM2NzA4NjYxNTE0MjE1'
        }
    }*/
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
