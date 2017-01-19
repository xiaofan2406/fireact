import React from 'react';
import { inject, observer } from 'mobx-react';
import { Col, Card, Menu, Dropdown, Button } from 'antd';


@inject('boardStore')
@observer
class ListSingle extends React.Component {
  static propTypes = {
    boardStore: React.PropTypes.object.isRequired,
    id: React.PropTypes.string.isRequired
  };

  delete = list => () => {
    list.delete();
  }

  newItem = list => (e) => {
    const { boardStore } = this.props;
    if (e.which === 27) {
      console.log('est');
    } else if (e.which === 13) {
      console.log('enter');
      boardStore.newItem(e.target.value, list.id);
    }
  }

  render() {
    const { boardStore, id } = this.props;
    const list = boardStore.lists.get(id);
    console.log('render ListSingle', id);
    return (
      <Col xs={24} sm={12} md={8} lg={6} key={list.id}>
        <Card
          title={list.title}
          extra={
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item> Delete </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <Button size="small" type="ghost" shape="circle" icon="down" />
            </Dropdown>
          }
        >
          <p>{list.path}</p>
          <input type="text" onKeyUp={this.newItem(list)} />
          <ul>{list.items.map(item =>
            <li key={item.id}>{item.title}, {item.id}</li>
          )}</ul>
        </Card>
      </Col>
    );
  }
}


export default ListSingle;
