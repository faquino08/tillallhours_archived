<h1 align="center">
    <a href="https://faquino08.github.io/" >
        <div width="100%">
            <img alt="Gatsby" src="./src/images/tillallhours-logo-web.svg" width="75%" style="margin-bottom:0;padding-bottom:0"/>
        </div>
        <div width="100%" style="position:relative;right:-30%;">
            <img src="./src/images/tillallhours-logo-web_copy.svg-text59-878.png" width="10%"/>
        </div>
    </a>
</h1>

This was an e-commerce site that was deployed in November of 2020. It was in operation until approximately 2022. 

<h3 align="center"> 
    <a href="https://faquino08.github.io/" >
        Demo
    </a>
</h3>

## Project Goals 
This site was meant to provide a place for receiving and managing orders for a made-to-order soy candle business. 

The site itself didn't need to be a complete web application, because the only function that the site would serve from the user's point of view is placing orders. The owner of the website did not plan on changing the content of the website often besides adding new product options. Therefore a static site generator was chosen because it would allow for a faster website without needing to dedicate time to optimization, while still allowing for an easy way to update the site's content and handle orders.

The next step was determing how to store the content such that it could be easliy edited later. A CMS was chosen to store the website content and product details.

## Project Outline
I chose [GatsbyJs](https://www.gatsbyjs.com/) to serve as a static site generator. Mainly because I was already familiar with ReactJS. I also selected [Directus](https://directus.io/) since it acts as only a layer on top of a database (MySql, SQLite, etc), which makes it easy to backup all the content or switch to a different CMS. I chose [Snipcart](https://snipcart.com/) due to the simplicity of it's api for integration with the static site and it's pricing structure. Although, Shopify does offer a comparable shopping cart service that could easily be substituted in, because both services operate fundamentally the same way. And lastly, hosting was handled by [Cloudflare Workers](https://workers.cloudflare.com/) for fast reliable hosting.

## How It Works
![tillallhours diagram](./tillallhours%20diagram.png)

When `npm build` is run the script `/plugins/gatsby-source-cms/gatsby-node.js` runs to consume the information necessary to build the webpage. This includes all images present on the site as well as all text not in the navigation bar. Once loaded into the GraphQL API, Gatsby then pulls data as needed to build all the web pages which includes the home page, a catalog page, and an about page. As well as generating product pages for each product listed in the cms for placing orders. In deployment, the site will receive the api token and endpoint to contact the Snipcart service and post new orders. Snipcart then provides a simple dashboard for the owner of the website to keep track of incoming and pending orders.

Whenever the owner wanted to make a site change such as change new images or alter text they can log into the directus cms and make the changes, and notifying me to rebuild and update the files on Cloudflare Workers which takes less than five minutes once the CMS content has been edited.
