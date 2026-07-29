import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export type AuthMode =
  | "login"
  | "signup"
  | "forgot-password"
  | "forgot-password-sent";

export interface UiState {
  authDialogOpen: boolean;
  authMode: AuthMode;
}

const initialState: UiState = {
  authDialogOpen: false,
  authMode: "login",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAuthDialog: (state, action: PayloadAction<AuthMode | undefined>) => {
      state.authDialogOpen = true;
      state.authMode = action.payload ?? "login";
    },
    closeAuthDialog: (state) => {
      state.authDialogOpen = false;
      state.authMode = "login";
    },
    setAuthMode: (state, action: PayloadAction<AuthMode>) => {
      state.authMode = action.payload;
    },
  },
});

export const { openAuthDialog, closeAuthDialog, setAuthMode } =
  uiSlice.actions;

export const selectAuthDialog = (state: RootState) => state.ui;

export default uiSlice.reducer;