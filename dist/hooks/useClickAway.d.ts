import type { BasicTarget } from "../util/domTarget";
export default function useClickAway<T extends Event = Event>(onClickAway: (event: T) => void, target: BasicTarget | BasicTarget[], eventName?: string | string[]): void;
