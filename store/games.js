import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const gameProfilesState = atom({
    key: 'gameProfiles',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const selectedGameState = atom({
    key: 'selectedGame',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const selectedGameAllDataState = atom({
    key: 'selectedGameAllData',
    default: null,
    effects_UNSTABLE: [persistAtom],
});