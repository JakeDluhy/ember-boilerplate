/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import { beforeEach, describe } from 'mocha';
import sinon from 'sinon';

describeModule(
  'route:application',
  'ApplicationRoute',
  {
    // Specify the other units that are required for this test.
    needs: ['service:session']
  },
  function() {
    beforeEach(function() {
      this.route = this.subject();
    });

    it('exists', function() {
      expect(this.route).to.be.ok;
    });

    describe('the submitUserContact action', function() {
      it('persists the user contact data', function() {
        let ajaxSpy = sinon.spy();
        let flashSpy = sinon.spy();
        let transitionSpy = sinon.spy();
        let contactType = 'Reaching Out';
        let nameValue = 'Foo Bar';
        let emailValue = 'foo.bar@example.com';
        let commentValue = 'My comment';

        Ember.get = function() {
          return { success: flashSpy };
        };

        this.route.get('actions').transitionTo = transitionSpy;

        Ember.$.ajax = function(request) {
          expect(request.type).to.equal('POST');
          expect(request.url).to.equal('/api/contact');
          expect(request.data.data.attributes.contactType).to.equal(contactType);
          expect(request.data.data.attributes.name).to.equal(nameValue);
          expect(request.data.data.attributes.fromEmail).to.equal(emailValue);
          expect(request.data.data.attributes.content).to.equal(commentValue);

          return { fail: ajaxSpy };
        };

        this.route.get('actions').submitUserContact({
          contactType: contactType,
          name: nameValue,
          fromEmail: emailValue,
          content: commentValue
        });

        sinon.assert.calledOnce(ajaxSpy);
        sinon.assert.calledOnce(flashSpy);
        sinon.assert.calledWith(flashSpy, "We've recieved your request, we should be getting back to you shortly!");
        sinon.assert.calledOnce(transitionSpy);
        sinon.assert.calledWith(transitionSpy, 'index');
      });
    });

    describe('the submitUserRegister action', function() {
      it('persists the user registration', function() {
        let spy = sinon.spy();
        let firstName = 'Foo';
        let lastName = 'Bar';
        let email = 'foo.bar@example.com';
        let password = 'foobarchoo';
        // this.set('firstNameValue', firstName);
        // this.set('lastNameValue', lastName);
        // this.set('emailValue', email);
        // this.set('passwordValue', password);

        Ember.$.ajax = function(request) {
          expect(request.type).to.equal('POST');
          expect(request.url).to.equal('/api/register');
          expect(request.data.data.attributes.firstName).to.equal(firstName);
          expect(request.data.data.attributes.lastName).to.equal(lastName);
          expect(request.data.data.attributes.email).to.equal(email);
          expect(request.data.data.attributes.password).to.equal(password);

          return {
            done: function() {
              return { fail: spy };
            }
          };
        };

        this.route.get('actions').submitUserRegister({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        });

        sinon.assert.calledOnce(spy);
      });
    });

    describe('on transition', function() {
      it('closes the login modal', function() {
        let spy = sinon.spy();
        this.route.get('actions').controller = {
          set: spy
        };

        this.route.get('actions').didTransition();

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, 'loginModalOpen', false);
      });
    });
  }
);
