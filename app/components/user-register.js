import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  /** @type {String} The tag element */
  tagName: 'div',

  /** @type {Array} Bind the class to attributes */
  classNameBindings: [':user-auth-wrapper', ':set-width-and-center'],

  /** @type {String} The value of the first name form input */
  firstNameValue: '',

  /** @type {String} The value of the last name form input */
  lastNameValue: '',

  /** @type {String} The value of the email form input */
  emailValue: '',

  /** @type {String} The value of the password form input */
  passwordValue: '',

  /**
   * Should we sign the user up for the mailing list?
   * @type {Boolean}
   * @default false
   */
  mailingList: false,

  /**
   * The component can be rendered in two places, within the modal or in a route
   * By default, it will transition to the login route when clicking the login link
   * Otherwise, it will switch the modal view
   * @default true
   * @type {Boolean}
   */
  transitionToRoute: true,

  /**
   * Disable the submit button for the form
   * @param  {String}    emailValue The value in the email field
   * @param  {String}    passwordValue The value in the password field
   * @return {Boolean}   Should the submit button be disabled?
   */
  disableSubmit: Ember.computed('emailValue', 'passwordValue', function() {
    let emailValue = this.get('emailValue');
    let passwordValue = this.get('passwordValue');

    // Check 1) Is the email valid?
    //       2) Is the password valid?
    if(emailValue && emailValue !== '' && !this.get('emailValidation').isError(emailValue) &&
       passwordValue && passwordValue !== '' && !this.get('passwordValidation').isError(passwordValue)) {
      return false;
    }
    return true;
  }),

  actions: {
    /** Call to submit the registration request with the form data */
    registerSubmit() {
      if(this.get('disableSubmit')) { return; }
      
      this.sendAction('submitUserRegister', {
        firstName: this.get('firstNameValue'),
        lastName: this.get('lastNameValue'),
        email: this.get('emailValue'),
        password: this.get('passwordValue'),
        mailingList: this.get('mailingList')
      });
    },

    /** Clicking on the switch link will transition the view to login (if modal) */
    transitionToLogin() {
      this.sendAction('transitionToLogin', 'login');
    }
  }
});
