import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  /** @type {Array} Bind the class to attributes */
  classNameBindings: [':set-width-and-center'],

  /** @type {Array} The different contact types that can be sent */
  contactTypes: ['Reaching Out', 'Bug Feedback', 'Feature Request'],

  /**
   * The selected contact type
   * @type {String}
   * @default 'Reaching Out'
   */
  selectedContactType: 'Reaching Out',

  /** @type {String} The name of the person submitting the form */
  nameValue: '',

  /** @type {String} The email from the contactor */
  emailValue: '',

  /** @type {String} The text of the request */
  commentValue: '',

  /**
   * Disable the submit button for the form
   * @param  {String}    oldPasswordValue The value in the old password field
   * @param  {String}    newPasswordValue The value in the new password field
   * @param  {String}    confirmNewPasswordValue The value in the confirmation field
   * @return {Boolean}   Should the submit button be disabled?
   */
  disableSubmit: Ember.computed('emailValue', 'commentValue', function() {
    let emailValue = this.get('emailValue');
    let commentValue = this.get('commentValue');

    // Check 1) Is the email valid?
    //       2) Is the comment valid?
    if(emailValue && emailValue !== '' && !this.get('emailValidation').isError(emailValue) &&
       commentValue && commentValue !== '') {
      return false;
    }
    return true;
  }),

  actions: {
    /**
     * Send the attribute data to the route
     * If a listener action is bound, send that
     */
    formSubmit() {
      if(this.get('disableSubmit')) { return; }
      
      this.sendAction('submitUserContact', {
        contactType: this.get('selectedContactType'),
        name: this.get('nameValue'),
        fromEmail: this.get('emailValue'),
        content: this.get('commentValue')
      });

      if(this.attrs.onContactSubmit) {
        this.attrs.onContactSubmit();
      }
    }
  }
});
