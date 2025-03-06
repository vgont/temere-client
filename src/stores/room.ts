import { atom } from "nanostores";

export const $room = atom<WebSocket | null>(null);

