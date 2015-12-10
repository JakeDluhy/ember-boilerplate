import Ember from 'ember';
import { TRANSITION_ROUTES } from '../utils/constants';

const { service } = Ember.inject;

export default Ember.Mixin.create({
  session: service('session'),

  // Again, a slightly customized unauthenticated route mixin that gives a flash message when you are redirected
  beforeModel(transition) {
    if (this.get('session').get('isAuthenticated')) {
      transition.abort();
      Ember.assert('The route configured as Configuration.routeIfAlreadyAuthenticated cannot implement the UnauthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== TRANSITION_ROUTES.UNAUTHENTICATE);
      Ember.get(this, 'flashMessages').warning("This route is only necessary if you're logged out");
      this.transitionTo(TRANSITION_ROUTES.UNAUTHENTICATE);
    } else {
      return this._super(...arguments);
    }
  }
});
