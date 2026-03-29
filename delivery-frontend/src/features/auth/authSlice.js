import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, registerService, getProfileService } from "./authService";

//  LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginService(data);
      localStorage.setItem("token", res.token);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

//  REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await registerService(data);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// 👤 PROFILE
export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkAPI) => {
    try {
      const res = await getProfileService();
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
    fieldErrors: {}, 
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user=action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
       const MsgError=action.payload?.error || "login field";
       if(MsgError.includes("email")){
        state.fieldErrors.email=MsgError;
       }else if(MsgError.includes("password")){
        state.fieldErrors.password=MsgError;
       }else{
        state.error=MsgError;
       }
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        const errorMsg = action.payload?.error || "Registration failed";

       
        if (errorMsg.includes("vehicleType")) {
          state.fieldErrors.vehicleType = errorMsg;
        } else if (errorMsg.includes("licenseNumber")) {
          state.fieldErrors.licenseNumber = errorMsg;
        } else if (errorMsg.includes("phone")) {
          state.fieldErrors.phone = errorMsg;
        } else {
          state.error = errorMsg; // رسالة عامة لو مش مرتبطة بفيلد محدد
        }
      })

      // PROFILE
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;