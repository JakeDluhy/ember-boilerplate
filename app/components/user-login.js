import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  session: Ember.inject.service('session'),

  tagName: 'div',
  classNameBindings: [':user-auth-wrapper', ':set-width-and-center'],

  // Default form values
  emailValue: '',
  passwordValue: '',
  rememberMe: true,

  // Component options:
  // If true, link to register route instead of switching modal views
  transitionToRoute: true,

  actions: {
    // Log in using the ember-simple-auth interface
    loginSubmit() {
      var self = this;

      this.get('session').authenticate('authenticator:basic', {
        email: this.get('emailValue'),
        password: this.get('passwordValue'),
        rememberMe: this.get('rememberMe')
      })
      .then((data) => {
        Ember.get(this, 'flashMessages').success('Welcome back!');
        self.sendAction('onSubmitSuccess');
      })
      .catch((err) => {
        Ember.get(this, 'flashMessages').danger(`Unable to login: ${err.error}`);
      });
    },

    // Clicking on the switch link will transition the view to registration (if modal)
    transitionToReg() {
      this.sendAction('transitionToReg', 'register');
    }
  },
});
