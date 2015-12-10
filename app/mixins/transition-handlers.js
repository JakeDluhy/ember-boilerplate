import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    transition(route) {
      this.transitionTo(route);
    }
  }
});
