import { StepCommand } from "../types/commands";
import { RunContext } from "../types/context";
import {
  CancelStep,
  DelayStep,
  FetchDataStep,
  InvokeStep,
  SendListStep,
  SendStep,
  Step,
  UpdateProfileStep,
} from "../types/steps";

const steps = [
  new CancelStep({ action: "cancel", token: "test" }),
  new DelayStep({ action: "delay", duration: "test" }),
  new FetchDataStep(),
  new InvokeStep(),
  new SendListStep(),
  new SendStep(),
  new UpdateProfileStep(),
];

const command = new StepCommand();

const context: RunContext = {};

export const InvokeRun = (
  steps: Step[],
  command: StepCommand,
  runContext: RunContext
) => {
  for (const step of steps) {
    step.execute(command, runContext);
  }
};

InvokeRun(steps, command, context);
