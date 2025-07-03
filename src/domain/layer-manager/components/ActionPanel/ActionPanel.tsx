import { Panel } from '@xyflow/react';

import { usePersistenceContext } from '@domain-layer-manager/hooks/usePersistenceContext';

import { useRouter } from '@router/hooks';

import { actionPanelStyles } from './ActionPanel.styles';

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
    <Panel position="top-right" aria-label="Action Panel">
      <div style={styles.container} aria-label="Diagram actions">
        <StyledButton onClick={saveFlowState} aria-label="Save diagram state">
          Save
        </StyledButton>
        <StyledButton onClick={restoreFlowState} aria-label="Restore diagram state">
          Restore
        </StyledButton>
        <StyledButton onClick={resetFlowState} aria-label="Reset diagram">
          Reset Diagram
        </StyledButton>
        <StyledButton onClick={() => navigate('map')} aria-label="Show map">
          Show Map
        </StyledButton>
      </div>
    </Panel>
  );
};
