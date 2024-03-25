import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'manageAccount',
  initialState: {
  },
  reducers: {
    save: (state, action) => {
      console.log("save:", action.payload)
      Object.assign(state, action.payload);
    },
    updateAvatar: (state, action) => {
      console.log("updateAvatar:", action.payload)
      Object.assign(state, action.payload);
    }
  },
});

export const { save, updateAvatar } = accountSlice.actions;
export default accountSlice.reducer;
