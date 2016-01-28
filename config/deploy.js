var envVars = require('./env-vars');

var VALID_DEPLOY_TARGETS = [ //update these to match what you call your deployment targets
  'dev',
  'qa',
  'prod'
];

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    redis: {
      allowOverwrite: true,
      keyPrefix: envVars.appName+':index'
    },
    s3: {
      prefix: envVars.appName
    }
  };
  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'dev') {
    ENV.build.environment = 'development';
    ENV.redis.url = process.env.REDIS_URL || 'redis://127.0.0.1:6379/';
    ENV.plugins = ['build', 'redis']; // only care about deploying index.html into redis in dev
  }

  if (deployTarget === 'qa' || deployTarget === 'prod') {
    ENV.build.environment = 'production';
    ENV.s3.accessKeyId = envVars.accessKeyId;
    ENV.s3.secretAccessKey = envVars.secretAccessKey;
    ENV.s3.bucket = envVars.s3Bucket;
    ENV.s3.region = envVars.s3Region;
  }

  if (deployTarget === 'qa') {
    ENV.redis.url = process.env.QA_REDIS_URL;
  }

  if (deployTarget === 'prod') {
    // ENV.redis.url = process.env.PROD_REDIS_URL;
    ENV.fingerprint = {
      enabled: true,
      prepend: envVars.cdnUrl
    };

    ENV.redis.host = 'localhost';
    ENV['ssh-tunnel'] = envVars.tunnelConfig;
  }

  return ENV;

  /* Note: a synchronous return is show above, but ember-cli-deploy
   * does support returning a promise, in case you need to get any of
   * your configuration asynchronously. e.g.
   *
   *    var Promise = require('ember-cli/lib/ext/promise');
   *    return new Promise(function(resolve, reject){
   *      var exec = require('child_process').exec;
   *      var command = 'heroku config:get REDISTOGO_URL --app my-app-' + deployTarget;
   *      exec(command, function (error, stdout, stderr) {
   *        ENV.redis.url = stdout.replace(/\n/, '').replace(/\/\/redistogo:/, '//:');
   *        if (error) {
   *          reject(error);
   *        } else {
   *          resolve(ENV);
   *        }
   *      });
   *    });
   *
   */
}
