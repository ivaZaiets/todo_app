import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions } from '../features/todos/TodosSlice';
import { TodoStatus } from '../helpers/TodoStatusEnum';
import styles from './ExtendedOptions.module.scss';

const ExtendedOptions = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.todos);

  const toggleAll = () => {
    dispatch(actions.toggleAllTodos());
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div className={styles.options__select_all}>
          {todos.every((todo) => todo.completed) && todos.length !== 0 ? (
            <img
              className={styles.options__select_all_img_completed}
              src="./completed-detail.png"
              alt="incompleted detail"
              onClick={toggleAll}
            />
          ) : (
            <img
              className={styles.options__select_all_img_incompleted}
              src="./incompleted-detail.png"
              alt="incompleted detail"
              onClick={toggleAll}
            />
          )}

          <p className={styles.options__select_all_title}>Select All</p>
        </div>

        <div className={styles.options__todo_status}>
          <div
            className={styles.options__todo_status_all}
            onClick={() => {
              dispatch(actions.setTodoStatus(TodoStatus.All));
            }}
          >
            <p className={styles.options__todo_status_all_title}>
              {TodoStatus.All}
            </p>
          </div>

          <div
            className={styles.options__todo_status_completed}
            onClick={() => {
              dispatch(actions.setTodoStatus(TodoStatus.Completed));
            }}
          >
            <p className={styles.options__todo_status_completed_title}>
              {TodoStatus.Completed}
            </p>
          </div>

          <div
            className={styles.options__todo_status_active}
            onClick={() => {
              dispatch(actions.setTodoStatus(TodoStatus.Active));
            }}
          >
            <p className={styles.options__todo_status_active_title}>
              {TodoStatus.Active}
            </p>
          </div>
        </div>

        <div
          className={styles.options__remove_all}
          onClick={() => {
            dispatch(actions.removeAllTodos());
          }}
        >
          <p className={styles.options__remove_all_title}>Remove all</p>
        </div>
      </div>

      <img 
        className={styles.line} 
        src="./line.svg" 
        alt="line" 
      />
    </div>
  );
};

export default ExtendedOptions;
