var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var Router = require('react-router-component');
var Location = Router.Location;
var Link = Router.Link;

var AnimatedLocations = React.createClass({
  mixins: [Router.RouterMixin, Router.AsyncRouteRenderingMixin],

  getRoutes: function() {
    return this.props.children;
  },

  render: function() {
    var handler = this.renderRouteHandler();
    var isPopState = this.state.navigation.isPopState;
    var enabled = isPopState ?
                  !!this.props.popStateTransitionName :
                  !this.state.navigation.noTransition;
    var props = {
      component: React.DOM.div,
      transitionEnter: enabled,
      transitionLeave: enabled,
    };
    if (isPopState && this.props.popStateTransitionName) {
      props.transitionName = this.props.popStateTransitionName;
    } else if (this.state.navigation.transitionName) {
      props.transitionName = this.state.navigation.transitionName;
    }

    handler.props.key = this.state.match.path;
    return this.transferPropsTo(CSSTransitionGroup(props, handler));
  }
});

module.exports = AnimatedLocations;
