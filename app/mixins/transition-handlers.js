import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    /**
     * Transition to a route
     * @param  {String} route - the route to transition to
     */
    transition(route) {
      this.transitionTo(route);
    }
  }
});
