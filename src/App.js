import React, { Component } from 'react';
import { Media } from 'react-breakpoints'
import {CookieContainer} from './components/Cookie';
import {ProducerContainer} from './components/Producer';
import styled, {css} from 'styled-components';
import {spaceSeparate} from './utils'

const Container = styled.div`
  text-align: center;

  ${props => props.large && css `
    padding: 0 20%;
    width: 60%;
  `}
`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      storage: window.localStorage,
    }
  }

  componentDidMount = () => {
    this.productionLoop()
  }

  handleCookieClick = () => this.handleIncrement(1);

  handleAddProducer = producer => {
    let producers = JSON.parse(this.state.storage.getItem('producers')) || {};
    if (!producers[producer.name]) {
      producers[producer.name] = {
        ...producer,
        count: 1,
      }
    } else {
      producers[producer.name].count++
    }
    this.state.storage.setItem('producers', JSON.stringify(producers))
    this.handleIncrement(-producer.cost);
  }

  handleIncrement = value => {
    let cookies = parseFloat(this.state.storage.getItem('cookies')) || 0;
    cookies += value;
    this.state.storage.setItem('cookies', cookies);
    document.title = `${spaceSeparate(Math.floor(cookies))} cookies`;
    this.forceUpdate(); // Since we don't use setState ...
  }

  productionLoop = async () => {
    let producers = JSON.parse(this.state.storage.getItem('producers'));
    if (producers) {
      let increment = 0;
      Object.values(producers).forEach(({cps, count}) => {
        increment += cps * count;
      })
      this.handleIncrement(increment / 10);
    }
    setTimeout(this.productionLoop, 100);
  }

  getStorageProperties = () => {
    const cookies = parseFloat(this.state.storage.getItem('cookies')) || 0;
    const producers = JSON.parse(this.state.storage.getItem('producers')) || {};
    return {cookies, producers}
  }

  render() {
    const {cookies, producers} = this.getStorageProperties();
    return (
      <Media>
        {({ breakpoints, currentBreakpoint }) => (
          <Container large={breakpoints[currentBreakpoint] > breakpoints.tablet}>
            <h1>{spaceSeparate(Math.floor(cookies))}</h1>
            <CookieContainer onCookieClick={this.handleCookieClick} />
            <ProducerContainer producers={producers} cookies={cookies} onAddProducer={this.handleAddProducer} />
          </Container>
        )}
      </Media>
    )
  }
}

export default App;
