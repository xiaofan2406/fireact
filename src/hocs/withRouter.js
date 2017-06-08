import React from 'react';
import PropTypes from 'prop-types';

function withRouter(Component) {
  const WithRouter = (props, context) =>
    <Component router={context.router.history} {...props} />;

  WithRouter.contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  };

  WithRouter.displayName = `withRouter(${Component.displayName ||
    Component.name})`;

  return WithRouter;
}

export default withRouter;
