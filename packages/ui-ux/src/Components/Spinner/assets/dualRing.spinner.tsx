import styled, { keyframes } from 'styled-components';

const rotate = keyframes`	
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

const DualRing = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;

  :after {
    content: ' ';
    display: block;
    width: 32px;
    height: 32px;
    margin: 4px;
    border-radius: 50%;
    border: 3px solid ${(props) => props.theme.color};
    border-color: ${(props) => props.theme.color} transparent ${(props) => props.theme.color} transparent;
    animation: ${rotate} ${(props) => 80 / props.theme.speed}s linear infinite;
  }
`;

DualRing.defaultProps = {
  theme: {
    color: '#000',
    size: 50,
    speed: 100,
  },
};

export default DualRing;
