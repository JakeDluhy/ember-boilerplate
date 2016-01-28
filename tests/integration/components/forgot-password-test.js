/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import { beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describeComponent(
  'forgot-password',
  'Integration: ForgotPasswordComponent',
  {
    integration: true
  },
  function() {
    beforeEach(function() {
      this.set('emailVal', '');

      this.render(hbs`
        {{forgot-password emailValue=emailVal}}
      `);
    });

    it('renders', function() {
      expect(this.$()).to.have.length(1);
    });

    it('has a disabled button with empty text', function() {
      expect($('.spec-forgot-submit-button').attr('disabled')).to.equal('disabled');
    });

    it('has a disabled button without a valid email', function() {
      this.set('emailVal', 'foo.bar');
      expect($('.spec-forgot-submit-button').attr('disabled')).to.equal('disabled');
    });

    it('sends an action when clicking submit', function() {
      let spy = sinon.spy();
      let emailInput = 'foo.bar@example.com';
      this.set('emailVal', emailInput);
      this.set('submitForgotPassword', spy);

      this.render(hbs`
        {{forgot-password emailValue=emailVal submitForgotPassword=(action submitForgotPassword)}}
      `);

      $('.spec-forgot-submit-button').click();

      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, { email: emailInput });
    });
  }
);