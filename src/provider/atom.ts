import { atom } from "jotai";
import { IUser } from "../types/user";

export const userAtom = atom<IUser|null>(null)