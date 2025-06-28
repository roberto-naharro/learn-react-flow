import '@xyflow/react/dist/style.css';

import { FlowCanvas, useFlowState } from '../layer-manager';

const LayerManagerPage = () => {
  const { nodes, edges, nodeName, setNodeName, onNodesChange, onEdgesChange, onConnect, addNode } =
    useFlowState();

  return (
    <FlowCanvas
      nodes={nodes}
      edges={edges}
      nodeName={nodeName}
      setNodeName={setNodeName}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      addNode={addNode}
    />
  );
};

export default LayerManagerPage;
