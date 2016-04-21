var React = require('react');
var Navigation = require('navigation');
var People = require('./People');
var Person = require('./Person');

/**
 * Configures the states for the two views. The component is included for
 * convenience only, it is NOT needed by the Navigation router. It simplifies
 * the state to component lookup in the createComponent function below.
 */
exports.getStateNavigator = function() {
    return new Navigation.StateNavigator([
        {key: 'people', route: '{pageNumber?}', component: People.Listing, defaults: {pageNumber: 1}},
        {key: 'person', route: 'person/{id}', component: Person.Details, defaults: {id: 0}, trackCrumbTrail: true}
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