import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const callAboutUAPI = createAsyncThunk('aboutU/callAboutUAPI', async () => {
    // const res = await Axios.get('http://localhost:1001/about-u')
    const res = await Axios.get('https://portfolio-data-mb9v.onrender.com/about-u')
    const data = await res.data
    return data
})

export const editAboutUAsync = createAsyncThunk(
    'aboutU/editAboutUAsync',
    async ({ id, name, career, personalImg, profileImg, aboutu }) => {
        const res = await Axios.put(`https://portfolio-data-mb9v.onrender.com/about-u/${id}`,
            {
                name,
                career,
                personalImg,
                profileImg,
                aboutu
            });
        return res.data
    }
);

export const aboutUSlice = createSlice({
    initialState: [],
    name: 'aboutU',
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addCase(callAboutUAPI.fulfilled, (state, action) => {
                    return action.payload
                })
                .addCase(editAboutUAsync.fulfilled, (state, action) => {
                    // ADD ACTION THAT TELL YOU U ARE DONE
                })
        }
})

// export const {} = servicesSlice.actions
export default aboutUSlice.reducer