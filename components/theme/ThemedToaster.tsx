'use client';

import { Toaster } from 'sonner';
import { useTheme } from './ThemeProvider';

/** sonner follows our theme instead of its own "system" detection. */
export function ThemedToaster(): React.JSX.Element {
  return <Toaster theme={useTheme().theme} position="top-right" richColors closeButton />;
}