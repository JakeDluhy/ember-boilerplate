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
import { authenticateSession } from 'ember-boilerplate/tests/helpers/ember-simple-auth';

describe('Acceptance: UsersSettings', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /users/settings', function() {
    authenticateSession(application);
    visit('/users/settings');

    andThen(function() {
      expect(currentPath()).to.equal('users.settings');
    });
  });
});
