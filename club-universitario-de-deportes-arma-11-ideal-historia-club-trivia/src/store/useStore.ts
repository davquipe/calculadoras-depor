import create from 'zustand';

export interface FormValues {
  "entry.1469072389": string;
  "entry.1044544954": string;
  "entry.44380923": string;
  "entry.614685073": string;
  "entry.713507181": string;
  "entry.1337238517": string;
  "entry.602000525": string;
  "entry.1641758152": string;
  "entry.1762750381": string;
  "entry.102149249": string;
  "entry.1362723749": string;
  "entry.674249644": string;
}

interface StoreState {
  formValues: FormValues;
  setFormValue: (key: keyof FormValues, value: string) => void;
}

const useStore = create<StoreState>((set) => ({
  formValues: {
    "entry.1469072389": '',
    "entry.1044544954": '',
    "entry.44380923": '',
    "entry.614685073": '',
    "entry.713507181": '',
    "entry.1337238517": '',
    "entry.602000525": '',
    "entry.1641758152": '',
    "entry.1762750381": '',
    "entry.102149249": '',
    "entry.1362723749": '',
    "entry.674249644": '',
  },
  setFormValue: (key, value) => set((state) => ({
    formValues: {
      ...state.formValues,
      [key]: value,
    },
  })),
}));

export default useStore;
