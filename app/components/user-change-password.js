import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  currentUser: Ember.inject.service('current-user'),

  classNameBindings: [':set-small-width-and-center'],

  // Default form values
  passwordReset: false,
  resetCodeValue: '',
  oldPasswordValue: '',
  newPasswordValue: '',
  confirmNewPasswordValue: '',

  // Does the new password meeting the confirmation?
  passwordsAreEqual() {
    return (this.get('newPasswordValue') === this.get('confirmNewPasswordValue'));
  },

  // Use the current user service to update the user password, sending the old and new passwords through
  updateUserPassword() {
    var self = this;

    return self.get('currentUser').updateUserPassword({
      oldPassword: self.get('oldPasswordValue'),
      newPassword: self.get('newPasswordValue')
    })
    .then(() => {
      Ember.get(this, 'flashMessages').success('Password successfully updated');
      self.sendAction('transition', 'index');
    });
  },

  // Reset the users password, sending the reset code and new password
  resetPassword() {
    var self = this;

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'PUT',
        url: '/api/users/reset_password',
        data: {
          user: {
            newPassword: self.get('newPasswordValue'),
            resetCode: self.get('resetCodeValue')
          }
        }
      })
      .done(resolve)
      .fail((xhr) => {
        reject(JSON.parse(xhr.responseText));
      });
    })
    .then(() => {
      Ember.get(this, 'flashMessages').success('Password successfully reset. Log in and try it out!');
      self.sendAction('transition', 'index');
    });
  },

  actions: {
    // On submitting the change password request, check whether passwords are equal
    // If they are, is the component being used to reset the password or update, which require different requests
    changePasswordSubmit() {
      if(this.passwordsAreEqual()) {
        Ember.run(this, (this.get('passwordReset') ? this.resetPassword : this.updateUserPassword))
        .catch((err) => {
          Ember.get(this, 'flashMessages').danger(err.error);
        });
      } else {
        Ember.get(this, 'flashMessages').danger('New Passwords must match');
      }
    }
  }
});
