/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach
} from 'mocha';
import Ember from 'ember';
import AuthenticatedRouteMixinMixin from 'ember-boilerplate/mixins/authenticated-route-mixin';
import sinon from 'sinon';

describe('AuthenticatedRouteMixinMixin', function() {
  beforeEach(function() {
    let AuthenticatedRouteMixinObject = Ember.Object.extend(AuthenticatedRouteMixinMixin);
    this.subject = AuthenticatedRouteMixinObject.create();
  });

  it('works', function() {
    expect(this.subject).to.be.ok;
  });

  it('checks for authentication before loading the model', function() {
    const transition = {
      route: 'users.settings',
      abort: function() {}
    };
    let spy1 = sinon.spy();
    let spy2 = sinon.spy();
    let spy3 = sinon.spy();

    this.subject.set('session', {
      isAuthenticated: false,
      set: spy1
    });

    this.subject.set('flashMessages', {
      danger: spy2
    });

    this.subject.transitionTo = spy3;

    this.subject.beforeModel(transition);

    sinon.assert.calledOnce(spy1);
    sinon.assert.calledWith(spy1, 'attemptedTransition', transition);

    sinon.assert.calledOnce(spy2);
    sinon.assert.calledWith(spy2, "This route is restricted. Log in and we'll get right back to it!");

    sinon.assert.calledOnce(spy3);
    sinon.assert.calledWith(spy3, "users.login");
  });
});
