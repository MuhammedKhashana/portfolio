import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const callProjectsAPI = createAsyncThunk('projects/callProjectsAPI', async () => {
    // const res = await Axios.get('http://localhost:1001/projects')
    const res = await Axios.get('https://portfolio-data-mb9v.onrender.com/projects')
    const data = await res.data
    return data
})

export const deleteProjectAsync = createAsyncThunk(
    'projects/deleteProjectAsync',
    async (id) => {
        await Axios.delete(`https://portfolio-data-mb9v.onrender.com/projects/${id}`);
        return id;
    }
);

export const addProjectAsync = createAsyncThunk(
    'projects/addProjectAsync',
    async ({ title, desc, image, link }) => {
        const res = await Axios.post(`https://portfolio-data-mb9v.onrender.com/projects`,
            {
                title,
                desc,
                image,
                link
            });
        return res.data
    }
);

export const editProjectAsync = createAsyncThunk(
    'projects/editProjectAsync',
    async ({ id, title, desc, image, link }) => {
        const res = await Axios.put(`https://portfolio-data-mb9v.onrender.com/projects/${id}`,
            {
                title,
                desc,
                image,
                link
            });
        return res.data
    }
);

export const projectsSlice = createSlice({
    initialState: [],
    name: 'projects',
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addCase(callProjectsAPI.fulfilled, (state, action) => {
                    return action.payload
                })
                .addCase(deleteProjectAsync.fulfilled, (state, action) => {
                    return state.filter(project => project.id !== action.payload)
                })
                .addCase(editProjectAsync.fulfilled, (state, action) => {
                    // ADD ACTION THAT TELL YOU U ARE DONE
                })
                .addCase(addProjectAsync.fulfilled, (state, action) => {
                    // ADD ACTION THAT TELL YOU U ARE DONE
                })
        }
})

export default projectsSlice.reducer