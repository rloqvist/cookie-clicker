import React, {Component} from 'react';
import styled from 'styled-components';

import cookie from '../images/chocolatechip.png';

const StyledCookie = styled.img`
  border-radius: 50%;
  cursor: pointer;
  display: block;
  margin: 30px auto;
  :hover {
    animation: expand 0.1s forwards;
  }
  @keyframes expand {
    from {
      transform: scale(1.0);
    }
    to {
      transform: scale(1.1);
    }
  }
`;

export class CookieContainer extends Component {
  constructor() {
    super();

    this.state = {};
  }

  handleClick = () => {
    this.props.onCookieClick();
    this.setState({lastClicked: Date.now()});
  }

  render() {
    return <StyledCookie key={this.state.lastClicked} src={cookie} onClick={this.handleClick} />
  }
}
