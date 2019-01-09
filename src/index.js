import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Button, Icon, Layout, Form, Input, Steps, message, Modal } from 'antd';
import {Helmet} from "react-helmet";
import ScreenShot from './ScreenShot.png';
import favicon from './favicon.ico';
import Blockchain from './Blockchain.js';
import sha256 from 'crypto-js/sha256';
import 'antd/dist/antd.css';        // for css
import './index.css';
// The default locale is en-US, but we can change it to other language

const { Header, Content } = Layout;
const INITIAL_DATA = 'Scroll down to add your own block! ';
var blockIndex = 0;
var prevHash = 0;

const ButtonGroup = Button.Group;

const Step = Steps.Step;
const steps = [{
  title: 'Blockchain',
  content: 'A blockchain is a list of blocks linked together. It all starts with the first block, called the genesis block.',
}, {
  title: 'Block',
  content: 'Each block stores information: Index, Timestamp, Hash, Previous Hash, Data',
}, {
  title: 'Index',
  content: 'The index is the position of the block in the greater chain. For example, the genesis block has an index of 0. The next block will have an index of 1.',
}, {
  title: 'Timestamp',
  content: 'The timestamp gives the exact time in which the block was created and the data was stored.'
}, {
  title: 'Hash',
  content: 'A hash is the digital fingerprint of the data. It is a alphanumeric value that uniquely identifies data. Each block knows its own hash, and the hash of the previous block.'
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
      current: 0,
      //// TODO: Undo false
      visible: true
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

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const { current } = this.state;
    return (

      <React.Fragment>
        <Helmet>
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          <link rel="shortcut icon" href={favicon} />

          <title>Build-A-Blockchain</title>
          <meta name="Description" content="Visualize the blockchain technology!" />

          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:site" content="@TomJoshi2"/>
          <meta name="twitter:creator" content="@TomJoshi2"/>
          <meta name="twitter:title" content="Build-A-Blockchain"/>
          <meta name="twitter:description" content="Visualize the blockchain technology!"/>

          <meta property="og:url" content="http://buildablockchain.tech"/>
          <meta property="og:type" content="website"/>
          <meta property="og:title" content="Build-A-Blockchain"/>
          <meta property="og:description" content="Visualize the blockchain technology!"/>
          <meta property='og:image' content={ScreenShot}/>
        </Helmet>

        <nav style={{position: 'sticky', top:'0', zIndex: '1'}}>
          <div style={{textAlign: 'center', display:'flex', height: '40px', justifyContent: 'center', background: '#16a085'}}>
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '10px' }}>
              <a style={{color: 'white'}} href="https://www.bonfire.com/build-a-blockchain/"> ORDER THE BUILD-A-BLOCKCHAIN SHIRT HERE</a>
            </div>
          </div>
        </nav>



          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{margin: '10px 10px'}}>
              <ButtonGroup>
                <Button disabled={true} style={{background: 'white', color: 'black'}}> Share: </Button>
                <Button type="primary" icon="mail" href="mailto:?subject=Build-A-Blockchain: Visualize the Blockchain technology&body=Check out this site! https://buildablockchain.tech"/>
                <Button type="primary" icon="facebook" href="https://www.facebook.com/sharer/sharer.php?u=#url" />
                <Button type="primary" icon="linkedin" href="https://www.linkedin.com/shareArticle?mini=true&url=https://buildablockchain.tech&title=Build-A-Blockchain&summary=Visualization%20of%20Blockchain%20technologies&source=TomJoshi"/>
                <Button type="primary" icon="twitter" href="https://twitter.com/share?url=https://buildablockchain.tech&via=tomjoshi2&hashtags=Blockchain%2CEducation%2CDemo%2CLearn&text=Blockchain%20Demo%20-%20Visualize%20Blockchain%20technologies"/>
                <Button type="primary" icon="google-plus" href="https://plus.google.com/share?url=https://buildablockchain.tech"/>
              </ButtonGroup>
            </div>
            <div style={{margin: '10px 10px', align: 'right'}}>
              <ButtonGroup>
                <Button disabled='true' style={{background: 'white', color: 'black'}}> Contact: </Button>
                <Button type="primary" icon="linkedin" href="https://www.linkedin.com/in/tom-joshi-32334912a/" />
                <Button type="primary" icon="facebook" href="https://www.fb.me/buildablockchain" />
                <Button type="primary" icon="mail" href="mailto:buildablockchain@gmail.com"/>
              </ButtonGroup>
            </div>
          </div>


        <Header style={{ background: 'rgb(256,256,256)'}}>
          <div style={{textAlign: 'center', margin: '20px auto'}}>
            <div style={{ margin: '10px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <span>
                  <h2>
                  <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                   BUILD-A-BLOCKCHAIN
                  <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                  </h2>
                </span>
               <br/>
            </div>
          </div>
        </Header>
        <Content style = {{ padding: '10px 30px' }}>
          <div style={{ margin: '10px auto' }}>
            <div style={{textAlign: 'center'}}>
              <div style={{ display: 'inline-block'}}>

                <h3>
                  <u>BACKGROUND INFO</u>
                </h3>

              </div>
            </div>
          </div>
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
                  && <Button type="primary" onClick={() => message.success('Scroll down to the Blockchain!')}>Done</Button>
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


            <div style={{ margin: '10px auto' }}>
                <div style={{textAlign: 'center'}}>
                  <div  style={{ display: 'inline-block'}}>

                    <h1>
                      <u>THE BLOCKCHAIN</u>
                    </h1>
                  </div>
                </div>
                <Blockchain entries={this.state.items}/>
              </div>

            <div style={{ width: '80%', margin: '10px auto' }} name="add-block-form">
              <Card hoverable = "true">
                <Form onSubmit={this.handleSubmit} className="add-block-form">
                  <Form.Item>
                    <Input placeholder='Type random stuff here!'type="text" value={this.state.value} onChange={this.handleChange} addonBefore={'Data'} prefix={<Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="add-new-block-form-button" style={{ width:'100%'}}>
                        + ADD BLOCK
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>

            <Modal
              title="Welcome to Build-A-Blockchain!"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>Build-A-Blockchain is a super simple way for anyone to become familiar with the Blockchain technology by making their own basic Blockchain in a few seconds.</p>
              <p>The first part introduces basic background information. The second part is where you get to play with the Blockchain!</p>
            </Modal>
        </Content>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
