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
      it('renders', function(done) {
        this.render(hbs`
          {{custom-flash}}
        `);

        expect(this.$()).to.have.length(1);

        setTimeout(function() {
          done();
        }, 50);
      });

      it('sets itself to inactive after the timeout', function(done) {
        let self = this;
        let flash = {
          message: 'my message',
          type: 'success',
          timeout: 600,
          destroyMessage: function() {}
        };
        this.set('flash', flash);
        this.set('active', false);

        this.render(hbs`
          {{#custom-flash flash=flash active=active}}
            {{flash.message}}
          {{/custom-flash}}
        `);

        setTimeout(function() {
          expect(self.get('active')).to.be.true;
        }, 75);

        setTimeout(function() {
          expect(self.get('active')).to.be.false;
          done();
        }, 150);
      });
    });

    it('sets itself to inactive on click', function(done) {
      let self = this;
      let spy = sinon.spy();

      let flash = {
        message: 'my message',
        type: 'success',
        timeout: 3500,
        destroyMessage: spy
      };
      this.set('flash', flash);
      this.set('active', false);

      this.render(hbs`
        {{#custom-flash id="custom-flash" flash=flash active=active}}
          flash.message
        {{/custom-flash}}
      `);

      setTimeout(function() {
        expect(self.get('active')).to.be.true;

        self.$('#custom-flash').click();

        setTimeout(function() {
          expect(self.get('active')).to.be.false;
          done();
        }, 100);
      }, 100);
    });
  }
);
