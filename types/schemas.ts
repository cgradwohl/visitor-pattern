export interface Schema {
  [x: string]: any;
}

export interface CancelSchema extends Schema {
  action: "cancel";
  token: string;
}

export interface DelaySchema extends Schema {
  action: "delay";
  duration: string;
}
