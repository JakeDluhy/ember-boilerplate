/* jshint expr:true */
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
