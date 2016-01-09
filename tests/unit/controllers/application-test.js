/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import sinon from 'sinon';

describeModule(
  'controller:application',
  'ApplicationController',
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

    it('can open the sidenav', function() {
      let toggle = {
        send: function(trigger) {
          expect(trigger).to.equal('toggleMenu');
        }
      };

      this.controller.get('actions').openSidenav(toggle);
    });

    describe('the login modal', function() {
      it('can show the login modal', function() {
        let spy = sinon.spy();

        this.controller.get('actions').set = spy;
        this.controller.get('actions').showLoginModal();

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, 'loginModalOpen', true);
      });

      it('can hide the login modal', function() {
        let spy = sinon.spy();

        this.controller.get('actions').set = spy;
        this.controller.get('actions').closeLoginModal();

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, 'loginModalOpen', false);
      });

      it('can switch to the login view', function() {
        let spy = sinon.spy();

        this.controller.get('actions').set = spy;
        this.controller.get('actions').loginModalTransition('login');

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, 'showLogin', true);
      });

      it('can switch to the register view', function() {
        let spy = sinon.spy();

        this.controller.get('actions').set = spy;
        this.controller.get('actions').loginModalTransition('register');

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, 'showLogin', false);
      });
    });

    it('can log out the user', function() {
      let spy = sinon.spy();

      this.controller.get('actions').get = function() {
        return {
          invalidate: spy
        };
      };
      this.controller.get('actions').logoutUser();

      sinon.assert.calledOnce(spy);
    });
  }
);
