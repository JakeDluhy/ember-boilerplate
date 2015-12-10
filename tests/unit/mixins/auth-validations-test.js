/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import AuthValidationsMixin from 'ember-boilerplate/mixins/auth-validations';

describe('AuthValidationsMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    var AuthValidationsObject = Ember.Object.extend(AuthValidationsMixin);
    var subject = AuthValidationsObject.create();
    expect(subject).to.be.ok;
  });
});
