import Ember from 'ember';
import UnauthenticatedRouteMixin from '../../mixins/unauthenticated-route-mixin';
import TransitionHandlers from '../../mixins/transition-handlers';

export default Ember.Route.extend(UnauthenticatedRouteMixin, TransitionHandlers, {
});
