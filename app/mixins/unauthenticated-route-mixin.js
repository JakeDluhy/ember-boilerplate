import Ember from 'ember';
import { TRANSITION_ROUTES } from '../utils/constants';

const { service } = Ember.inject;

export default Ember.Mixin.create({
  /** @type {Object} The session service */
  session: service('session'),

   /**
   * Before the model is fetched, check whether the user is unauthenticated using ember-simple-auth
   * @param  {String} transition - the attempted transition
   * If the user is authenticated, redirect to the index route
   */
  beforeModel(transition) {
    if (this.get('session.isAuthenticated')) {
      transition.abort();
      Ember.assert('The route configured as Configuration.routeIfAlreadyAuthenticated cannot implement the UnauthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== TRANSITION_ROUTES.UNAUTHENTICATE);
      Ember.get(this, 'flashMessages').warning("This route is only necessary if you're logged out");
      this.transitionTo(TRANSITION_ROUTES.UNAUTHENTICATE);
    } else {
      return this._super(...arguments);
    }
  }
});
