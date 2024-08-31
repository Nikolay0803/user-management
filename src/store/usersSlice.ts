import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  users: [],
  filters: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
  status: "idle",
};

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await axios.get("http://localhost:5000/users");
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ key: keyof UsersState["filters"]; value: string }>
    ) => {
      state.filters[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setFilter } = usersSlice.actions;
export default usersSlice.reducer;
