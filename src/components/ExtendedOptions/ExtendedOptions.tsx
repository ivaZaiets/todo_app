import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions } from '../../features/todos/TodosSlice';
import { TodoStatus } from '../../helpers/TodoStatusEnum';
import cn from 'classnames';
import styles from './ExtendedOptions.module.scss';

const ExtendedOptions = () => {
  const dispatch = useAppDispatch();
  const { todos, isClicked } = useAppSelector((state) => state.todos);

  const toggleAll = () => {
    dispatch(actions.toggleAllTodos());
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div className={styles.options__select_all}>
          <div
            onClick={toggleAll}
            className={cn(styles.options__select_all_img_incompleted, {
              [styles.options__select_all_img_disabled]: todos.length === 0,
              [styles.options__select_all_img_completed]:
                todos.every((todo) => todo.completed) && todos.length !== 0,
            })}
          ></div>

          <p
            className={cn(styles.options__select_all_title, {
              [styles.options__select_all_title_disabled]: todos.length === 0,
            })}
          >
            Select All
          </p>
        </div>

        <div className={styles.options__todo_status}>
          {[TodoStatus.All, TodoStatus.Completed, TodoStatus.Active].map(
            (status) => (
              <div
                key={status}
                className={cn(
                  styles[`options__todo_status_${status.toLowerCase()}`],
                  {
                    [styles[
                      `options__todo_status_${status.toLowerCase()}_isClicked`
                    ]]: isClicked === status && todos.length !== 0,
                    [styles[
                      `options__todo_status_${status.toLowerCase()}_disabled`
                    ]]: todos.length === 0,
                    [styles.options__todo_status_all_isClicked]:
                      todos.length !== 0 &&
                      isClicked !== TodoStatus.Completed &&
                      isClicked !== TodoStatus.Active,
                  },
                )}
                onClick={() => {
                  dispatch(actions.setTodoStatus(status));
                  dispatch(actions.setIsClicked(status));
                }}
              >
                <p
                  className={cn(
                    styles[
                      `options__todo_status_${status.toLowerCase()}_title`
                    ],
                    {
                      [styles[
                        `options__todo_status_${status.toLowerCase()}_title_isClicked`
                      ]]: isClicked === status && todos.length !== 0,
                      [styles[
                        `options__todo_status_${status.toLowerCase()}_title_disabled`
                      ]]: todos.length === 0,
                      [styles.options__todo_status_all_title_isClicked]:
                        todos.length !== 0 &&
                        isClicked !== TodoStatus.Completed &&
                        isClicked !== TodoStatus.Active,
                    },
                  )}
                >
                  {status}
                </p>
              </div>
            ),
          )}
        </div>

        <div
          className={cn(styles.options__remove_all, {
            [styles.options__remove_all_disabled]: todos.length === 0,
          })}
          onClick={() => dispatch(actions.removeAllTodos())}
        >
          <p
            className={cn(styles.options__remove_all_title, {
              [styles.options__remove_all_title_disabled]: todos.length === 0,
            })}
          >
            Remove all
          </p>
        </div>
      </div>

      <img className={styles.line} src="./line.svg" alt="line" />
    </div>
  );
};

export default ExtendedOptions;
