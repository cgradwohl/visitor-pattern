export interface RunContext {
  brand?: string;
  data?: any;
  profile?: any;
  template?: string;
  recipient?: string;
}

export interface StepContext {
  error?: {
    message: string;
  };
}

export interface DelayContext extends StepContext {
  expectedDelayValue?: string;
  actualDelayValue?: string;
}

export interface SendContext extends StepContext {
  messageId: string;
}

export interface SendListContext extends StepContext {
  messageId: string;
}

export interface InvokeContext extends StepContext {
  runId: string;
}

export type CancelContext = StepContext

export type FetchDataContext = StepContext

export type UpdateProfileContext = StepContext
