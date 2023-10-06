import { StoreSlice } from './store';


export interface EnableSlice {
  inputEnable: boolean;
  setEnable: (inputEnable: boolean) => void;
}

export const createEnableSlice: StoreSlice<EnableSlice> = (set, get) => ({
  inputEnable:true,
  setEnable: (inputEnable: boolean) => {

    set((prev: EnableSlice) => ({
      ...prev,
      inputEnable:inputEnable,
    }));
  },
});
