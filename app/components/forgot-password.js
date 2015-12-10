import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  classNameBindings: [':set-width-and-center'],

  // Default values
  emailValue: '',

  actions: {
    // Submit the forgot password request
    forgotSubmit() {
      var self = this;

      Ember.$.ajax({
        type: 'POST',
        url: '/api/recover_password',
        data: {
          email: self.get('emailValue')
        }
      })
      .done((data) => {
        Ember.get(self, 'flashMessages').success(data.success);
        this.sendAction('onSubmitSuccess', 'index');
      })
      .fail((xhr) => {
        var response = JSON.parse(xhr.responseText);
        Ember.get(self, 'flashMessages').danger(response.error);
      });
    }
  }
});
