import * as React from "react";
import { Program } from "raj";

export interface CreateApp<P, S, M> {
  (props: P): ReactProgram<S, M>;
}

export function program<P, S, M>(
  component: React.ComponentType<P>,
  createApp: CreateApp<P, S, M>
): React.ReactType<P>;

export type ReactProgram<S, M> = Program<S, M, React.ReactNode>;
