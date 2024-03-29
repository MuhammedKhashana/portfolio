import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const callSkillsAPI = createAsyncThunk('skills/callSkillsAPI', async () => {
    const res = await Axios.get('https://portfolio-data-mb9v.onrender.com/skills')
    const data = await res.data
    return data
})

export const deleteSkillAsync = createAsyncThunk(
    'skills/deleteSkillAsync',
    async (id) => {
        await Axios.delete(`https://portfolio-data-mb9v.onrender.com/skills/${id}`);
        return id;
    }
);

export const addSkillAsync = createAsyncThunk(
    'skills/addSkillAsync',
    async ({ icon }) => {
        const res = await Axios.post(`https://portfolio-data-mb9v.onrender.com/skills`,
            {
                icon
            });
        return res.data
    }
);

export const editSkillAsync = createAsyncThunk(
    'skills/editSkillAsync',
    async ({ id, icon }) => {
        const res = await Axios.put(`https://portfolio-data-mb9v.onrender.com/skills/${id}`,
            {
                icon
            });
        return res.data
    }
);

export const skillsSlice = createSlice({
    initialState: [],
    name: 'skills',
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addCase(callSkillsAPI.fulfilled, (state, action) => {
                    return action.payload
                })
                .addCase(deleteSkillAsync.fulfilled, (state, action) => {
                    return state.filter(edu => edu.id !== action.payload)
                })
                .addCase(editSkillAsync.fulfilled, (state, action) => {
                    // ADD ACTION THAT TELL YOU U ARE DONE
                })
                .addCase(addSkillAsync.fulfilled, (state, action) => {
                    // ADD ACTION THAT TELL YOU U ARE DONE
                })
        }
})

// export const {} = servicesSlice.actions
export default skillsSlice.reducer