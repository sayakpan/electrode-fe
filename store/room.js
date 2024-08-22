import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const currentRoomState = atom({
    key: 'currentRoom',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const roomStatusState = atom({
    key: 'roomStatus',
    default: 'no_room',
    effects_UNSTABLE: [persistAtom],
});