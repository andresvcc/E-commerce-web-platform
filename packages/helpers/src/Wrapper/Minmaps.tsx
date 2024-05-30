/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import plantumlEncoder from 'plantuml-encoder';

type MinmapsWrapperProps = {
  model: string;
  width?: string | number;
  height?: string | number;
  justify?: string;
};

export function Minmaps({ model = '', width = 800, height = 800, justify = 'center' }: MinmapsWrapperProps) {
  const encoded = plantumlEncoder.encode(`
  @startmindmap
  ${model}
  @endmindmap
  `);

  const url = 'http://www.plantuml.com/plantuml/svg/' + encoded;

  return (
    <div style={{ display: 'flex', justifyContent: justify, alignItems: 'center', width: '100%' }}>
      <img
        style={{
          width: width,
          height: height,
          objectFit: 'contain',
        }}
        src={url}
      />
    </div>
  );
}
