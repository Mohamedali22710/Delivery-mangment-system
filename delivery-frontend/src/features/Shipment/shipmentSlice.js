// features/shipments/shipmentSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as shipmentService from "../../services/shipmentService";

// GET ALL
export const fetchShipments = createAsyncThunk(
  "shipments/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await shipmentService.getAllShipments();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// CREATE
export const addShipment = createAsyncThunk(
  "shipments/create",
  async (data, thunkAPI) => {
    try {
      return await shipmentService.createShipment(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// ASSIGN
export const assignShipmentToDriver = createAsyncThunk(
  "shipments/assign",
  async ({ shipmentId, driverId }, thunkAPI) => {
    try {
      return await shipmentService.assignShipment(shipmentId, driverId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// UPDATE STATUS
export const updateShipment = createAsyncThunk(
  "shipments/updateStatus",
  async ({ shipmentId, status }, thunkAPI) => {
    try {
      return await shipmentService.updateShipmentStatus(
        shipmentId,
        status
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const shipmentSlice = createSlice({
  name: "shipments",
  initialState: {
    shipments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(addShipment.fulfilled, (state, action) => {
        state.shipments.push(action.payload);
      })

      // ASSIGN
      .addCase(assignShipmentToDriver.fulfilled, (state, action) => {
        const updated = action.payload;
        state.shipments = state.shipments.map((s) =>
          s._id === updated._id ? updated : s
        );
      })

      // UPDATE STATUS
      .addCase(updateShipment.fulfilled, (state, action) => {
        const updated = action.payload;
        state.shipments = state.shipments.map((s) =>
          s._id === updated._id ? updated : s
        );
      });
  },
});

export default shipmentSlice.reducer;