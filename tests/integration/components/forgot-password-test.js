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

    it('submits the ajax when clicking submit', function() {
      let spy = sinon.spy();
      let emailInput = 'foo.bar@example.com';
      this.set('emailVal', emailInput);
      Ember.$.ajax = function(request) {
        expect(request.type).to.equal('POST');
        expect(request.url).to.equal('/api/recover_password');
        expect(request.data.data.attributes.email).to.equal(emailInput);

        return {
          done: function() {
            return { fail: spy };
          }
        };
      };

      $('.spec-forgot-submit-button').click();

      sinon.assert.calledOnce(spy);
    });
  }
);
