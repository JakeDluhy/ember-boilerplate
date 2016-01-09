/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../../helpers/start-app';
import destroyApp from '../../helpers/destroy-app';

describe('Acceptance: UsersForgot', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /users/forgot', function() {
    visit('/users/forgot');

    andThen(function() {
      expect(currentPath()).to.equal('users.forgot');
    });
  });
});
