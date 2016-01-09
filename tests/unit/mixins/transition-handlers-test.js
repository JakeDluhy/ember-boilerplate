/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach
} from 'mocha';
import Ember from 'ember';
import TransitionHandlersMixin from 'ember-boilerplate/mixins/transition-handlers';
import sinon from 'sinon';

describe('TransitionHandlersMixin', function() {
  beforeEach(function() {
    let TransitionHandlersObject = Ember.Object.extend(TransitionHandlersMixin);
    this.subject = TransitionHandlersObject.create();
  });

  it('works', function() {
    expect(this.subject).to.be.ok;
  });

  it('calls transitionTo with the transition action', function() {
    let route = 'index';
    let spy = sinon.spy();
    this.subject.get('actions').transitionTo = spy;

    this.subject.get('actions').transition(route);

    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, route);
  });
});
