export { VALIDATE_PROMPT } from "./validate";
export { CANVAS_PROMPT } from "./canvas";
export { PITCH_PROMPT } from "./pitch";
export { MARKET_PROMPT } from "./market";

import type { ToolId } from "@/types";
import { VALIDATE_PROMPT } from "./validate";
import { CANVAS_PROMPT } from "./canvas";
import { PITCH_PROMPT } from "./pitch";
import { MARKET_PROMPT } from "./market";

/** Map tool IDs to their system prompts. */
export const toolPrompts: Record<ToolId, string> = {
  validate: VALIDATE_PROMPT,
  canvas: CANVAS_PROMPT,
  pitch: PITCH_PROMPT,
  market: MARKET_PROMPT,
};
