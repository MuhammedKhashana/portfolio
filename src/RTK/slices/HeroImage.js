import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const callHeroImageAPI = createAsyncThunk('heroImageSlice/callHeroImageAPI', async () => {
    // const res = await Axios.get('http://localhost:1001/hero-image')
    const res = await Axios.get('https://portfolio-data-mb9v.onrender.com/hero-image')
    const data = await res.data
    return data
})

export const editHeroImageAsync = createAsyncThunk(
    'heroImageSlice/editHeroImageAsync',
    async ({ id, imageLink }) => {
        const res = await Axios.put(`https://portfolio-data-mb9v.onrender.com/hero-image/${id}`,
            {
                imageLink
            });
        return res.data
    }
);

export const heroImageSlice = createSlice({
    initialState: [],
    name: 'heroImage',
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addCase(callHeroImageAPI.fulfilled, (state, action) => {
                    return action.payload
                })
                .addCase(editHeroImageAsync.fulfilled, (state, action) => {
                    // ADD ACTION THAT TELL YOU U ARE DONE
                })
        }
})

// export const {} = servicesSlice.actions
export default heroImageSlice.reducer