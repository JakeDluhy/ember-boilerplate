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
  'route:users/reset',
  'UsersResetRoute',
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

    it('persists the reset password', function() {
      let spy = sinon.spy();
      let newPassword = 'foobarchoo2';
      let resetCode = 'myRandomResetCode';

      this.route.get('actions').get = function() { return resetCode; };

      // Stub out the ajax request
      Ember.$.ajax = function(request) {
        expect(request.type).to.equal('PUT');
        expect(request.url).to.equal('/api/users/reset_password');
        expect(request.data.data.attributes.newPassword).to.equal(newPassword);
        expect(request.data.data.attributes.resetCode).to.equal(resetCode);

        return {
          done: function(data) {
            return { fail: spy };
          }
        };
      };

      this.route.get('actions').submitResetPassword(newPassword);

      sinon.assert.calledOnce(spy);
    });
  }
);
