/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import { describe, beforeEach } from 'mocha';

const jwtValue = 'jwtKeyValue';

describeModule(
  'adapter:application',
  'ApplicationAdapter',
  {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      var adapter = this.subject();
      expect(adapter).to.be.ok;
    });

    describe('setting the headers', function() {
      it('works with local storage', function() {
        localStorage.getItem = function() { return jwtValue; };

        let adapter = this.subject();
        expect(adapter.get('headers')['AUTHORIZATION']).to.equal(`Bearer ${jwtValue}`);
      });

      it('works with session storage', function() {
        localStorage.getItem = function() { return undefined; };
        sessionStorage.getItem = function() { return jwtValue; };

        let adapter = this.subject();
        expect(adapter.get('headers')['AUTHORIZATION']).to.equal(`Bearer ${jwtValue}`);
      });
    });
  }
);
