import React, {Component} from 'react';
import styled from 'styled-components';

const StyledUsername = styled.input`
  border: none;
  width: 100%;
  text-align: center;

  :focus {
    outline: none;
  }
`;

export const Username = args => {
  return <StyledUsername {...args} />;
}
