import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  /** @type {Array} Bind the classes */
  classNameBindings: [':set-width-and-center'],

  /** @type {String} The value of the email entry */
  emailValue: '',

  actions: {
    /**
     * Submit the form through an ajax request
     * Will send a flash on success or error
     * @redirects to the index after a successful request
     */
    forgotSubmit() {
      var self = this;

      Ember.$.ajax({
        type: 'POST',
        url: '/api/recover_password',
        data: {
          data: {
            type: 'user',
            id: null,
            attributes: {
              email: self.get('emailValue')
            }
          }
        }
      })
      .done((data) => {
        Ember.get(self, 'flashMessages').success(data.meta.success);
        this.sendAction('onSubmitSuccess', 'index');
      })
      .fail((xhr) => {
        var response = JSON.parse(xhr.responseText);
        Ember.get(self, 'flashMessages').danger(response.errors.error);
      });
    }
  }
});
