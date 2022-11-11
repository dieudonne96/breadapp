import { atom } from "jotai";
import type { IUser } from "../types/user";

export const userAtom = atom<IUser|null>(null)