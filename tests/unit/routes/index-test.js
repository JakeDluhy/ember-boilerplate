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
  'route:index',
  'IndexRoute',
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

    it('sends an ajax request to persist the mailing list signup', function() {
      let spy = sinon.spy();
      let email = 'foo.bar@example.com';

      Ember.$.ajax = function(request) {
        expect(request.type).to.equal('POST');
        expect(request.url).to.equal('/api/mailing_list');
        expect(request.data.data.attributes.email).to.equal(email);

        return {
          done: function() {
            return { fail: spy };
          }
        };
      };

      this.route.get('actions').persistMailingListSignup(email);

      sinon.assert.calledOnce(spy);
    });
  }
);
