import styled, { keyframes } from 'styled-components';

const rotate = keyframes`	  
  100% {
	transform: rotate(360deg)
  }
`;

const Default = styled.span`
  width: 40px;
  height: 40px;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: ${(props) => props.theme.color} #0000 ${(props) => props.theme.color} #0000;
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${(props) => 80 / props.theme.speed}s ${rotate} linear infinite;

  :after {
    border-color: ${(props) => props.theme.color};
    transform: translate(26px, 1.5px) rotate(-35deg);
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    border: 10px solid transparent;
    border-top-color: ${(props) => props.theme.color};
  }

  :before {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    border: 10px solid transparent;
    border-bottom-color: ${(props) => props.theme.color};
    transform: translate(-10px, 12.5px) rotate(-35deg);
  }
`;

Default.defaultProps = {
  theme: {
    color: '#de3500',
    size: 50,
    speed: 100,
  },
};

export default Default;
