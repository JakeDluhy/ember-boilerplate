import Ember from 'ember';
import { TRANSITION_ROUTES } from '../utils/constants';

const { service } = Ember.inject;

export default Ember.Mixin.create({
  session: service('session'),

  // Essentially an extended authenticated route mixin
  // I wanted to show a flash message warning when redirecting
  beforeModel(transition) {
    if (!this.get('session.isAuthenticated')) {
      transition.abort();
      this.get('session').set('attemptedTransition', transition);
      Ember.assert('The route configured as Configuration.authenticationRoute cannot implement the AuthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== TRANSITION_ROUTES.AUTHENTICATE);
      Ember.get(this, 'flashMessages').danger("This route is restricted. Log in and we'll get right back to it!");
      this.transitionTo(TRANSITION_ROUTES.AUTHENTICATE);
    } else {
      return this._super(...arguments);
    }
  }
});
