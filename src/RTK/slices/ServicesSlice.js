import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'


export const callServicesAPI = createAsyncThunk('services/callServicesAPI', async () => {
    const res = await Axios.get('https://portfolio-data-mb9v.onrender.com/services')
    // const res = await Axios.get('https://portfolio-three-brown-50.vercel.app/home/services/')
    const data = await res.data
    return data
})

export const deleteServiceAsync = createAsyncThunk(
    'services/deleteServiceAsync',
    async (id) => {
        await Axios.delete(`https://portfolio-data-mb9v.onrender.com/services/${id}`);
        return id;
    }
);

export const addServiceAsync = createAsyncThunk(
    'services/addServiceAsync',
    async ({ title, desc, icon }) => {
        const res = await Axios.post(`https://portfolio-data-mb9v.onrender.com/services`,
            {
                title,
                desc,
                icon
            });
        return res.data
    }
);

export const editServiceAsync = createAsyncThunk(
    'services/editServiceAsync',
    async ({ id, title, desc, icon }) => {
        const res = await Axios.put(`https://portfolio-data-mb9v.onrender.com/services/${id}`,
            {
                title,
                desc,
                icon
            });
        return res.data
    }
);

export const servicesSlice = createSlice({
    initialState: [],
    name: 'services',
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addCase(callServicesAPI.fulfilled, (state, action) => {
                    return action.payload
                })
                .addCase(deleteServiceAsync.fulfilled, (state, action) => {
                    return state.filter(service => service.id !== action.payload)
                })
                .addCase(editServiceAsync.fulfilled, (state, action) => {
                    // ADD ACTION THAT TELL YOU U ARE DONE
                })
                .addCase(addServiceAsync.fulfilled, (state, action) => {
                    // ADD ACTION THAT TELL YOU U ARE DONE
                })
        }
})

// export const { } = servicesSlice.actions
export default servicesSlice.reducer