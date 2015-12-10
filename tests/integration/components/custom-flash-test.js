/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'custom-flash',
  'Integration: CustomFlashComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#custom-flash}}
      //     template content
      //   {{/custom-flash}}
      // `);

      this.render(hbs`{{custom-flash}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
