import { buttonStyles } from '../../../../shared/styles/buttons';
import { formStyles } from '../../../../shared/styles/forms';
import { panelStyles } from '../../../../shared/styles/panels';
import { createStyles } from '../../../../shared/styles/theme';
import { typographyStyles } from '../../../../shared/styles/typography';

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
    marginBottom: theme.spacing.md,
  },
  input: {
    ...formStyles.input,
  },
  button: {
    ...buttonStyles.base,
    ...buttonStyles.primary,
  },
  paletteContainer: {
    marginBottom: theme.spacing.md,
  },
  instructions: {
    ...typographyStyles.instructions,
  },
}));
