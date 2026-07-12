// Site-wide configuration — edit this file to update site settings

export const siteConfig = {
  title: 'Black Summit',
  seoTitle: 'The Black Summit',
  siteUrl: 'https://black-summit.netlify.app',
  tagLine: 'WHEre Mountain and Sky Join, THe Bridge',
  description: 'Explore a world. An Archive of lore, illustrations, and short stories — a library of emerging lore.',
  commissionsOpen: true,

  // $15 buffer added to all prices to cover packaging + domestic post
  globalItemBuffer: 15,

  // Posting zones with costs in NZD
  postingZones: [
    { name: 'New Zealand',              postingCost: 0  },
    { name: 'Australia',                postingCost: 20 },
    { name: 'South Pacific',            postingCost: 40 },
    { name: 'Asia',                     postingCost: 40 },
    { name: 'Canada, UK, Europe or US', postingCost: 35 },
    { name: 'Rest of the World',        postingCost: 50 },
  ],

  // Discount codes — add/remove here
  discountCodes: [
    { name: 'xgf',   discount: 20 },
    { name: 'test2', discount: 30 },
  ],

  // PayPal production client ID
  paypalClientId: 'AT2N80Uan4dARyrWcKyBvj44TNxp2mfrCRlAFPjvpA9-J6TMpMeOgPGK_fb0GkQa9jziuv8Y_uiVzKc3',

  // GoatCounter analytics
  goatCounterCode: 'elloron',

  // Social links
  social: {
    instagram: 'https://www.instagram.com/heartofarah/',
    facebook:  'https://www.facebook.com/HeartOfArahArt',
    tiktok:    'https://www.tiktok.com/@heartofarah?lang=en',
  },
};
