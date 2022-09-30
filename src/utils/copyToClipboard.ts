type Callbacks = Partial<{
  onSuccess: (text: string) => void;
  onFailed: () => void;
  onNotSupported: () => void;
}>;

export const copyToClipboard = async (text: string, callbacks?: Callbacks) => {
  if (!navigator.clipboard) {
    callbacks?.onNotSupported?.();
  }

  try {
    await navigator.clipboard.writeText(text);
    callbacks?.onSuccess?.(text);
  } catch (error) {
    callbacks?.onFailed?.();
  }
};
