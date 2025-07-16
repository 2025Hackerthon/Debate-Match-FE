import { DebateService } from "./debateService";
import { ReactionService } from "./reactionService";
import { SseService } from "./sseService";
import { UserService } from "./userService";

export const debateService = new DebateService();
export const reactionService = new ReactionService();
export const sseService = new SseService();
export const userService = new UserService();
