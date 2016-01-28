import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  /** @type {Array} Bind the class to attributes */
  classNameBindings: [':set-small-width-and-center'],

  /** @type {String} The computed first name value, based off of the current user first name */
  firstNameValue: Ember.computed.oneWay('current-user.firstName'),

  /** @type {String} The computed last name value, based off of the current user first name */
  lastNameValue: Ember.computed.oneWay('current-user.lastName'),

  /** @type {String} The computed email value, based off of the current user first name */
  emailValue: Ember.computed.oneWay('current-user.email'),

  /** @type {Boolean} The computed mailing list value, based off of the current user first name */
  mailingList: Ember.computed.oneWay('current-user.mailingList'),

  /**
   * Disable the submit button for the form
   * @param  {String}    emailValue The value in the email field
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
     * Update the current user with the form element attributes
     * On success or fail, display a flash message
     */
    userSettingsSubmit() {
      if(this.get('disableSubmit')) { return; }
      
      let flashMessages = Ember.get(this, 'flashMessages');
      this.get('current-user').updateUserAttributes({
        firstName: this.get('firstNameValue'),
        lastName: this.get('lastNameValue'),
        email: this.get('emailValue'),
        mailingList: this.get('mailingList')
      })
      .then(() => {
        Ember.run(function() {
          flashMessages.success('Successfully updated!');
        });
      })
      .catch((err) => {
        flashMessages.danger(err.errors.error);
      });
    }
  }
});
