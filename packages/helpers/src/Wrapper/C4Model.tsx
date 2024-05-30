/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import plantumlEncoder from 'plantuml-encoder';

export function C4ModelWrapper({
  model = '',
  width = '100%',
  height = 'auto',
}: {
  model: string;
  width: number | string;
  height: number | string;
}) {
  const encoded = plantumlEncoder.encode(`
  @startuml C4_Elements
  !include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml
  ${model}
  @enduml
  `);

  const url = 'http://www.plantuml.com/plantuml/svg/' + encoded;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
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
