import { FlowCanvas } from '../../components/FlowCanvas/FlowCanvas';
import { DragAndDropProvider } from '../../providers/DragAndDropProvider';

const LayerManagerPage = () => {
  return (
    <DragAndDropProvider>
      <FlowCanvas />
    </DragAndDropProvider>
  );
};

export default LayerManagerPage;
