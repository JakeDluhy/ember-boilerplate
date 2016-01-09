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
  'user-change-password',
  'Integration: UserChangePasswordComponent',
  {
    integration: true
  },
  function() {
    beforeEach(function() {
      this.set('isPasswordReset', false);
      this.set('oldPasswordValue', '');
      this.set('newPasswordValue', '');
      this.set('confirmNewPasswordValue', '');
      this.set('flashMessages', {});
      this.render(hbs`
        {{user-change-password
          passwordReset=isPasswordReset

          oldPasswordValue=oldPasswordValue
          newPasswordValue=newPasswordValue
          confirmNewPasswordValue=confirmNewPasswordValue
          flashMessages=flashMessages}}
      `);
    });

    it('renders', function() {
      expect(this.$()).to.have.length(1);
    });

    it('has a new password and confirm password field', function() {
      expect(this.$('.spec-new-password')).to.have.length(1);
      expect(this.$('.spec-confirm-password')).to.have.length(1);
    });

    it("doesn't submit passwords if the new and confirmed don't match", function() {
      let spy = sinon.spy();
      this.set('isPasswordReset', true);
      this.set('newPasswordValue', 'foobarchoo');
      this.set('confirmNewPasswordValue', 'foobarchoo2');

      this.set('flashMessages', { danger: spy });

      $('.spec-change-password-submit').click();

      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, 'New Passwords must match');
    });

    describe('when used as password update form', function() {
      beforeEach(function() {
        this.set('isPasswordReset', false);
      });

      it('has an old password field', function() {
        expect(this.$('.spec-old-password')).to.have.length(1);
      });

      it("has a disabled submit button if fields aren't filled out", function() {
        expect(this.$('.spec-change-password-submit').attr('disabled')).to.equal('disabled');
        this.set('oldPasswordValue', 'asdflkjasdf');
        expect(this.$('.spec-change-password-submit').attr('disabled')).to.equal('disabled');
        this.set('newPasswordValue', 'asdfasdflkajsdf');
        expect(this.$('.spec-change-password-submit').attr('disabled')).to.equal('disabled');
        this.set('newPasswordValue', '');
        this.set('confirmNewPasswordValue', 'asldkfjalsdkfja');
        expect(this.$('.spec-change-password-submit').attr('disabled')).to.equal('disabled');
      });

      it('calls to the current user service to update the password on submit', function() {
        let spy = sinon.spy();
        let oldPasswordValue = 'foobarchoo';
        let newPasswordValue = 'foobarchoo2';
        this.set('oldPasswordValue', oldPasswordValue);
        this.set('newPasswordValue', newPasswordValue);
        this.set('confirmNewPasswordValue', newPasswordValue);

        // Stub out the current-user service as an object
        let currentUser = {
          updateUserPassword(data) {
            expect(data.oldPassword).to.equal(oldPasswordValue);
            expect(data.newPassword).to.equal(newPasswordValue);

            return {
              then: function() {
                return { catch: spy };
              }
            };
          }
        };
        this.set('currentUser', currentUser);

        this.render(hbs`
          {{user-change-password
            passwordReset=isPasswordReset
            current-user=currentUser

            oldPasswordValue=oldPasswordValue
            newPasswordValue=newPasswordValue
            confirmNewPasswordValue=confirmNewPasswordValue}}
        `);

        this.$('.spec-change-password-submit').click();

        sinon.assert.calledOnce(spy);
      });
    });

    describe('when used as password reset form', function() {
      beforeEach(function() {
        this.set('isPasswordReset', true);
      });

      it("has a disabled submit button if fields aren't filled out", function() {
        expect(this.$('.spec-change-password-submit').attr('disabled')).to.equal('disabled');
        this.set('newPasswordValue', 'asdfasdflkajsdf');
        expect(this.$('.spec-change-password-submit').attr('disabled')).to.equal('disabled');
        this.set('newPasswordValue', '');
        this.set('confirmNewPasswordValue', 'asldkfjalsdkfja');
        expect(this.$('.spec-change-password-submit').attr('disabled')).to.equal('disabled');
      });

      it('sends an action to the route to persist the password reset data', function() {
        let spy = sinon.spy();
        let newPasswordValue = 'foobarchoo2';
        this.set('newPasswordValue', newPasswordValue);
        this.set('confirmNewPasswordValue', newPasswordValue);
        this.set('resetPassword', spy);

        this.render(hbs`
          {{user-change-password
            passwordReset=isPasswordReset
            sendResetPassword=(action resetPassword)

            newPasswordValue=newPasswordValue
            confirmNewPasswordValue=confirmNewPasswordValue}}
        `);

        this.$('.spec-change-password-submit').click();

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, newPasswordValue);
      });
    });
  }
);
