/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import UnauthenticatedRouteMixinMixin from 'ember-boilerplate/mixins/unauthenticated-route-mixin';

describe('UnauthenticatedRouteMixinMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    var UnauthenticatedRouteMixinObject = Ember.Object.extend(UnauthenticatedRouteMixinMixin);
    var subject = UnauthenticatedRouteMixinObject.create();
    expect(subject).to.be.ok;
  });
});
