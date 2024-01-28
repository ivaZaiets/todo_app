import ExtendedOptions from './components/ExtendedOptions/ExtendedOptions';
import TodoForm from './components/TodoForm/TodoForm';
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <ExtendedOptions />
      <TodoForm />
    </div>
  );
};

export default App;
