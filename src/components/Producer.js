import React from 'react';
import styled, {css} from 'styled-components';

import {producers} from '../data/producers';
import {spaceSeparate} from '../utils'

const StyledProducer = styled.div`
  display: flex;
  float: left;
  width: 100%;
  margin: 5px 0;
  padding-left: 0;
  transition: padding-left 0.2s;
  opacity: ${props => props.active ? 1.0 : 0.2};

  & > div {
    margin: auto;
  }

  ${props => props.active && css`
    cursor: pointer;
    :hover {
      padding-left: 20px;
    }
  `}
`;

const StyledProducerIcon = styled.img`
  max-height: 50px;
`;

const StyledProducerName = styled.div`
  font-size: 18px;
  min-width: 150px;
`;

const StyledProducerDetails = styled.div`
  & > div:nth-child(1) {
    color: red;
  }
  & > div:nth-child(2) {
    color: green;
  }
`;

const StyledProducerCount = styled.div`
  font-size: 18px;
`;

const Producer = ({name, cost, src, cps, active, count, index, onAddProducer}) => {
  return (
    <StyledProducer active={active} onClick={() => active && onAddProducer({name, cost, cps, index})}>
        <StyledProducerIcon src={src} />
        <StyledProducerName>{name}</StyledProducerName>
        <StyledProducerDetails>
          <div>cost {spaceSeparate(cost)} cookies</div>
          <div>{spaceSeparate(cps)} cookies / s</div>
        </StyledProducerDetails>
        <StyledProducerCount>{spaceSeparate(count)}</StyledProducerCount>
    </StyledProducer>
  )
}

export const ProducerContainer = props => {
  //console.log(Object.values(props.producers).map(producer => producer.index));
  const producerIndex = Object.values(props.producers).length === 0 ? 1 :
    Math.max(...Object.values(props.producers).map(producer => producer.index)) + 2;
  return (
    <>
      {producers
        .filter((producer, index) => index <= producerIndex)
        .map((producer, index) => {
        const ownProducer = props.producers[producer.name];
        const count = ownProducer && ownProducer.count ? ownProducer.count : 0;
        const cost = Math.floor(producer.cost * Math.pow(1.1, count))
        return (
          <Producer
            key={producer.name}
            active={props.cookies >= cost}
            onAddProducer={props.onAddProducer}
            {...producer}
            index={index}
            count={count}
            cost={cost}
          />
        )
      })}
    </>
  )
}
