/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import sinon from 'sinon';

/** @type {String} The fake jwt key value */
const jwtKeyValue = 'fakeJwtKey';
const userId = 1;

/** Stub out the request to localstorage for init */
function stubbedLocalStorageRequest() {
  return jwtKeyValue;
}

describeModule(
  'service:current-user',
  'CurrentUserService',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function() {
    beforeEach(function() {
      // Stub out local storage's get item
      localStorage.getItem = stubbedLocalStorageRequest;
    });

    it('fetches data on init', function() {
      let spy = sinon.spy();

      // Stub out the ajax request
      Ember.$.ajax = function(request) {
        expect(request.url).to.equal('/api/users/current_user');

        return {
          done: function(data) {
            return { fail: spy };
          }
        };
      };

      let service = this.subject();
      expect(service).to.be.ok;

      sinon.assert.calledOnce(spy);
    });

    it('sets up ajax headers', function() {
      Ember.$.ajaxSetup = function(data) {
        expect(data.headers.AUTHORIZATION).to.equal(`Bearer ${jwtKeyValue}`);
      };

      this.subject().setupAjaxHeaders(jwtKeyValue);
    });

    describe('after init', function() {
      beforeEach(function() {
        let self = this;
        this.spy = sinon.spy();

        Ember.$.ajax = function() {
          return {
            done: function() {
              return { fail: self.spy };
            }
          };
        };

        this.service = this.subject();

        this.service.setProperties({
          id: userId,
          firstName: 'Foo',
          lastName: 'Bar',
          email: 'foo.bar@example.com'
        });
      });

      describe('getting the jwtKey', function() {
        it('works from localStorage', function() {
          localStorage.getItem = function(key) {
            expect(key).to.equal('jwtKey');

            return jwtKeyValue;
          };

          let keyResponse = this.service.getJwtKey();
          expect(keyResponse).to.equal(jwtKeyValue);

          sinon.assert.calledOnce(this.spy);
        });

        it('works from sessionStorage', function() {
          localStorage.getItem = function(key) { return undefined; };

          sessionStorage.getItem = function(key) {
            expect(key).to.equal('jwtKey');

            return jwtKeyValue;
          };

          let keyResponse = this.service.getJwtKey();
          expect(keyResponse).to.equal(jwtKeyValue);

          sinon.assert.calledOnce(this.spy);
        });
      });

      describe('updating the jwtKey', function() {
        it('works with localStorage', function() {
          let spy2 = sinon.spy();
          let jwtValueUpdate = 'newJwtValue';

          localStorage.getItem = function() { return jwtKeyValue; };
          localStorage.setItem = spy2;

          this.service.updateJwtKey(jwtValueUpdate);

          sinon.assert.calledOnce(this.spy);
          sinon.assert.calledOnce(spy2);
          sinon.assert.calledWith(spy2, 'jwtKey', jwtValueUpdate);
        });

        it('works with sessionStorage', function() {
          let spy2 = sinon.spy();
          let jwtValueUpdate = 'newJwtValue';

          localStorage.getItem = function() { return undefined; };
          sessionStorage.setItem = spy2;

          this.service.updateJwtKey(jwtValueUpdate);

          sinon.assert.calledOnce(this.spy);
          sinon.assert.calledOnce(spy2);
          sinon.assert.calledWith(spy2, 'jwtKey', jwtValueUpdate);
        });
      });

      describe('updating the user attributes', function() {
        it('calls the request with the correct information', function() {
          let spy2 = sinon.spy();
          let attributeHash = {
            firstName: 'Fooby',
            lastName: 'Barby',
            email: 'fooby.barby@example.com'
          };

          Ember.$.ajax = function(request) {
            expect(request.url).to.equal(`/api/users/${userId}`);
            expect(request.data.data.type).to.equal('user');
            expect(request.data.data.id).to.equal(userId);
            expect(request.data.data.attributes).to.equal(attributeHash);

            return {
              done: function() {
                return { fail: spy2 };
              }
            };
          };

          this.service.updateUserAttributes(attributeHash);

          sinon.assert.calledOnce(spy2);
        });
      });

      describe('updating the user password', function() {
        it('calls the request with the correct information', function() {
          let spy2 = sinon.spy();
          let attributeHash = {
            oldPassword: 'foobarchoo',
            newPassword: 'foobarchootwo'
          };

          Ember.$.ajax = function(request) {
            expect(request.type).to.equal('PUT');
            expect(request.url).to.equal(`/api/users/${userId}/change_password`);
            expect(request.data.data.type).to.equal('user');
            expect(request.data.data.id).to.equal(userId);
            expect(request.data.data.attributes).to.equal(attributeHash);

            return {
              done: function() {
                return { fail: spy2 };
              }
            };
          };

          this.service.updateUserPassword(attributeHash);

          sinon.assert.calledOnce(spy2);
        });
      });
    });
  }
);
