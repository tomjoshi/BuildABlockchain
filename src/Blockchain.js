import React from 'react';
import { Card, Icon, Input, Tag } from 'antd';

class Blockchain extends React.Component {
  createBlocks(item) {
    return (
      <div className="block" >
        <Card
        title={(item.key === '0') ? 'GENESIS BLOCK':('BLOCK #' + item.key)}
        hoverable = "true"
        style={{borderRadius: '25px'}}
        >
          <Input
            addonBefore={'Data'}
            prefix= { <Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} /> }
            value={item.data}
            />
            <div style={{padding: '10px', flexWrap: 'nowrap', overflow: 'auto', justifyContent: 'flex-start'}}>
              <span> INDEX: <Tag color='magenta'> {item.key} </Tag> </span> <br/>
              <span> PREVIOUS HASH: <Tag color='green'> {item.previousHash} </Tag>   </span><br/>
              <span>HASH: <Tag color='green'> {item.hash} </Tag> </span><br/>
              <span>TIMESTAMP: <Tag color='magenta'> {item.time} </Tag> </span> <br/>
            </div>
        </Card>
        <Icon type="down-circle" theme="twoTone" style={{ fontSize: '36px', width: '100%', margin: '10px auto' }} />
      </div>
      );

  }

  render() {
    var blockEntries = this.props.entries;
    var listItems = blockEntries.map(this.createBlocks);

    return (
      <div className="block-items">
          {listItems}
      </div>
    );
  }
};

export default Blockchain;
