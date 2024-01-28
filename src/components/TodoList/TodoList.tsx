import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions } from '../features/todos/TodosSlice';
import EditTodo from '../EditTodo/EditTodo';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import styles from './TodoList.module.scss';

type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const { editedTodo } = useAppSelector((state) => state.todos);

  const toggleCompleted = (todoId: string) => {
    dispatch(actions.setCompletedTodo(todoId));
  };

  const removeTodo = (todoId: string) => {
    dispatch(actions.removeTodo(todoId));
  };

  return (
    <>
      {todos.map((todo) => {
        return (
          <div className={styles.todo}>
            <div
              className={cn(styles.todo__incompleted, {
                [styles.todo__completed]: todo.completed,
              })}
              onClick={() => toggleCompleted(todo.id)}
            ></div>

            {todo.id !== editedTodo?.id ? (
              <p
                className={cn(styles.todo__title, {
                  [styles.todo__title_completed]: todo.completed,
                })}
                onDoubleClick={() => dispatch(actions.onEditedTodo(todo))}
              >
                {todo.title}
              </p>
            ) : (
              <EditTodo todo={todo} />
            )}

            <div
              className={styles.todo__remove_btn}
              onClick={() => removeTodo(todo.id)}
            ></div>
          </div>
        );
      })}
    </>
  );
};

export default TodoList;
