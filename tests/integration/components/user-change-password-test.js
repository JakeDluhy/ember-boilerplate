/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'user-change-password',
  'Integration: UserChangePasswordComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#user-change-password}}
      //     template content
      //   {{/user-change-password}}
      // `);

      this.render(hbs`{{user-change-password}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
