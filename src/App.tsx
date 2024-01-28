import './App.scss';
import ExtendedOptions from './components/ExtendedOptions/ExtendedOptions';
import TodoForm from './components/TodoForm/TodoForm';

const App = () => {
  return (
    <div className="app">
      <ExtendedOptions />
      <TodoForm />
    </div>
  );
};

export default App;
