import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom({
    key: 'userState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const profileState = atom({
    key: 'profileState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});