import { Panel } from '@xyflow/react';

import { actionPanelStyles } from './ActionPanel.styles';
import { useRouter } from '../../../router/hooks';
import { usePersistenceContext } from '../../hooks/usePersistenceContext';

type StyledButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
const StyledButton = ({ ...props }: StyledButtonProps) => {
  const styles = actionPanelStyles;

  return (
    <button {...props} style={styles.button}>
      {props.children}
    </button>
  );
};

export const ActionPanel = () => {
  const { saveFlowState, restoreFlowState, resetFlowState } = usePersistenceContext();
  const { navigate } = useRouter();

  const styles = actionPanelStyles;

  return (
    <Panel position="top-right">
      <div style={styles.container}>
        <StyledButton onClick={saveFlowState}>Save</StyledButton>
        <StyledButton onClick={restoreFlowState}>Restore</StyledButton>
        <StyledButton onClick={resetFlowState}>Reset Diagram</StyledButton>
        <StyledButton onClick={() => navigate('map')}>Show Map</StyledButton>
      </div>
    </Panel>
  );
};
