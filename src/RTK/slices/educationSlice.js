import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'



export const callEduAPI = createAsyncThunk('education/callEduAPI', async () => {
    // const res = await Axios.get('http://localhost:1001/education')
    const res = await Axios.get('https://portfolio-data-mb9v.onrender.com/education')
    const data = await res.data
    return data
})

export const deleteEduAsync = createAsyncThunk(
    'education/deleteEduAsync',
    async (id) => {
        await Axios.delete(`https://portfolio-data-mb9v.onrender.com/education/${id}`);
        return id;
    }
);

export const addEduAsync = createAsyncThunk(
    'education/addEduAsync',
    async ({ startDate, endDate, title, desc }) => {
        const res = await Axios.post(`https://portfolio-data-mb9v.onrender.com/education`,
            {
                startDate,
                endDate,
                title,
                desc
            });
        return res.data
    }
);

export const editEduAsync = createAsyncThunk(
    'education/editEduAsync',
    async ({ id, startDate, endDate, title, desc }) => {
        const res = await Axios.put(`https://portfolio-data-mb9v.onrender.com/education/${id}`,
            {
                startDate,
                endDate,
                title,
                desc
            });
        return res.data
    }
);


export const educationSlice = createSlice({
    initialState: [],
    name: 'education',
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addCase(callEduAPI.fulfilled, (state, action) => {
                    return action.payload
                })
                .addCase(deleteEduAsync.fulfilled, (state, action) => {
                    return state.filter(edu => edu.id !== action.payload)
                })
                .addCase(editEduAsync.fulfilled, (state, action) => {
                    // ADD ACTION THAT TELL YOU U ARE DONE
                })
                .addCase(addEduAsync.fulfilled, (state, action) => {
                    // ADD ACTION THAT TELL YOU U ARE DONE
                })
        }
})

export default educationSlice.reducer