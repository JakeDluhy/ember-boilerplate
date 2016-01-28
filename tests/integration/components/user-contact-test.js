/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import { beforeEach, describe } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describeComponent(
  'user-contact',
  'Integration: UserContactComponent',
  {
    integration: true
  },
  function() {
    beforeEach(function() {
      this.set('nameValue', '');
      this.set('emailValue', '');
      this.set('commentValue', '');
      this.render(hbs`
        {{user-contact

          nameValue=nameValue
          emailValue=emailValue
          commentValue=commentValue}}
      `);
    });

    it('renders', function() {
      expect(this.$()).to.have.length(1);
    });

    it('has a default contact type value of Reaching Out', function() {
      expect($('.spec-contact-type-select md-select-value').text().trim()).to.equal('Reaching Out');
    });

    it("has a disabled button when the form isn't filled out", function() {
      expect(this.$('.spec-user-contact-submit').attr('disabled')).to.equal('disabled');
      this.set('emailValue', 'foo.bar@example.com');
      expect(this.$('.spec-user-contact-submit').attr('disabled')).to.equal('disabled');
      this.set('emailValue', '');
      this.set('commentValue', 'asldkfjalsdkfja');
      expect(this.$('.spec-user-contact-submit').attr('disabled')).to.equal('disabled');
    });

    it("has a disabled button when the form isn't valid", function() {
      this.set('emailValue', 'foo.bar');
      this.set('commentValue', 'alsdfkja');
      expect(this.$('.spec-user-contact-submit').attr('disabled')).to.equal('disabled');
    });

    describe('submitting the form', function() {
      beforeEach(function() {
        this.nameValue = 'Foo Bar';
        this.emailValue = 'foo.bar@example.com';
        this.commentValue = 'My comment';

        this.set('nameValue', this.nameValue);
        this.set('emailValue', this.emailValue);
        this.set('commentValue', this.commentValue);
      });

      it('sends an action to persist the form data on submit', function() {
        let spy = sinon.spy();

        this.set('submitUserContact', spy);

        this.render(hbs`
          {{user-contact
            submitUserContact=(action submitUserContact)

            nameValue=nameValue
            emailValue=emailValue
            commentValue=commentValue}}
        `);

        this.$('.spec-user-contact-submit').click();

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, {
          contactType: 'Reaching Out',
          name: this.nameValue,
          fromEmail: this.emailValue,
          content: this.commentValue
        });
      });

      it('triggers onContactSubmit if it is bound', function() {
        let spy = sinon.spy();

        this.set('onContactSubmit', spy);
        this.set('submitUserContact', function() {});

        this.render(hbs`
          {{user-contact
            submitUserContact=(action submitUserContact)
            onContactSubmit=(action onContactSubmit)

            nameValue=nameValue
            emailValue=emailValue
            commentValue=commentValue}}
        `);

        this.$('.spec-user-contact-submit').click();

        sinon.assert.calledOnce(spy);
      });
    });

    
  }
);