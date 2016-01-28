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

  describe('interacting with the page', function() {
    beforeEach(function() {
      visit('/users/forgot');
    });

    it('can fill in and submit the form', function() {
      fillIn('.spec-forgot-email-input input', 'foo.bar@example.com');
      click('.spec-forgot-submit-button');

      andThen(() => {
        expect(currentPath()).to.equal('index');
        expect($('.flash-content')).to.have.length(1);
      });
    });
  });
});
