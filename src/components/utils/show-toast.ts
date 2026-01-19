import { toast } from 'sonner';

const TOAST_DURATION = 5000;

const TOAST_STYLES = {
  error: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
  },
  success: {
    background: '#22c55d',
    color: 'white',
    border: 'none',
  },
} as const;

export const showToast = {
  error: (message: string) => {
    toast.error('Error', {
      description: message,
      position: 'top-center',
      style: TOAST_STYLES.error,
      duration: TOAST_DURATION,
    });
  },
  success: (message: string) => {
    toast.success('Success', {
      description: message,
      position: 'top-center',
      style: TOAST_STYLES.success,
      duration: TOAST_DURATION,
    });
  },
};
