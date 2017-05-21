import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { Checkbox } from 'widgets';

const css = {
  wrapper: {}
};

@withCss(css)
@observer
class ItemCheckbox extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  handleToggle = () => {
    if (this.props.item.isCompleted) {
      this.props.item.setCompletionStatus(false);
    } else {
      this.props.item.setCompletionStatus(true);
    }
  };

  render() {
    const { item } = this.props;
    console.log('render checkboxc');
    return <Checkbox onToggle={this.handleToggle} checked={item.isCompleted} />;
  }
}

export default ItemCheckbox;
