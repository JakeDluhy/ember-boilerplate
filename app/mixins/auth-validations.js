import Ember from 'ember';

export default Ember.Mixin.create({
  // Form validations used on ember-paper forms

  // Test whether the email is valid email format
  emailValidation: {
    'errorMessage': 'Please provide email in a valid format',
    'isError': (inputValue) => {
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return !emailPattern.test(inputValue);
    }
  },

  // Test whether the password length is 8 or more characters
  passwordValidation: {
    'errorMessage': 'Password must be 8 or more characters',
    'isError': (inputValue) => {
      return inputValue.trim().length < 8;
    }
  },
});
