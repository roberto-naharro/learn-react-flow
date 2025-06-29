import { FlowCanvas } from '../../components/FlowCanvas/FlowCanvas';
import { DragAndDropProvider } from '../../providers/DragAndDropProvider';
import { EdgesProvider } from '../../providers/EdgesProvider';
import { NodesProvider } from '../../providers/NodesProvider';
import { PersistenceProvider } from '../../providers/PersistenceProvider';

const LayerManagerPage = () => {
  return (
    <DragAndDropProvider>
      <NodesProvider>
        <EdgesProvider>
          <PersistenceProvider>
            <FlowCanvas />
          </PersistenceProvider>
        </EdgesProvider>
      </NodesProvider>
    </DragAndDropProvider>
  );
};

export default LayerManagerPage;
