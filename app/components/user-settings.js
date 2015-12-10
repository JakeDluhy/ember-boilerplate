import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  currentUser: Ember.inject.service('current-user'),

  classNameBindings: [':set-small-width-and-center'],

  // Default form values
  firstNameValue: Ember.computed.oneWay('currentUser.firstName'),
  lastNameValue: Ember.computed.oneWay('currentUser.lastName'),
  emailValue: Ember.computed.oneWay('currentUser.email'),
  mailingList: Ember.computed.oneWay('currentUser.mailingList'),

  actions: {
    // Use the current user service to update the user profile attributes
    userSettingsSubmit() {
      this.get('currentUser').updateUserAttributes({
        firstName: this.get('firstNameValue'),
        lastName: this.get('lastNameValue'),
        email: this.get('emailValue'),
        mailingList: this.get('mailingList')
      })
      .then(() => {
        Ember.get(this, 'flashMessages').success('Successfully updated!');
      })
      .catch((xhr) => {
        Ember.get(this, 'flashMessages').danger('Uh oh, there was a problem updating');
      });
    }
  }
});
