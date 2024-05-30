/* eslint-disable @typescript-eslint/no-shadow */

import React, { useState, useRef, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { colors } from './colors';
import { CustomScrollbarProps } from '../consoleProgram.types';

export const CustomScrollbar: React.FC<CustomScrollbarProps> = (props) => {
  const [top, setTop] = useState(0);

  const handleUpdate = (values: any) => {
    const { top } = values;
    setTop(top);
  };

  const renderView = ({ style, ...props }: any) => {
    const viewStyle = {
      padding: 0,
      paddingBottom: '3rem',
      margin: 0,
      color: `rgb(${Math.round(255 - top * 255)}, ${Math.round(255 - top * 255)}, ${Math.round(255 - top * 255)})`,
      ...style,
    };
    return <div className="box" style={viewStyle} {...props} />;
  };

  const renderThumb = ({ style, ...props }: any) => {
    const thumbStyle = {
      backgroundColor: colors.scrollThumb,
      ...style,
    };
    return <div style={thumbStyle} {...props} />;
  };

  return (
    <Scrollbars
      renderView={renderView}
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      onUpdate={handleUpdate}
      {...props}
    />
  );
};
