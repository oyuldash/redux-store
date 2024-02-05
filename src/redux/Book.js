import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "Book",
  initialState: {
    data: [],
  },
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      // state.data=[{title:'hello'}]
      console.log(action.payload,state)
  
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase
      (fetchDataAsync.rejected, (state) => {
        console.log("Rejected", state);
      })
      .addCase
      (fetchDataAsync.pending, (state) => {
        console.log("Pending", state);
      })
      .addCase(
        fetchDataAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          console.log("Fulfilled", state);
          state.data = action.payload;
        }
      );
  },
});
export const fetchDataAsync = createAsyncThunk(
  "book/searchAsync",
  async (name) => {
    let dataRaw = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${name}`
    );

    let data = await dataRaw.json();
    return data.items;
  }
);
export const { search } = bookSlice.actions;
export default bookSlice.reducer;
