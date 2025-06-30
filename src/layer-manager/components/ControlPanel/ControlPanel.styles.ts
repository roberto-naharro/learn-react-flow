import { formStyles } from '../../../styles/forms';
import { panelStyles } from '../../../styles/panels';
import { createStyles } from '../../../styles/theme';
import { typographyStyles } from '../../../styles/typography';

export const controlPanelStyles = createStyles((theme) => ({
  container: {
    ...panelStyles.base,
    ...panelStyles.mediumPadding,
    maxWidth: '300px',
  },
  heading: {
    ...typographyStyles.heading,
  },
  subheading: {
    ...typographyStyles.subheading,
  },
  formContainer: {
    ...formStyles.inputContainer,
    flexDirection: 'column',
    marginBottom: theme.spacing.md,
  },
  input: {
    ...formStyles.input,
  },
  button: {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    border: 'none',
    borderRadius: theme.borderRadius.sm,
    cursor: 'pointer',
    fontSize: theme.fontSize.md,
    fontWeight: 500,
  },
  paletteContainer: {
    marginBottom: theme.spacing.md,
  },
  instructions: {
    ...typographyStyles.instructions,
  },
}));
