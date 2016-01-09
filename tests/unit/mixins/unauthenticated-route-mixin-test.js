/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach
} from 'mocha';
import Ember from 'ember';
import UnauthenticatedRouteMixinMixin from 'ember-boilerplate/mixins/unauthenticated-route-mixin';
import sinon from 'sinon';

describe('UnauthenticatedRouteMixinMixin', function() {
  beforeEach(function() {
    let UnauthenticatedRouteMixinObject = Ember.Object.extend(UnauthenticatedRouteMixinMixin);
    this.subject = UnauthenticatedRouteMixinObject.create();
  });

  it('works', function() {
    expect(this.subject).to.be.ok;
  });

  it('checks for unauthentication before loading the model', function() {
    const transition = {
      route: 'users.login',
      abort: function() {}
    };
    const transitionToRoute = 'index';
    let spy1 = sinon.spy();
    let spy2 = sinon.spy();

    this.subject.set('session', {
      isAuthenticated: true
    });
    this.subject.set('flashMessages', {
      warning: spy1
    });
    this.subject.transitionTo = spy2;

    this.subject.beforeModel(transition);

    sinon.assert.calledOnce(spy1);
    sinon.assert.calledWith(spy1, "This route is only necessary if you're logged out");

    sinon.assert.calledOnce(spy2);
    sinon.assert.calledWith(spy2, transitionToRoute);
  });
});
