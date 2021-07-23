import { Command, StepCommand } from "../types/commands";
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

const command = new StepCommand();

const steps = [
  new CancelStep({ action: "cancel", token: "test" }),
  new DelayStep({ action: "delay", duration: "test" }),
  new FetchDataStep(),
  new InvokeStep(),
  new SendListStep(),
  new SendStep(),
  new UpdateProfileStep(),
];

export const StepService = (steps: Step[], command: Command) => {
  for (const step of steps) {
    step.execute(command);
  }
};

StepService(steps, command);
