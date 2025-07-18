export interface ToastIconProps {
  type: 'error' | 'info' | 'success' | 'warn' | 'loading';
}

export interface ToastMessageProps {
  message: string;
  subMessage?: string;
  type: 'error' | 'info' | 'success' | 'warn' | 'loading';
}

export interface ToastOptions {
  message: string;
  subMessage?: string;
  type?: 'error' | 'info' | 'success' | 'warn' | 'loading';
  options?: object;
  toastId?: string;
}
