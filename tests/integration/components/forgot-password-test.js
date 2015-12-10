/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'forgot-password',
  'Integration: ForgotPasswordComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#forgot-password}}
      //     template content
      //   {{/forgot-password}}
      // `);

      this.render(hbs`{{forgot-password}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
