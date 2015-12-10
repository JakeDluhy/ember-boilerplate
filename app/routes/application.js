import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    // When transitioning from one route to another, we want to close the login modal
    didTransition() {
      this.controller.set('loginModalOpen', false);
    }
  }
});
