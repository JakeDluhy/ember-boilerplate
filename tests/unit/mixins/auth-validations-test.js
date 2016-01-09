/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach
} from 'mocha';
import Ember from 'ember';
import AuthValidationsMixin from 'ember-boilerplate/mixins/auth-validations';

describe('AuthValidationsMixin', function() {
  beforeEach(function() {
    let AuthValidationsObject = Ember.Object.extend(AuthValidationsMixin);
    this.subject = AuthValidationsObject.create();
  });

  it('works', function() {
    expect(this.subject).to.be.ok;
  });

  describe('validating email addresses', function() {
    it('has the correct error message', function() {
      let errorMessage = this.subject.get('emailValidation').errorMessage;
      expect(errorMessage).to.equal('Please provide email in a valid format');
    });

    it('correctly validates the email address pattern', function() {
      let badEmail1 = 'foobar@gmail';
      let badEmail2 = 'gmail.com';
      let badEmail3 = 'foobar@gmail.comsf';
      let badEmail4 = 'foobargmail.com';
      let goodEmail = 'foobar@example.com';

      let checkError = this.subject.get('emailValidation').isError;

      expect(checkError(badEmail1)).to.be.true;
      expect(checkError(badEmail2)).to.be.true;
      expect(checkError(badEmail3)).to.be.true;
      expect(checkError(badEmail4)).to.be.true;

      expect(checkError(goodEmail)).to.be.false;
    });
  });

  describe('validating passwords', function() {
    it('has the correct error message', function() {
      let errorMessage = this.subject.get('passwordValidation').errorMessage;
      expect(errorMessage).to.equal('Password must be 8 or more characters');
    });

    it('correctly validates the password length', function() {
      let badPassword = 'asdlf';
      let goodPassword = 'alskdfjlaskdjf';

      let checkError = this.subject.get('passwordValidation').isError;

      expect(checkError(badPassword)).to.be.true;
      expect(checkError(goodPassword)).to.be.false;
    });
  });
});
