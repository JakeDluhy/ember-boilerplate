/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import sinon from 'sinon';

describeModule(
  'controller:index',
  'IndexController',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    beforeEach(function() {
      this.controller = this.subject();
    });

    it('exists', function() {
      expect(this.controller).to.be.ok;
    });

    it('should send the persist action to the route when submitting to mailing list', function() {
      let spy = sinon.spy();
      let email = 'foo.bar@example.com';
      this.controller.get('actions').get = function() { return email; };

      this.controller.get('actions').send = spy;

      this.controller.get('actions').submitToMailingList();

      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, 'persistMailingListSignup', email);
    });

    it('should open the contact modal', function() {
      let spy = sinon.spy();
      this.controller.get('actions').set = spy;

      this.controller.get('actions').openContactModal();

      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, 'contactModalOpen', true);
    });

    describe('on contact submit', function() {
      it('should close the contact modal', function() {
        let spy = sinon.spy();
        this.controller.get('actions').set = spy;

        this.controller.get('actions').onContactSubmit();

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, 'contactModalOpen', false);
      });
    });
  }
);
