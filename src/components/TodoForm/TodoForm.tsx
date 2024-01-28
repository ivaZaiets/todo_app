import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions } from '../features/todos/TodosSlice';
import TodoList from '../TodoList/TodoList';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../helpers/TodoStatusEnum';
import { v4 as uuidv4 } from 'uuid';
import styles from './TodoForm.module.scss';

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const { todos, todoStatus } = useAppSelector((state) => state.todos);

  const inputFocus = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);

  localStorage.setItem('todos', JSON.stringify(todos));

  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);

  const addTodos = (event: React.FormEvent) => {
    event.preventDefault();
    setQuery('');

    const maxSymbolsAmount = /^\s*.{0,130}\s*$/;
    if (!maxSymbolsAmount.test(query)) {
      setError(true);
      return;
    }

    const newTodo: Todo = {
      id: uuidv4(),
      title: query,
      completed: false,
    };

    const emptyQueryPattern = /^\s*$/;
    !emptyQueryPattern.test(query) &&
      query &&
      dispatch(actions.addTodo(newTodo));
  };

  let todosCopy = [...todos];

  if (todoStatus === TodoStatus.Completed) {
    todosCopy = todosCopy.filter((todo) => todo.completed);
  } else if (todoStatus === TodoStatus.Active) {
    todosCopy = todosCopy.filter((todo) => !todo.completed);
  } else {
    todosCopy;
  }

  return (
    <div className={styles.container}>
      <div className={styles.todo_form}>
        {error && (
          <div className={styles.todo_form__error}>
            <p className={styles.todo_form__error_message}>
              Max length: 130 characters
            </p>
          </div>
        )}

        <img
          className={styles.todo_form__img}
          src="../../../public/detail-1.png"
          alt="flowers"
        />
        
        <form style={{ zIndex: 1 }} onSubmit={addTodos}>
          <h1 className={styles.todo_form__title}>Master Your Day</h1>
          <input
            type="text"
            className={styles.todo_form__field}
            placeholder="What are your plans?"
            onBlur={() => setError(false)}
            onChange={(event) => {
              setQuery(event.target.value);
              setError(false);
            }}
            value={query}
            ref={inputFocus}
          />
        </form>

        <TodoList todos={todosCopy} />
      </div>
    </div>
  );
};

export default TodoForm;
