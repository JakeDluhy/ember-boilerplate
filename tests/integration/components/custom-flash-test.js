/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describeComponent(
  'custom-flash',
  'Integration: CustomFlashComponent',
  {
    integration: true
  },
  function() {
    describe('testing lifecycle', function() {
      // beforeEach(function() {
      //   this.spy = sinon.spy();
        
      // });

      // it('renders', function(done) {
      //   expect(this.$()).to.have.length(1);

      //   setTimeout(function() {
      //     done();
      //   }, 50);
      // });

      // it('destroys itself after the timeout', function(done) {
      //   let spy = sinon.spy();
      //   this.flash = {
      //     message: 'my message',
      //     type: 'success',
      //     timeout: 600,
      //     destroyMessage: this.spy
      //   };
      //   this.set('flash', this.flash);

      //   this.render(hbs`
      //     {{#custom-flash flash=flash}}
      //       flash.message
      //     {{/custom-flash}}
      //   `);

      //   setTimeout(function() {
      //     sinon.assert.calledOnce(spy);
      //     done();
      //   }, 600);
      // });
    });

    describe('testing interaction', function() {
      beforeEach(function() {
        this.spy = sinon.spy();
        this.flash = {
          message: 'my message',
          type: 'success',
          timeout: 3500,
          destroyMessage: this.spy
        };
        this.set('flash', this.flash);

        this.render(hbs`
          {{#custom-flash flash=flash}}
            flash.message
          {{/custom-flash}}
        `);
      });

      // it('destroys itself on click after 500 seconds', function(done) {
      //   setTimeout(function() {
      //     expect(this.$().hasClass('active')).to.be.true;
      //     done();
      //   }, 100);
      // });
    });
  }
);
