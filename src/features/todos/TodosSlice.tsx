/*eslint-disable*/

import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../types/Todo';

const savedTodos = localStorage.getItem('todos');
let initialTodos = savedTodos ? JSON.parse(savedTodos) : [];

export interface TodosState {
  todos: Todo[];
  editedTodo: Todo | null;
  todoStatus: string;
  isClicked: string;
}

const initialState: TodosState = {
  todos: initialTodos,
  editedTodo: null,
  todoStatus: '',
  isClicked: '',
};

const TodosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    },
    removeTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo.id !== action.payload;
        }),
      };
    },
    removeAllTodos: (state) => {
      return {
        ...state,
        todos: [],
      };
    },
    setCompletedTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo,
        ),
      };
    },
    toggleAllTodos: (state) => {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          !todo.completed
            ? {
                ...todo,
                completed: true,
              }
            : state.todos.every((todo) => todo.completed)
              ? {
                  ...todo,
                  completed: false,
                }
              : todo,
        ),
      };
    },
    editTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };
    },
    onEditedTodo: (state, action) => {
      return {
        ...state,
        editedTodo: action.payload,
      };
    },
    setTodoStatus: (state, action) => {
      return {
        ...state,
        todoStatus: action.payload,
      };
    },
    setIsClicked: (state, action) => {
      return {
        ...state,
        isClicked: action.payload,
      };
    },
  },
});

export default TodosSlice.reducer;
export const { actions } = TodosSlice;
