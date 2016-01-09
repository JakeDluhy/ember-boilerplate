/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'modal-dialog',
  'Integration: ModalDialogComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#modal-dialog}}
      //     template content
      //   {{/modal-dialog}}
      // `);

      this.render(hbs`{{modal-dialog}}`);
      expect(this.$()).to.have.length(1);
    });

    describe('with various options', function() {
      it('displays the provided title', function() {

      });

      it('opens the modal when the property is set', function() {

      });

      it('closes the modal when the property is set', function() {

      });

      it('displays the overlay when desired', function() {

      });

      it('does not display the overlay when desired', function() {

      });
    });

    describe('interacting with the modal', function() {
      it('can click outside to close when property is set', function() {

      });

      it('is possible to disable click outside to close', function() {

      });

      it('is possible to close the modal by clicking the X', function() {

      });
    });
  }
);
