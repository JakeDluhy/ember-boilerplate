# A Boilerplate for developing applications with Ember

This is a boilerplate application for developing using Ember.js. Although this can work as a frontend for any backend, it was specifically developed to be used with the [node-boilerplate](https://github.com/JakeDluhy/node-boilerplate) application I've created. The idea is that using these boilerplates a starting point, you can go from 0 to a deployed (on AWS), production, user ready application in 1-2 hours.

## Requirements

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Getting Started

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Configure for Google Analytics

Google Analytics is a powerful tool, that at it's most basic let's you track pageviews across your app. With more advanced usage you can gain valuable insight into what your users are doing.

### Sign up for a Google Analytics account

Visit the [signup page](https://analytics.google.com/analytics/) and step through the process to create an account.
* Set an account name
* Set a website name
* Set your website's url
* Click Get Tracking ID to get your tracking ID

### Add the Tracking ID to your site

In the admin panel, shown just after signup, there is a script tag code snippet. Simply paste that into the head of index.html (removing `window.ga = undefined`) and it will start tracking your website! Note also delete the last line `ga('send', 'pageview')` as the app will do that on transition, and so on first load it would double send.

## Deploying

In order to deploy the app. First follow the setup at the [node-boilerplate](https://github.com/JakeDluhy/node-boilerplate) app. This details how to deploy the application assets to Amazon S3 and the index.html to Postgres (or Redis) as per the [lightning deploy strategy]().

What this means is once this setup is complete, a simple `ember deploy 'prod'` followed by `ember deploy:activate prod --revision={revision hash}` to activate the current deploy

## Running / Development

* `ember server`
* To proxy to the backend, run `ember server --proxy http://localhost:3300
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Note on environment config

For both the Node and Ember apps, there are environment configuration variables that are set within the development.js, test.js, and production.js (and env-vars.js) files. These are obviously sensitive, and should be disseminated with care. Do not commit these to a public repo!

## Disclaimer

I do not claim to be an expert programmer, and I am sure there are many bugs and flaws in this application. As you notice them, please open issues and point them out to me, so that we can keep improving it. Note in particular any security flaws that you see, please make sure we can address them. Thanks!

## Contributing

I would love for you to contribute, suggestions, PR's, everything is welcome to make this an awesome boilerplate app

## License

MIT
