import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportState {
  history: any[];
  stillHistory: any;
  loading: boolean;
}

const initialState: ReportState = {
  history: [],
  stillHistory: {},
  loading: false,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setHistoryData(state, action: PayloadAction<{ items: any[], pagination: any }>) {
      state.history = action.payload.items;
      state.stillHistory = action.payload.pagination;
    },
  },
});

export const { setLoading, setHistoryData } = reportsSlice.actions;
export default reportsSlice.reducer;
