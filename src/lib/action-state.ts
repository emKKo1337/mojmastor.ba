/** Shared result shape for Server Actions driven by React's useActionState. */
export interface ActionState {
  status: "idle" | "success" | "error";
  message?: string;
}

export const idleState: ActionState = { status: "idle" };
