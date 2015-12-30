import Ember from 'ember';
import { TRANSITION_ROUTES } from '../utils/constants';

const { service } = Ember.inject;

export default Ember.Mixin.create({
  /** @type {object} Session service */
  session: service('session'),

  /**
   * Before the model is fetched, check whether the user is authenticated using ember-simple-auth
   * @param  {String} transition The attempted transition
   * If the user is not authenticated, redirect to the login route, after which redirect to the previously attempted transition
   */
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
