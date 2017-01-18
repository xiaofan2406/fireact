import React from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col, Card } from 'antd';


@inject('boardStore')
@observer
class BoardDisplay extends React.Component {
  static propTypes = {
    boardStore: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const { boardStore } = this.props;
    if (boardStore.isEmpty) {
      boardStore.getLists();
      console.log('gonna retrieve data');
    }
  }

  delete = list => () => {
    list.delete();
  }

  render() {
    const { boardStore: { lists } } = this.props;
    return (
      <Row gutter={12}>
        {lists.map(list => (
          <Col xs={24} sm={12} md={8} lg={6} key={list.id}>
            <Card>
              <p>{list.path}</p>
              <p>{list.title}</p>
              <button onClick={this.delete(list)}>x</button>
            </Card>

          </Col>
        ))}
      </Row>
    );
  }
}


export default BoardDisplay;
