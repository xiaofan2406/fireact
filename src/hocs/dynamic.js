import React from 'react';

function dynamic({ importer }) {
  class Dynamic extends React.Component {
    state = {
      Component: null
    };

    componentWillMount() {
      importer()
        .then(({ default: Component }) => {
          this.setState({
            Component
          });
        })
        .catch(console.error);
    }

    render() {
      const { Component } = this.state;

      return Component ? <Component {...this.props} /> : null;
    }
  }
  return Dynamic;
}

export default dynamic;
