import React, { Component } from 'react';
import { Media } from 'react-breakpoints'
import {CookieContainer} from './components/Cookie';
import {ProducerContainer} from './components/Producer';
import {Username} from './components/Username';
import styled, {css} from 'styled-components';
import storage, {spaceSeparate} from './utils'
import shortid from 'shortid';

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

    const id = storage.getItem('id');
    const username = storage.getItem('username');

    this.state = {
      id,
      username,
    }
  }

  componentDidMount = () => {
    this.productionLoop()
    this.highScoreSubscription();
  }

  highScoreSubscription = async () => {
    const highscore = await storage.broadcast();

    this.setState({
      highscore,
    })

    setTimeout(this.highScoreSubscription, 2000);
  }

  handleSetUsername = username => {
    storage.setItem('username', username);
    this.setState({username});
  }

  handleCookieClick = () => this.handleIncrement(1);

  handleAddProducer = producer => {
    let producers = storage.getItem('producers') || {};
    if (!producers[producer.name]) {
      producers[producer.name] = {
        ...producer,
        count: 1,
      }
    } else {
      producers[producer.name].count++
    }
    storage.setItem('producers', producers)
    this.handleIncrement(-producer.cost);
  }

  handleIncrement = value => {
    let cookies = parseFloat(storage.getItem('cookies')) || 0;
    cookies += value;
    storage.setItem('cookies', cookies);
    document.title = `${spaceSeparate(Math.floor(cookies))} cookies`;
    this.forceUpdate(); // Since we don't use setState ...
  }

  productionLoop = async () => {
    const producers = storage.getItem('producers');
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
    const cookies = parseFloat(storage.getItem('cookies')) || 0;
    const producers = storage.getItem('producers') || {};
    return {cookies, producers}
  }

  getCps = () => {
    const producers = storage.getItem('producers');
    if (producers) {
      let increment = 0;
      Object.values(producers).forEach(({cps, count}) => {
        increment += cps * count;
      })
      return increment;
    }
    return 0;
  }

  render() {
    const {cookies, producers} = this.getStorageProperties();
    return (
      <Media>
        {({ breakpoints, currentBreakpoint }) => (
          <Container large={breakpoints[currentBreakpoint] > breakpoints.tablet}>
            <Username defaultValue={this.state.username} onChange={event => this.handleSetUsername(event.target.value)} />
            <h1>{spaceSeparate(Math.floor(cookies))}</h1>
            <CookieContainer onCookieClick={this.handleCookieClick} />
            <h3>{`cookies per second: ${spaceSeparate(this.getCps())}`}</h3>
            <h4>highscore</h4>
            {this.state.highscore && this.state.highscore.map(user => (
              <h5 key={user.id}>{user.username}, {spaceSeparate(Math.floor(user.cookies))} cookies</h5>
            ))}
            <ProducerContainer producers={producers} cookies={cookies} onAddProducer={this.handleAddProducer} />
          </Container>
        )}
      </Media>
    )
  }
}

export default App;
