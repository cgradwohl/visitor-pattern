import Ajv from "ajv";
import { CancelSchema, DelaySchema } from "../types/schemas";

const ajv = new Ajv();

const cancelSchema = {
  additionalProperties: true,
  type: "object",
  properties: {
    action: { enum: ["cancel"] },
    token: { type: "string", minLength: 1 },
  },
  required: ["action", "token"],
};

const delaySchema = {
  additionalProperties: true,
  type: "object",
  properties: {
    action: { enum: ["delay"] },
    duration: { type: "string", minLength: 1 },
  },
  required: ["action", "duration"],
};

export const validCancelSchema = ajv.compile<CancelSchema>(cancelSchema);
export const validDelaySchema = ajv.compile<DelaySchema>(delaySchema);
