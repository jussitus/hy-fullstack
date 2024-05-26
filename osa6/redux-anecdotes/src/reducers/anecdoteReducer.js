import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { setNotification } from "./notificationReducer";
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      return state.map((a) => a.id === action.payload.id ? action.payload : a);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const { updateAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const result = await anecdoteService.createAnecdote(content);
    dispatch(addAnecdote(result));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1};
    const result = await anecdoteService.updateAnecdote(updatedAnecdote)
    dispatch(updateAnecdote(result))
  }

}

export default anecdoteSlice.reducer;
