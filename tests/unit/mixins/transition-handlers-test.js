/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import TransitionHandlersMixin from 'ember-boilerplate/mixins/transition-handlers';

describe('TransitionHandlersMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    var TransitionHandlersObject = Ember.Object.extend(TransitionHandlersMixin);
    var subject = TransitionHandlersObject.create();
    expect(subject).to.be.ok;
  });
});
