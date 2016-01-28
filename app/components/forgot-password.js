import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  /** @type {Array} Bind the classes */
  classNameBindings: [':set-width-and-center'],

  /** @type {String} The value of the email entry */
  emailValue: '',

  /**
   * Disable the submit button for the form
   * @param  {String} )  emailValue The value in the email field
   * @return {Boolean}   Should the submit button be disabled?
   */
  disableSubmit: Ember.computed('emailValue', function() {
    let emailValue = this.get('emailValue');
    if(emailValue && emailValue !== '' && !this.get('emailValidation').isError(emailValue)) {
      return false;
    }
    return true;
  }),

  actions: {
    /**
     * Submit the form through an ajax request
     * Will send a flash on success or error
     * @redirects to the index after a successful request
     */
    forgotSubmit() {
      if(this.get('disableSubmit')) { return; }
      
      this.sendAction('submitForgotPassword', {
        email: this.get('emailValue')
      });
    }
  }
});