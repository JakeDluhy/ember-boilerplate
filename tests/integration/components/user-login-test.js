/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'user-login',
  'Integration: UserLoginComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#user-login}}
      //     template content
      //   {{/user-login}}
      // `);

      this.render(hbs`{{user-login}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
