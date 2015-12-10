import Ember from 'ember';
import TransitionHandlers from '../../mixins/transition-handlers';

export default Ember.Route.extend(TransitionHandlers, {
  model(params) {
    // Set resetCode to the url param
    this.set('resetCode', params.resetCode)
  },

  setupController(controller, model) {
    // Assign resetCode in the controller to the url param - so it can be accessed by component
    controller.set('resetCode', this.get('resetCode'));
  }
});
