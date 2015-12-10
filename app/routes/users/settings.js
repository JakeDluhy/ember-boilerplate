import Ember from 'ember';
import AuthenticatedRouteMixin from '../../mixins/authenticated-route-mixin';
import TransitionHandlers from '../../mixins/transition-handlers';

export default Ember.Route.extend(AuthenticatedRouteMixin, TransitionHandlers, {
});
