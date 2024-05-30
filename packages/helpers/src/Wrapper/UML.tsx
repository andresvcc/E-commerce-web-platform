import * as React from 'react'

import plantumlEncoder from 'plantuml-encoder'

type UMLWrapperProps = {
  model:string, 
  width?: string | number, 
  height?: string | number,
  justify?: string
}

export function UMLWrapper({model = '', width = 800, height = 800, justify = 'center'}:UMLWrapperProps) {

  const encoded = plantumlEncoder.encode(`
  @startuml
  ${model}
  @enduml
  `)

  const url = 'http://www.plantuml.com/plantuml/svg/' + encoded

  return (
      <div style={{display: 'flex', justifyContent: justify, alignItems: 'center', width: '100%'}}>
        <img
          style={{
            width: width,
            height: height,
            objectFit: 'contain'
          }}
          src={url}
        />
      </div>
  )
}
