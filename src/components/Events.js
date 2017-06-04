import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

@inject('boardStore')
class Events extends React.PureComponent {
  static propTypes = {
    boardStore: PropTypes.object.isRequired
  };

  componentDidMount() {
    // console.log('lel');
  }

  render() {
    return null;
  }
}

export default Events;
