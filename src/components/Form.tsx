import {Sub} from '../types';
import useNewSubs from '../hooks/useNewSubs'

/* Defining the type of the onNewSub prop. It is saying that the onNewSub prop is a function that takes
a newSub argument of type Sub and returns nothing. */
interface FormProps {
  onNewSub: (newSub: Sub) => void;
}

const Form = ({onNewSub}: FormProps) => {
  const [inputValues, dispatch] = useNewSubs()

  /**
   * The function handleSubmit takes an event of type React.FormEvent and returns nothing. It prevents
   * the default action of the event, and then calls the function onNewSub with the inputValues as the
   * argument.
   * @param e - React.FormEvent<HTMLFormElement>
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNewSub(inputValues);
    handleClear();
  };

  /**
   * The handleChange function takes an event as an argument, and then sets the inputValues state to
   * the current inputValues state, plus the value of the event target's name property, which is the
   * value of the event target.
   * @param e - React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    dispatch({
      type: 'change_value',
      payload: {
        inputName: name,
        inputValue: value
      }
    })
  };

  /**
   * When the user clicks the clear button, dispatch an action to the reducer to clear the state.
   */
  const handleClear = () => {
  dispatch({type: 'clear'})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={inputValues.nick} placeholder="nick" name='nick' />
        <input type="number" onChange={handleChange} value={inputValues.subMonths} placeholder="subMonths" name='subMonths' />
        <input type="text" onChange={handleChange} value={inputValues.avatar} placeholder="avatar" name='avatar' />
        <textarea onChange={handleChange} value={inputValues.description} placeholder="description" name='description' />
        <button type='button' onClick={handleClear}>Clear the form</button>
        <button type='submit'>Save new sub!</button>
      </form>
    </div>
  )
}

export default Form