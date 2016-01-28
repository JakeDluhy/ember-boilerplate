/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describeComponent(
  'user-register',
  'Integration: UserRegisterComponent',
  {
    integration: true
  },
  function() {
    beforeEach(function() {
      this.set('firstNameValue', '');
      this.set('lastNameValue', '');
      this.set('emailValue', '');
      this.set('passwordValue', '');
      this.set('transitionToRoute', true);
      this.render(hbs`
        {{user-register

          firstNameValue=firstNameValue
          lastNameValue=lastNameValue
          emailValue=emailValue
          passwordValue=passwordValue
          transitionToRoute=transitionToRoute}}
      `);
    });

    it('renders', function() {
      expect(this.$()).to.have.length(1);
    });

    it("has a disabled submit button when info isn't filled out", function() {
      expect(this.$('.spec-user-register-submit').attr('disabled')).to.equal('disabled');
      this.set('emailValue', 'foo.bar@example.com');
      expect(this.$('.spec-user-register-submit').attr('disabled')).to.equal('disabled');
      this.set('emailValue', '');
      this.set('passwordValue', 'foobarchoo');
      expect(this.$('.spec-user-register-submit').attr('disabled')).to.equal('disabled');
    });

    it("has a disabled submit button when info isn't valid", function() {
      this.set('emailValue', 'foo.bar');
      this.set('passwordValue', 'foobarchoo');
      expect(this.$('.spec-user-register-submit').attr('disabled')).to.equal('disabled');
    });

    it('has a default mailing list value of false', function() {
      expect(this.$('.spec-mailing-list-checkbox').hasClass('md-checked')).to.be.false;
    });

    it('sends an action to submit the registration form', function() {
      let spy = sinon.spy();
      let firstName = 'Foo';
      let lastName = 'Bar';
      let email = 'foo.bar@example.com';
      let password = 'foobarchoo';
      this.set('firstNameValue', firstName);
      this.set('lastNameValue', lastName);
      this.set('emailValue', email);
      this.set('passwordValue', password);
      this.set('submitUserRegister', spy);

      this.render(hbs`
        {{user-register
          submitUserRegister=(action submitUserRegister)

          firstNameValue=firstNameValue
          lastNameValue=lastNameValue
          emailValue=emailValue
          passwordValue=passwordValue
          transitionToRoute=transitionToRoute}}
      `);

      this.$('.spec-user-register-submit').click();

      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        mailingList: false
      });
    });

    describe('with transitionToRoute as true', function() {
      beforeEach(function() {
        this.set('transitionToRoute', true);
      });

      it('links to the login route', function() {
        expect(this.$('.spec-users-login')).to.have.length(1);
      });
    });

    describe('with transitionToRoute as false', function() {
      beforeEach(function() {
        this.set('transitionToRoute', false);
      });

      it('sends an actions to switch the modal view to login', function() {
        let spy = sinon.spy();
        this.set('transitionToLogin', spy);

        this.render(hbs`
          {{user-register
            transitionToLogin=(action transitionToLogin)

            transitionToRoute=transitionToRoute}}
        `);

        this.$('.spec-transition-to-login').click();

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, 'login');
      });
    });
  }
);
