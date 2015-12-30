import Ember from 'ember';

export default Ember.Mixin.create({
  /**
   * Form validations.
   * Mixin with any component that has form elements to validate those elements
   */

  /**
   * Validate emails
   * @type {Object}
   * @returns {Booelan} true if the email is valid, false if it is not
   */
  emailValidation: {
    'errorMessage': 'Please provide email in a valid format',
    'isError': (inputValue) => {
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return !emailPattern.test(inputValue);
    }
  },

  /**
   * Validate password
   * @type {Object}
   * @returns {Boolean} true if the password is more than 8 characters,
   *                    flase if it is less
   */
  passwordValidation: {
    'errorMessage': 'Password must be 8 or more characters',
    'isError': (inputValue) => {
      return inputValue.trim().length < 8;
    }
  },
});
