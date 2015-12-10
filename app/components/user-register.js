import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  tagName: 'div',
  classNameBindings: [':user-auth-wrapper', ':set-width-and-center'],

  // Default form values
  firstNameValue: '',
  lastNameValue: '',
  emailValue: '',
  passwordValue: '',
  mailingList: false,

  // Component options:
  // If true, simply link to the login route instead of switching the modal view
  transitionToRoute: true,

  actions: {
    registerSubmit() {
      var self = this;

      var userData = {
        firstName: this.get('firstNameValue'),
        lastName: this.get('lastNameValue'),
        email: this.get('emailValue'),
        password: this.get('passwordValue'),
        mailingList: this.get('mailingList')
      };

      Ember.$.ajax({
        type: 'POST',
        url: '/api/register',
        data: {
          user: userData
        }
      })
      .done((data) => {
        Ember.get(self, 'flashMessages').success(data.success, {
          sticky: true
        });  
        self.sendAction('onSubmitSuccess', 'index');
      })
      .fail((xhr) => {
        var err = JSON.parse(xhr.responseText);
        Ember.get(self, 'flashMessages').danger(err.error);
      });
    },

    transitionToLogin() {
      this.sendAction('transitionToLogin', 'login');
    }
  }
});
