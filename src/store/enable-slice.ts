import { StoreSlice } from './store';


export interface EnableSlice {
  inputEnable: boolean;
  setEnable: (inputEnable: boolean) => void;
}

export const createEnableSlice: StoreSlice<EnableSlice> = (set, get) => ({
  inputEnable:true,
  setEnable: (inputEnable: boolean) => {
    console.log("SET:")
    console.log(inputEnable)
    set((prev: EnableSlice) => ({
      ...prev,
      inputEnable:inputEnable,
    }));
  },
});
