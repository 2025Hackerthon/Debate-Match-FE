import { DebateService } from "./debateService";
import { ReactionService } from "./reactionService";
import { SseService } from "./sseService";
import { UserService } from "./userService";

const debateService = new DebateService();
const reactionService = new ReactionService();
const sseService = new SseService();
const userService = new UserService();

export const services = {
  debateService,
  reactionService,
  sseService,
  userService
};
