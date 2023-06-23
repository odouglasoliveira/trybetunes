import { Component } from 'react';
import { StyledLoading } from '../styles/styles';

class Loading extends Component {
  render() {
    return (
      <StyledLoading>
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
      </StyledLoading>
    );
  }
}

export default Loading;
