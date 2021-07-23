type Action =
  | "cancel"
  | "delay"
  | "fetch-data"
  | "send"
  | "send-list"
  | "invoke"
  | "update-profile";

type CancelSchema = {
  action: "cancel";
  token: string;
};

/**
 * The Component interface declares an `accept` method that should take the base
 * visitor interface as an argument.
 */
interface Step {
  action: Action;
  execute(command: StepCommand): void;
}

class CancelStep implements Step {
  action: "cancel";
  token: string;

  execute(command: StepCommand) {
    command.cancel(this);
  }

  constructor(schema: CancelSchema) {
    this.action = schema.action;
    this.token = schema.token;
  }
}

class DelayStep implements Step {
  action: "delay";

  execute(command: StepCommand) {
    command.delay(this);
  }
}

class FetchDataStep implements Step {
  action: "fetch-data";
  execute(command: StepCommand) {
    command.fetchData(this);
  }
}

class SendStep implements Step {
  action: "send";
  execute(command: StepCommand) {
    command.send(this);
  }
}

class SendListStep implements Step {
  action: "send-list";
  execute(command: StepCommand) {
    command.sendList(this);
  }
}

class InvokeStep implements Step {
  action: "invoke";
  execute(command: StepCommand) {
    command.invoke(this);
  }
}

class UpdateProfileStep implements Step {
  action: "update-profile";
  execute(command: StepCommand) {
    command.updateProfile(this);
  }
}

/**
 * The Visitor Interface declares a set of visiting methods that correspond to
 * component classes. The signature of a visiting method allows the visitor to
 * identify the exact class of the component that it's dealing with.
 */
interface Command {
  cancel(step: CancelStep): void;
  delay(step: DelayStep): void;
  fetchData(step: FetchDataStep): void;
  invoke(step: InvokeStep): void;
  send(step: SendStep): void;
  sendList(step: SendListStep): void;
  updateProfile(step: UpdateProfileStep): void;
}

class StepCommand implements Command {
  cancel(step: CancelStep) {
    // the cancel command
  }
  delay(step: DelayStep) {
    // the delay command
  }
  fetchData(step: FetchDataStep) {
    // the fetch-data command
  }
  invoke(step: InvokeStep) {
    // the invoke command
  }
  send(step: SendStep) {
    // the send command
  }
  sendList(step: SendListStep) {
    // the send-list command
  }
  updateProfile(step: UpdateProfileStep) {
    // the update-profile command
  }
}

const service = (steps: Step[], command: Command) => {
  for (const step of steps) {
    step.execute(command);
  }
};

const command = new StepCommand();

const steps = [
  new CancelStep({ action: "cancel", token: "test" }),
  new DelayStep(),
  new FetchDataStep(),
  new InvokeStep(),
  new SendListStep(),
  new SendStep(),
  new UpdateProfileStep(),
];

service(steps, command);
