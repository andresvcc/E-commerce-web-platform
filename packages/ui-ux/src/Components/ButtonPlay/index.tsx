import React, { MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { containedBase, container, backgroundContainer } from './buttonPlay.styles';
import { ButtonPlayProps } from './buttonPlay.types';
import { colors } from '../../Themes/MainTheme/theme.colors';
import { Spinner } from '../Spinner';
import { Icon } from '../Icons';

const Button = styled.button`
  ${(props) => containedBase(props)}
`;

const Container = styled.div`
  ${(props) => container(props)}
`;

const BackgroundContainer = styled.div`
  ${(props) => backgroundContainer(props)}
`;

const InsideContainer = styled(motion.div)``;

export function ButtonPlay({ onClick, isPlay, ...rest }: ButtonPlayProps) {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onClick(event);
  };

  return (
    <Container>
      <BackgroundContainer>
        <Spinner color="#4B4F54" name="all" size={250} speed={!isPlay ? 0 : 30} />
      </BackgroundContainer>
      <Button onClick={handleClick} theme={{ ...Button.defaultProps?.theme, ...rest, isPlay }} {...rest}>
        {!isPlay ? (
          <InsideContainer
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 },
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            whileTap={{ scale: 1 }}
            onClick={handleClick}
          >
            <Icon
              name="play"
              sizeH={30}
              sizeW={30}
              bgRound
              style={{ paddingLeft: '4px' }}
              palleteFill={['#ffffff']}
              // palleteFillHover={['#4B4F54']}
            />
          </InsideContainer>
        ) : (
          <Spinner color="#ffffff" name="advanced" size={100} speed={30} />
        )}
      </Button>
    </Container>
  );
}
