import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const instanceState = atom({
    key: 'instance',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const gameDataState = atom({
    key: 'gameData',
    default: null,
    effects_UNSTABLE: [persistAtom],
});


