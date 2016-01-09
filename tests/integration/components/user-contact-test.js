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

    it('submits the ajax request with form data on submit', function() {
      let spy = sinon.spy();
      let nameValue = 'Foo Bar';
      let emailValue = 'foo.bar@example.com';
      let commentValue = 'My comment';

      this.set('nameValue', nameValue);
      this.set('emailValue', emailValue);
      this.set('commentValue', commentValue);

      Ember.$.ajax = function(request) {
        expect(request.type).to.equal('POST');
        expect(request.url).to.equal('/api/contact');
        expect(request.data.data.attributes.contactType).to.equal('Reaching Out');
        expect(request.data.data.attributes.name).to.equal(nameValue);
        expect(request.data.data.attributes.fromEmail).to.equal(emailValue);
        expect(request.data.data.attributes.content).to.equal(commentValue);

        return {
          done: function() {
            return { fail: spy };
          }
        };
      };

      this.$('.spec-user-contact-submit').click();

      sinon.assert.calledOnce(spy);
    });
  }
);
