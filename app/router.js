import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('users', { resetNamespace: true }, function() {
    this.route('register');
    this.route('login');
    this.route('profile');
    this.route('forgot');
    this.route('settings');
    this.route('reset', { path: 'reset/:resetCode' });
  });
  this.route('contact');
});

export default Router;
