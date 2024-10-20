import { create } from "zustand";
import { devtools } from "zustand/middleware";
import authSlice from "./slices/authSlice";
import assistanceSlice from "./slices/assistanceSlice";

const useStore = create(
  devtools((set, get) => {
    return {
      ...authSlice(set, get),
      ...assistanceSlice(set, get),
    };
  })
);

useStore.getState().getUser();

export default useStore;
