/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import AuthenticatedRouteMixinMixin from 'ember-boilerplate/mixins/authenticated-route-mixin';

describe('AuthenticatedRouteMixinMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    var AuthenticatedRouteMixinObject = Ember.Object.extend(AuthenticatedRouteMixinMixin);
    var subject = AuthenticatedRouteMixinObject.create();
    expect(subject).to.be.ok;
  });
});
