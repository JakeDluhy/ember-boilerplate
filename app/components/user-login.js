/**
 * 
 */

import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  /** @type {object} Inject the session service */
  session: Ember.inject.service('session'),

  /** @type {String} The name of the component tag */
  tagName: 'div',

  /** @type {Array} Bind the class to attributes */
  classNameBindings: [':user-auth-wrapper', ':set-width-and-center'],

  /** @type {String} The value of the email field */
  emailValue: '',

  /** @type {String} The value of the password field */
  passwordValue: '',

  /** @type {Boolean} Should we remember the session? Difference between local storage and session storage */
  rememberMe: true,

  /**
   * The component can be rendered in two places, within the modal or in a route
   * By default, it will transition to the register route when clicking the register link
   * Otherwise, it will switch the modal view
   * @default true
   * @type {Boolean}
   */
  transitionToRoute: true,

  actions: {
    /**
     * Log In using ember-simple-auth, with the form data
     * On success, display a success message and send the action for submit success
     * On failure, disaply an error message
     */
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
        Ember.get(this, 'flashMessages').danger(`Unable to login: ${err.errors.error}`);
      });
    },

    /** Clicking on the switch link will transition the view to registration (if modal) */
    transitionToReg() {
      this.sendAction('transitionToReg', 'register');
    }
  },
});
