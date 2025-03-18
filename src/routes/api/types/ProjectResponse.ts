export interface ProjectResponse {
  data: {
    project: {
      id: number,
      name: string,
      description: string | null,
      componentTypes: {
        id: number,
        label: string,
        joints: {
          id: number,
          label: string,
          type: 'input' | 'output'
        }[]
      }[]
      components: {
        type: number,
        x: number,
        y: number,
      }[]
      connections: {
        id: number,
        inputX: number,
        inputY: number,
        inputComponentId: number | null,
        inputJointId: number | null,
        inputConnectorId: number | null,
        inputConnectorPosition: number | null,
        outputX: number,
        outputY: number,
        outputComponentId: number | null,
        outputJointId: number | null,
        outputConnectorId: number | null,
        outputConnectorPosition: number | null,
      }[]
    }
  }
}
