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

  checkItem = () => {
    this.props.item.setCompletion(true);
  };

  unCheckItem = () => {
    this.props.item.setCompletion(false);
  };

  render() {
    const { item } = this.props;
    console.log('render checkboxc');
    return (
      <Checkbox
        onCheck={this.checkItem}
        onUncheck={this.unCheckItem}
        checked={item.completed}
      />
    );
  }
}

export default ItemCheckbox;
