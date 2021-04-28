/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
	/* Your site config here */
	plugins: [
		'gatsby-plugin-chakra-ui',
		{
			resolve: 'gatsby-plugin-auth0',
			options: {
				domain: process.env.GATSBY_AUTH0_DOMAIN,
				clientId: process.env.GATSBY_AUTH0_CLIENT_ID
			}
		}
	]
};
