import { validCancelSchema, validDelaySchema } from "../lib/step-validators";
import { StepCommand } from "./commands";
import { RunContext } from "./context";
import { CancelSchema, DelaySchema } from "./schemas";

export type Action =
  | "cancel"
  | "delay"
  | "fetch-data"
  | "send"
  | "send-list"
  | "invoke"
  | "update-profile";

/**
 * Component Interface
 *  - declares an `accept` method that should take the base visitor interface as an argument.
 */
export interface Step {
  action: Action;
  execute(command: StepCommand, context: RunContext): void;
}

export class CancelStep implements Step {
  action: "cancel";
  token: string;

  execute(command: StepCommand, context: RunContext) {
    command.cancel(this);
  }

  constructor(schema: CancelSchema) {
    if (!validCancelSchema(schema)) {
      throw new Error("Invalid Cancel Schema.");
    }

    this.action = schema.action;
    this.token = schema.token;
  }
}

export class DelayStep implements Step {
  action: "delay";
  duration: string;

  constructor(schema: DelaySchema) {
    if (!validDelaySchema(schema)) {
      throw new Error("Invalid Cancel Schema.");
    }

    this.action = schema.action;
    this.duration = schema.duration;
  }

  execute(command: StepCommand, context: RunContext) {
    command.delay(this);
  }
}

export class FetchDataStep implements Step {
  action: "fetch-data";
  execute(command: StepCommand) {
    command.fetchData(this);
  }
}

export class SendStep implements Step {
  action: "send";
  execute(command: StepCommand) {
    command.send(this);
  }
}

export class SendListStep implements Step {
  action: "send-list";
  execute(command: StepCommand) {
    command.sendList(this);
  }
}

export class InvokeStep implements Step {
  action: "invoke";
  execute(command: StepCommand) {
    command.invoke(this);
  }
}

export class UpdateProfileStep implements Step {
  action: "update-profile";
  execute(command: StepCommand) {
    command.updateProfile(this);
  }
}
