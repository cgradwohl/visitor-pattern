export interface StepSchema {
  [key: string]: any;
  if?: string;
  ref?: string;
}

export interface CancelSchema extends StepSchema {
  action: "cancel";
  token: string;
}

export interface DelaySchema extends StepSchema {
  action: "delay";
  duration: string;
}
