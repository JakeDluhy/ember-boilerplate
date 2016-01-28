import Ember from 'ember';
import UnauthenticatedRouteMixin from '../../mixins/unauthenticated-route-mixin';
import TransitionHandlers from '../../mixins/transition-handlers';

export default Ember.Route.extend(UnauthenticatedRouteMixin, TransitionHandlers, {
  actions: {
    /**
     * Persist the forgot password recovery request to the server
     * @param  {Object} attributeData The attribute data to send with the request
     */
    submitForgotPassword(attributeData) {
      let self = this;
      let flashMessages = Ember.get(this, 'flashMessages');
      
      Ember.$.ajax({
        type: 'POST',
        url: '/api/recover_password',
        data: {
          data: {
            type: 'user',
            id: null,
            attributes: attributeData
          }
        }
      })
      .fail((xhr) => {
        var response = JSON.parse(xhr.responseText);
        Ember.run(function() {
          flashMessages.danger(response.errors.error);
        });
        self.transitionTo('users.forgot');
      });

      this.transitionTo('index');
      flashMessages.success('The request was successfully scheduled. An email should arrive soon');
    }
  }
});
