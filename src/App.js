// import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

export default class App extends Component {

  state = {
    showMessage : true
  };

  subRender(showMessage) {
    if(showMessage) {
      return (<div>
      I am the content that should be hidden by default!
    </div>);
    }else{
      return null;
    }
  }

  setShowMessage = () => {
    setInterval(() => {
      this.setState({showMessage : !this.state.showMessage})
    }, 5000);
  }

  toggleShowMessage = (event) => {
    this.setState({showMessage: !this.state.showMessage})
  }

  render() {
    // const showMessage = false;
    // this.setShowMessage();
    return (
    <div className='App'>
      <button onClick={this.toggleShowMessage}> Click on me to {this.state.showMessage ? "Hide" : "show"} the rest! </button>
      {this.subRender(this.state.showMessage)}
    </div>
    );
  }
}
