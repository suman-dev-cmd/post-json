import { createSlice, PayloadAction, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../../store';
import axios from 'axios';
type PostState = "LOADING" | "READY" | "ERROR";
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
export interface ShowPost {
    postsitem: Post[];
    postState: PostState,
    errorMessage: string
}
const initialState: ShowPost = {
    postsitem: [],
    postState: 'READY',
    errorMessage: ''
};
export const getPosts = createAsyncThunk<Post[], undefined, { state: RootState }>('getposts', async (_, thunkAPI) => {

    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    
    // inside of ** data kept result chats data
    return response.data
})
export const addPosts = createAsyncThunk<Post, {data:Post}, { state: RootState }>('addposts', async ({data}) => {
    
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data)
    
    // inside of ** data kept result chats data
    return response.data
 
    
})
export const updatePosts = createAsyncThunk<Post, {data:Post}, { state: RootState }>('updateposts', async ({data}) => {

    const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, data)

    // inside of ** data kept result chats data
    return response.data
})
export const deletePosts = createAsyncThunk<Post, {id:number}, { state: RootState }>('deleteposts', async ({ id }) => {

    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)

    // inside of ** data kept result chats data
    return response.data
})
const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {},
    extraReducers: 
    function (builder) {
        builder.addCase(getPosts.pending, (state, action) => {
            state.postState = 'LOADING';
        });
        builder.addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
            state.postsitem = action.payload

        });
        builder.addCase(addPosts.fulfilled, (state, action: PayloadAction<Post>) => {
            const posts = action.payload;
            if(posts){
                state.postsitem=[...state.postsitem,posts]
            }

        });
        builder.addCase(updatePosts.fulfilled, (state, action: PayloadAction<{id:number}>) => {
            const index = state.postsitem.findIndex(p => p.id === action.payload.id);
            state.postsitem[index] = {
                ...state.postsitem[index],
                ...action.payload,
            };


        });
        builder.addCase(deletePosts.fulfilled, (state, action: PayloadAction<{id:number}>) => {

            let index = state.postsitem.findIndex(({ id }) => id === action.payload.id);
            state.postsitem.splice(index, 1);
        });
        builder.addCase(getPosts.rejected, (state, action) => {
            state.postState = 'ERROR';
            state.errorMessage = action.error.message || "";
        })
    }

});


export default postSlice.reducer;