/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describeComponent(
  'user-login',
  'Integration: UserLoginComponent',
  {
    integration: true
  },
  function() {
    beforeEach(function() {
      this.set('emailValue', '');
      this.set('passwordValue', '');
      this.set('transitionToRoute', true);
      this.render(hbs`
        {{user-login

          emailValue=emailValue
          passwordValue=passwordValue
          transitionToRoute=transitionToRoute}}
      `);
    });

    it('renders', function() {
      expect(this.$()).to.have.length(1);
    });

    it("has a disabled submit button when info isn't filled out", function() {
      expect(this.$('.spec-user-login-submit').attr('disabled')).to.equal('disabled');
      this.set('emailValue', 'foo.bar@example.com');
      expect(this.$('.spec-user-login-submit').attr('disabled')).to.equal('disabled');
      this.set('emailValue', '');
      this.set('passwordValue', 'foobarchoo');
      expect(this.$('.spec-user-login-submit').attr('disabled')).to.equal('disabled');
    });

    it("has a disabled submit button when info isn't valid", function() {
      this.set('emailValue', 'foo.bar');
      this.set('passwordValue', 'foobarchoo');
      expect(this.$('.spec-user-login-submit').attr('disabled')).to.equal('disabled');
    });

    it('has a default rememberMe value of true', function() {
      expect(this.$('.spec-remember-me-checkbox').hasClass('md-checked')).to.be.true;
    });

    describe('with transitionToRoute as true', function() {
      beforeEach(function() {
        this.set('transitionToRoute', true);
      });

      it('links to the register route', function() {
        expect(this.$('.spec-users-register')).to.have.length(1);
      });
    });

    describe('with transitionToRoute as false', function() {
      beforeEach(function() {
        this.set('transitionToRoute', false);
      });

      it('sends an actions to switch the modal view to register', function() {
        let spy = sinon.spy();
        this.set('transitionToReg', spy);

        this.render(hbs`
          {{user-login
            transitionToReg=(action transitionToReg)

            emailValue=emailValue
            passwordValue=passwordValue
            transitionToRoute=transitionToRoute}}
        `);

        this.$('.spec-transition-to-reg').click();

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, 'register');
      });
    });
  }
);
