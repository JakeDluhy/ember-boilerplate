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
  'user-settings',
  'Integration: UserSettingsComponent',
  {
    integration: true
  },
  function() {
    beforeEach(function() {
      this.set('currentUser', {});
      this.render(hbs`
        {{user-settings
          current-user=currentUser}}
      `);
    });

    it('renders', function() {
      expect(this.$()).to.have.length(1);
    });

    

    it("has a disabled submit button when info isn't filled out", function() {
      expect(this.$('.spec-user-settings-submit').attr('disabled')).to.equal('disabled');
      this.set('currentUser', { email: 'foo.bar@example.com' });
      expect(this.$('.spec-user-settings-submit').attr('disabled')).to.equal(undefined);
    });

    it("has a disabled submit button when info isn't valid", function() {
      expect(this.$('.spec-user-settings-submit').attr('disabled')).to.equal('disabled');
      this.set('currentUser', { email: 'foo.bar' });
      expect(this.$('.spec-user-settings-submit').attr('disabled')).to.equal('disabled');
    });

    describe('with data', function() {
      beforeEach(function() {
        this.firstName = 'Foo';
        this.lastName = 'Bar';
        this.email = 'foo.bar@example.com';
        this.mailingList = true;
        this.set('currentUser', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          mailingList: this.mailingList
        });
      });

      it('fills in form data with the current user attributes', function() {
        expect(this.$('.spec-first-name input').val()).to.equal(this.firstName);
        expect(this.$('.spec-last-name input').val()).to.equal(this.lastName);
        expect(this.$('.spec-email input').val()).to.equal(this.email);
        expect(this.$('.spec-mailing-list').hasClass('md-checked')).to.be.true;
      });

      it('updates the user settings through the current user service', function() {
        let spy = sinon.spy();

        this.set('currentUser', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          mailingList: this.mailingList,
          updateUserAttributes(data) {
            expect(data.firstName).to.equal(this.firstName);
            expect(data.lastName).to.equal(this.lastName);
            expect(data.email).to.equal(this.email);
            expect(data.mailingList).to.equal(this.mailingList);

            return {
              then: function() {
                return { catch: spy };
              }
            };
          }
        });

        this.$('.spec-user-settings-submit').click();

        sinon.assert.calledOnce(spy);
      });
    });
  }
);
