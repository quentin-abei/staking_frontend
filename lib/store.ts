import { atom } from 'jotai';

// this atom will help total staked to know when it needs to refetch data
export const stakeUpdateAtom = atom(0);
