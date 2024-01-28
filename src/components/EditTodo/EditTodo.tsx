import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { actions } from '../../features/todos/TodosSlice';
import { Todo } from '../../types/Todo';
import styles from './EditTodo.module.scss';

type Props = {
  todo: Todo;
};

const EditTodo: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const inputFocus = useRef<HTMLTextAreaElement | null>(null);
  const error = useRef(false);

  const [query, setQuery] = useState(todo.title);

  useEffect(() => {
    const textarea = document.querySelector('textarea');

    textarea?.addEventListener('keyup', (event: KeyboardEvent) => {
      textarea.style.height = `0px`;
      const symbolsHeight = (event.target as HTMLTextAreaElement)?.scrollHeight;
      textarea.style.height = `${symbolsHeight}px`;
    });

    textarea?.addEventListener('focus', (event: FocusEvent) => {
      textarea.value = textarea.value.replace(/\n/g, '');
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      const symbolsHeight = (event.target as HTMLTextAreaElement)?.scrollHeight;
      textarea.style.height = `${symbolsHeight}px`;
    });

    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);

  const editTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const editedTodo: Todo = {
      ...todo,
      title: query,
    };

    dispatch(actions.editTodo(editedTodo));
    dispatch(actions.onEditedTodo(null));
  };

  const onEnter = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter') {
      editTodo(event);
    }
  };

  if (query.length === 130) {
    error.current = true;
  } else if (query.length < 130) {
    error.current = false;
  }

  return (
    <form className={styles.todo} onSubmit={editTodo}>
      {error.current && <div className={styles.todo__max_length_error}></div>}

      <textarea
        id="text"
        className={styles.todo__edited_field}
        onChange={(event) => setQuery(event.target.value)}
        onBlur={editTodo}
        value={query}
        ref={inputFocus}
        onKeyUp={onEnter}
        maxLength={130}
      />
    </form>
  );
};

export default EditTodo;
