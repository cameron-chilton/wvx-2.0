import React, {Component} from "react";

// React Component to display the timer
class StartGameButton extends Component {

  constructor() {
    super();
    this.state = {
      toggleTextVal: false,
    };
  }

  componentDidMount() {
    this.timeout = setTimeout( () => {
      this.toggleText();
    }, 1000);
  }

  toggleText = () => {
    this.interval = setInterval( () => {
      !this.state.toggleTextVal ? this.setState({toggleTextVal: true}) : this.setState({toggleTextVal: false});
    }, 1300);
  }

  render() {
    return (
      <div className="play-button-container">
        <a href="https://whovox.com">
          <button className="play-button" title="Play the voice game WHOVOX">
            {
              !this.state.toggleTextVal ? <><span className="btnYellow">PLAY WHOVOX</span></> : <><span className="btnOrange">CLICK TO PLAY</span></>
            }
          </button>
        </a>
        <div className="click-play box1">Click to play WHOVOX</div>
        <div className="click-play box2">Free & fun voice recognition game</div>
        <div className="click-play box3">Test your voice knowledge</div>
        <div className="click-play box4">1,000s of famous voices</div>
      </div>
    );
  }
}

StartGameButton.propTypes = {
};

export default (StartGameButton);
