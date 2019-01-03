import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Button, Icon, Layout, Form, Input, Steps, message } from 'antd';
import Blockchain from './Blockchain.js';
import sha256 from 'crypto-js/sha256';
import 'antd/dist/antd.css';        // for css
import './index.css';
// The default locale is en-US, but we can change it to other language

const { Header, Content } = Layout;
const INITIAL_DATA = 'The square of the hypotenuse is equal to the sum of the squares of the other two sides';
var blockIndex = 0;
var prevHash = 0;

const Step = Steps.Step;
const steps = [{
  title: 'Blockchain',
  content: 'A blockchain has a list of blocks. It starts with a single block, called the genesis block.',
}, {
  title: 'Block',
  content: 'Each block stores the following information: Index,Timestamp, Hash, Previous Hash, Data',
}, {
  title: 'Index',
  content: 'The index is the position of the block in the chain. The genesis block has an index of 0. The next block will have an index of 1.',
}, {
  title: 'Timestamp',
  content: 'A record of when the block was created. The timestamp helps to keep the blockchain in order.'
}, {
  title: 'Hash',
  content: 'A hash looks like a bunch of random numbers and letters. It is a alphanumeric value that uniquely identifies data, or the "digital fingerprint" of data.'
}];

class App extends React.Component {
  constructor(props) {
    super(props);

    var dt = new Date();
    var utcDate = dt.toUTCString();
    var newHash = sha256(blockIndex+prevHash+utcDate+INITIAL_DATA);

    this.state = {
      items: [{
        data: INITIAL_DATA,
        key: ""+blockIndex,
        hash: ""+newHash,
        previousHash: ""+prevHash,
        time: utcDate
      }],
      //This specific value variable should only be used to identify
      //the input field in the add blockchain form
      value: '',
      current: 0
    };
    prevHash = newHash;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value })
  }

  handleSubmit(e) {
    if (this.state.value !== '') {
      console.log(this.state.value);

      blockIndex = blockIndex + 1;
      var dt = new Date();
      var utcDate = dt.toUTCString();
      var newHash = sha256(blockIndex+prevHash+utcDate+this.state.value);

      var newItem = {
        data: this.state.value,
        key: ""+blockIndex,
        hash: ""+newHash,
        previousHash: ""+prevHash,
        time: utcDate
      };
      console.log("About to set prevHash");
      prevHash = newHash;

      console.log("concatentating");
      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem)
        };
      });
    }
    e.preventDefault();
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }


  render() {
    const { current } = this.state;
    return (
      <React.Fragment>
        <Header style={{ background: 'rgb(256,256,256)'}}>
          <div style={{textAlign: 'center', margin: '20px'}}>
            <div style={{display: 'inline-block'}}>
              <h1>

                <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                <span> BUILD-A-BLOCKCHAIN </span>
                <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />

              </h1> <br/>
            </div>
          </div>
        </Header>
        <Content style = {{ padding: '30px 50px' }}>
        <div>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
              {
                current < steps.length - 1
                && <Button type="primary" onClick={() => this.next()}>Next</Button>
              }
              {
                current === steps.length - 1
                && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
              }
              {
                current > 0
                && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  Previous
                </Button>
                )
              }
            </div>
          </div>

          <div>
            <div style={{ margin: '10px auto' }}>
              <div style={{textAlign: 'center'}}>
                <div style={{ display: 'inline-block'}}>
                  <p style={{fontStyle: 'italic'}}> "A healthy blockchain is a growing blockchain!" <br/>
                  -<a href='https://tomjoshi.com/'>Sateshi Nakemati </a>
                  </p>
                </div>
              </div>

              <Blockchain entries={this.state.items}/>


            </div>


          </div>

          <div style={{ width: '60%', margin: '30px auto' }}>
            <Card hoverable = "true">
              <Form onSubmit={this.handleSubmit} className="add-block-form">
                <Form.Item>
                  <Input type="text" value={this.state.value} onChange={this.handleChange} addonBefore={'Data'} prefix={<Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="add-new-block-form-button" style={{ width:'100%'}}>
                      + ADD BLOCK
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </Content>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
