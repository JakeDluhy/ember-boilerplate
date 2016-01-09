import Ember from 'ember';
import TransitionHandlers from '../mixins/transition-handlers';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, TransitionHandlers, {
  actions: {
    /** When transitioning from one route to another, we want to close the login modal */
    didTransition() {
      this.controller.set('loginModalOpen', false);
    }
  }
});
