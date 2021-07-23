import {
  CancelStep,
  DelayStep,
  FetchDataStep,
  InvokeStep,
  SendListStep,
  SendStep,
  UpdateProfileStep,
} from "./steps";

/**
 * Visitor Interface
 *  - declares a set of visiting methods that correspond to component classes.
 *  - The signature of a visiting method allows the visitor to identify the exact class of the component that it's dealing with.
 */
export interface Command {
  cancel(step: CancelStep): void;
  delay(step: DelayStep): void;
  fetchData(step: FetchDataStep): void;
  invoke(step: InvokeStep): void;
  send(step: SendStep): void;
  sendList(step: SendListStep): void;
  updateProfile(step: UpdateProfileStep): void;
}

export class StepCommand implements Command {
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
