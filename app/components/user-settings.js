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

  actions: {
    /**
     * Update the current user with the form element attributes
     * On success or fail, display a flash message
     */
    userSettingsSubmit() {
      this.get('current-user').updateUserAttributes({
        firstName: this.get('firstNameValue'),
        lastName: this.get('lastNameValue'),
        email: this.get('emailValue'),
        mailingList: this.get('mailingList')
      })
      .then(() => {
        Ember.get(this, 'flashMessages').success('Successfully updated!');
      })
      .catch((err) => {
        Ember.get(this, 'flashMessages').danger(err.errors.error);
      });
    }
  }
});
