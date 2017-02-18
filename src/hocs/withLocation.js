import React, { PropTypes } from 'react';

/**
 * A public higher-order component for re-rendering as the
 * location changes. Also, passes ...context.router.location as props.
 */
const withLocation = component => class extends React.Component {
  static displayName = `withLocation(${component.displayName || component.name})`

  static contextTypes = {
    router: PropTypes.shape({
      listen: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired
    }).isRequired
  }

  componentWillMount() {
    // Start listening here so we can <Redirect> on the initial render.
    this.unlisten = this.context.router.listen(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return React.createElement(component, {
      ...this.props,
      location: this.context.router.location
    });
  }
};

export default withLocation;
