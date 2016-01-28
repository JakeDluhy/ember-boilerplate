import Ember from 'ember';
import TransitionHandlers from '../mixins/transition-handlers';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import GoogleAnalytics from '../utils/google-analytics';

export default Ember.Route.extend(ApplicationRouteMixin, TransitionHandlers, {
  actions: {
    /** When transitioning from one route to another, we want to close the login modal */
    didTransition() {
      GoogleAnalytics.setAndTrackPageview();
      this.controller.set('loginModalOpen', false);
    },

    /**
     * Persist the data from the contact us form. Send a flash message immediately, and transition to the index
     * @param  {Object} attributeData The attribute data for the request
     */
    submitUserContact(attributeData) {
      let self = this;
      let flashMessages = Ember.get(this, 'flashMessages');
    
      Ember.$.ajax({
        type: 'POST',
        url: '/api/contact',
        data: {
          data: {
            type: 'contact',
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
      });

      flashMessages.success("We've recieved your request, we should be getting back to you shortly!");
      this.transitionTo('index');
    },

    /**
     * Submit the form data to the server to register the user
     * @param  {Object} attributeData The registration attribute data to persist
     * On success - Display the success message, and transition to the index
     * On error - Display the error message
     */
    submitUserRegister(attributeData) {
      let self = this;
      let flashMessages = Ember.get(this, 'flashMessages');

      Ember.$.ajax({
        type: 'POST',
        url: '/api/register',
        data: {
          data: {
            type: 'user',
            id: null,
            attributes: attributeData
          }
        }
      })
      .done((data) => {
        Ember.run(function() {
          flashMessages.success(data.meta.success, {
            sticky: true
          });
        });
        self.controllerFor('application').set('loginModalOpen', false);
        self.transitionTo('index');
      })
      .fail((xhr) => {
        var err = JSON.parse(xhr.responseText);
        Ember.run(function() {
          flashMessages.danger(err.errors.error);
        });
      });
    }
  }
});
