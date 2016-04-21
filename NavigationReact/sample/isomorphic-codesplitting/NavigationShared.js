var React = require('react');
var Navigation = require('navigation');

/**
 * Configures the states for the two views.
 */
exports.getStateNavigator = function() {
    return new Navigation.StateNavigator([
        {key: 'people', route: '{pageNumber?}', defaults: {pageNumber: 1}},
        {key: 'person', route: 'person/{id}', defaults: {id: 0}, trackCrumbTrail: true}
    ], new Navigation.HTML5HistoryManager());
}

/**
 * Creates the component for the current State passing in the props. The
 * stateNavigator's included in the props because it's needed by the Hyperlink
 * components.
 */
exports.createComponent = function(stateNavigator, props) {
    var clonedProps = {stateNavigator: stateNavigator};
    for(var key in props)
        clonedProps[key] = props[key];
    return React.createElement(stateNavigator.stateContext.state.component, clonedProps);
}