import { v4 as uuid } from "uuid";

import { validCancelSchema, validDelaySchema } from "../lib/step-validators";
import { StepCommand } from "./commands";
import { RunContext, StepContext } from "./context";
import { CancelSchema, DelaySchema, Schema } from "./schemas";

export type Action =
  | "cancel"
  | "delay"
  | "fetch-data"
  | "send"
  | "send-list"
  | "invoke"
  | "update-profile";

export enum StepStatus {
  processed = "PROCESSED",
  error = "ERROR",
  skipped = "SKIPPED",
  processing = "PROCESSING",
  notProcessed = "NOT PROCESSED",
  waiting = "WAITING",
}

/**
 * Component Interface
 *  - declares an `accept` method that should take the base visitor interface as an argument.
 */
export abstract class Step {
  // maybe context should not be on the Step
  public context?: StepContext;

  // next and prev need to be immutable
  public nextStepId?: string;
  public prevStepId?: string;

  // status need to be immutable, maybe should not be on the step
  public status: StepStatus;

  readonly created: string;
  readonly runId: string;
  readonly stepId: string;
  readonly tenantId: string;
  readonly updated: string;

  abstract execute(command: StepCommand, context: RunContext): void;

  // abstract get context();
  // abstract set context(value: Record<string, any>);

  constructor() {
    // processing data
    this.created = new Date().toISOString();
    this.context = {};
    this.runId = uuid();
    this.stepId = uuid();
    this.status = StepStatus.processing;
    // this.tenantId  string;
    this.updated = new Date().toISOString();
  }
}

/**
 * NOTE:
 * The purpose of these steps is to
 *  - clearly define a public facing schema
 *  - optimize step processing
 *  - simplify an interface between the service and its data structure (this)
 */
export class CancelStep extends Step {
  execute(command: StepCommand, context: RunContext) {
    command.cancel(this);
  }

  constructor(schema: CancelSchema) {
    if (!validCancelSchema(schema)) {
      throw new Error("Invalid Cancel Schema.");
    }

    // factory
    super();

    Object.assign(this, schema);
  }

  // get context() {};
  // set context(value: Record<string, any>) {};
}

const step = new CancelStep({ action: "cancel", token: "test", if: "foo" });
console.log("step.token", step.context);

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
