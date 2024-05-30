import styled, { keyframes } from 'styled-components';

const anim = keyframes`	  
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const Scan = styled.span`
  width: 46px;
  height: 46px;
  display: inline-block;
  position: relative;

  :after {
    animation-delay: 0.5s;
    content: '';
    box-sizing: border-box;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: ${(props) => props.theme.color};
    position: absolute;
    left: 0;
    top: 0;
    animation: ${anim} ${(props) => 80 / props.theme.speed}s linear infinite;
  }
`;

Scan.defaultProps = {
  theme: {
    color: '#000',
    size: 50,
    speed: 100,
  },
};

export default Scan;
