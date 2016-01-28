import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  userId() {
    return faker.random.number({min: 1, max: 10});
  },
  resetCode() {
    return faker.lorem.words(5).join('');
  }
});
