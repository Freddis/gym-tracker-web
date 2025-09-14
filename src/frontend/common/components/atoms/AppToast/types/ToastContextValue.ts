export interface ToastContextValue {
  addWarning(text: string): void;
  addInfo(text: string): void;
  addDanger(text: string): void;
  addSuccess(text: string): void;
}
