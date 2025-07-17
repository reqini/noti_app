import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../../utils/styles';

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginVertical: spacing.sm,
    ...shadows.small,
  },
}); 