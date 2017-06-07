import React from 'react';

export default function dynamic({ importer }) {
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
        .catch(console.log);
    }

    render() {
      const { Component } = this.state;

      return Component ? <Component {...this.props} /> : null;
    }
  }
  return Dynamic;
}
