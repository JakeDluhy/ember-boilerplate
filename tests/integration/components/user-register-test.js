/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'user-register',
  'Integration: UserRegisterComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#user-register}}
      //     template content
      //   {{/user-register}}
      // `);

      this.render(hbs`{{user-register}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
