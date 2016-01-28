/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import { beforeEach } from 'mocha';
import sinon from 'sinon';

describeModule(
  'route:users/forgot',
  'UsersForgotRoute',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    beforeEach(function() {
      this.route = this.subject();
    });

    it('exists', function() {
      expect(this.route).to.be.ok;
    });

    it('persists the forgot password request', function() {
      let ajaxSpy = sinon.spy();
      let flashMessagesSpy = sinon.spy();
      let transitionToSpy = sinon.spy();
      let email = 'foo.bar@example.com';

      Ember.get = function() {
        return { success: flashMessagesSpy };
      };

      this.route.get('actions').transitionTo = transitionToSpy;

      // Stub out the ajax request
      Ember.$.ajax = function(request) {
        expect(request.type).to.equal('POST');
        expect(request.url).to.equal('/api/recover_password');
        expect(request.data.data.attributes.email).to.equal(email);

        return {
          fail: ajaxSpy
        };
      };

      this.route.get('actions').submitForgotPassword({ email: email });

      sinon.assert.calledOnce(ajaxSpy);
      sinon.assert.calledOnce(transitionToSpy);
      sinon.assert.calledOnce(transitionToSpy, 'index');
      sinon.assert.calledOnce(flashMessagesSpy);
      sinon.assert.calledWith(flashMessagesSpy, 'The request was successfully scheduled. An email should arrive soon');
    });
  }
);
