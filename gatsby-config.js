const postcssPresetEnv = require(`postcss-preset-env`)
const rucksack = require(`rucksack-css`)
const center = require(`postcss-center`)
const alias = require(`postcss-alias`)
const short = require(`postcss-short`)

module.exports = {
  siteMetadata: {
    title: 'Elloron Arts',
    siteUrl: `https://elloron.art`,
    tagLine: 'All paths lead to the mountain',
    description: 'Explore a world. An Archive of lore, illustrations, and short stories - a library of emerging lore.',
    wordings: [
      "All paths lead to the Mountain",
      "A place where none can find you",
      "The words of distant places",
      "Sights of such wonder",
      "To meet what comes",
      "And we breath in, then speak",
      "Two worlds, and a place in between",
      "Where Mountains and Sky join, the Bridge",
      "Inbark on your Crossing",
      "The Fire Brings the Dawn",
      "They Walk The World",
      "The Monster Does Not Need The Hero",
    ],
    commissionsOpen: true,
    postingZones: [
      {
        postingCost: 0,
        name: "New Zealand",
      },
      {
        postingCost: 20,
        name: "Australia",
      },
      {
        postingCost: 40,
        name: "South Pacific",
      },
      {
        postingCost: 40,
        name: "Asia",
      },
      {
        postingCost: 35,
        name: "Canada, UK, Europe or US",
      },
      {
        // TODO add note to contact about shipping cost, should be null or something?
        postingCost: 50,
        name: "The rest of the World",
      },
    ],
    discountCodes: [
      {
        name: "xgf",
        discount: 20
      },
      {
        name: "test2",
        discount: 30
      },
    ],
    globalItemBuffer: 15,
  },
  plugins: [
  
    'gatsby-plugin-sitemap',
    //"gatsby-image-sitemap",
    'gatsby-plugin-robots-txt',
    
    
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        indentedSyntax: true,
        postCssPlugins: [
          rucksack(),
          center(),
          alias(),
          short(),
          postcssPresetEnv({
            stage: 0,
          }),
        ]
        // precision: 8,
      }
    },
    
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: "UA-100204166-5",
    //     // Puts tracking script in the head instead of the body
    //     head: true,
    //     // Setting this parameter is optional
    //     anonymize: true,
    //     // Setting this parameter is also optional
    //     respectDNT: true,
    //     // Avoids sending pageview hits from custom paths
    //     // exclude: ["/preview/**", "/do-not-track/me/too/"],
    //   },
    // },
    {
      resolve: `gatsby-plugin-goatcounter`,
      options: {
        // Either `code` or `selfHostUrl` is required.
        // REQUIRED IF USING HOSTED GOATCOUNTER! https://[my_code].goatcounter.com
        code: `elloron`,

        // REQUIRED IF USING SELFHOSTED GOATCOUNTER!
        //selfHostUrl: `https://elloron-art.netlify.app/`,

        // ALL following settings are OPTIONAL

        // Avoids sending pageview hits from custom paths
        exclude: [],

        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,

        // Defines where to place the tracking script
        // boolean `true` in the head and `false` in the body
        head: true,

        // Set to true to include a gif to count non-JS users
        pixel: true,

        // Allow requests from local addresses (localhost, 192.168.0.0, etc.)
        // for testing the integration locally.
        // TIP: set up a `Additional Site` in your GoatCounter settings
        // and use its code conditionally when you `allowLocal`, example below
        allowLocal: true,

        // Override the default localStorage key more below
        localStorageKey: 'skipgc',

        // Set to boolean true to enable referrer set via URL parameters
        // Like example.com?ref=referrer.com or example.com?utm_source=referrer.com
        // Accepts a function to override the default referrer extraction
        // NOTE: No Babel! The function will be passes as is to your websites <head> section
        // So make sure the function works as intended in all browsers you want to support
        referrer: false,

        // Setting it to boolean true will clean the URL from
        // `?ref` & `?utm_` parameters before sending it to GoatCounter
        // It uses `window.history.replaceState` to clean the URL in the
        // browser address bar as well.
        // This is to prevent ref tracking ending up in your users bookmarks.
        // All parameters other than `ref` and all `utm_` will stay intact
        urlCleanup: false,
      }
    },
    
    'gatsby-plugin-react-helmet',
    
    // the way this loads svgs does not work with what I'm using to animate them. Using an inline svg comp
    // { 
    //   resolve: 'gatsby-plugin-react-svg',
    //   options: {
    //       include: /img/
    //   }
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
        
           // go before gatsby-remark-images
          
          //'gatsby-remark-relative-images', //change
          
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1000,
            },
          },
        
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
