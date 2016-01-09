/**
 * This component has two uses
 * 1. To act as a update password form for logged in users
 * 2. To act as a set my password after reseting it form for non-logged in users
 * The component defaults to acting as an udpate password form
 */

import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  /** @type {Array} Bind the class to attributes */
  classNameBindings: [':set-small-width-and-center'],

  /**
   * Is this form being used as a password reset form or a password update form
   * @type {Boolean}
   * @default  false
   */
  passwordReset: false,

  /** @type {String} The old password confirmation value */
  oldPasswordValue: '',

  /** @type {String} The new password to change to */
  newPasswordValue: '',

  /** @type {String} The new password confirmation */
  confirmNewPasswordValue: '',

  /**
   * Disable the submit button for the form
   * @param  {String}    oldPasswordValue The value in the old password field
   * @param  {String}    newPasswordValue The value in the new password field
   * @param  {String}    confirmNewPasswordValue The value in the confirmation field
   * @return {Boolean}   Should the submit button be disabled?
   */
  disableSubmit: Ember.computed('oldPasswordValue', 'newPasswordValue', 'confirmNewPasswordValue', function() {
    let oldPasswordValue = this.get('oldPasswordValue');
    let newPasswordValue = this.get('newPasswordValue');
    let confirmNewPasswordValue = this.get('confirmNewPasswordValue');

    // Check 1) Is the old password valid, or is it the password reset form?
    //       2) Is the new password valid?
    //       3) Is the password confirmation valid?
    if(((oldPasswordValue && oldPasswordValue !== '' && !this.get('passwordValidation').isError(oldPasswordValue)) || this.get('passwordReset')) &&
       newPasswordValue && newPasswordValue !== '' && !this.get('passwordValidation').isError(newPasswordValue) &&
       confirmNewPasswordValue && confirmNewPasswordValue !== '' && !this.get('passwordValidation').isError(confirmNewPasswordValue)) {
      return false;
    }
    return true;
  }),

  /**
   * Check whether the password and password confirmation values are equal
   * @return {Boolean} Are the two new passwords the same?
   */
  passwordsAreEqual() {
    return (this.get('newPasswordValue') === this.get('confirmNewPasswordValue'));
  },

  /** Update the current user using the current-user service, sending the new and old passwords */
  updateUserPassword() {
    var self = this;

    return self.get('current-user').updateUserPassword({
      oldPassword: self.get('oldPasswordValue'),
      newPassword: self.get('newPasswordValue')
    })
    .then(() => {
      Ember.get(this, 'flashMessages').success('Password successfully updated');
      self.sendAction('transition', 'index');
    })
    .catch((err) => {
      Ember.get(this, 'flashMessages').danger(err.errors.error);
    });
  },

  actions: {
    /**
     * On submitting the change password request, check whether passwords are equal
     * If they are, is the component being used to reset the password or update?
     * If updating, call the updateUserPassword method
     * If reseting, send the sendResetPassword action
     */
    changePasswordSubmit() {
      if(this.passwordsAreEqual()) {
        if(this.get('passwordReset')) {
          this.sendAction('sendResetPassword', this.get('newPasswordValue'));
        } else {
          this.updateUserPassword();
        }
      } else {
        Ember.get(this, 'flashMessages').danger('New Passwords must match');
      }
    }
  }
});
