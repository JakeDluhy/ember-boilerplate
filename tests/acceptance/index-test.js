/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: Index', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /', function() {
    visit('/');

    andThen(function() {
      expect(currentPath()).to.equal('index');
    });
  });

  describe('interacting with the page', function() {
    beforeEach(function() {
      visit('/');
    });

    it('has a link to the root', function() {

    });

    it('can log in through the modal', function() {

    });

    it('can register through the modal', function() {

    });

    it('links to the index from the call to action', function() {

    });

    it('can sign up for the mailing list', function() {

    });

    it('can contact the company through the contact modal', function() {

    });
  });
});
