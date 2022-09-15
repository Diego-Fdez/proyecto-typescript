import { useReducer } from "react";
import {Sub} from '../types'

/* Defining the type of the inputValues state. It is saying that the inputValues state is an object
with a property of type Sub. */
interface FormState {
  inputValues: Sub
}

/* Defining the initial state of the form. */
const INITIAL_STATE = {
  nick: '',
  subMonths: 0,
  avatar: '',
  description: ''
};

type FormReducerAction = {
  type: 'change_value',
  payload: {
    inputName: string,
    inputValue: string
  }
} | {
  type: 'clear'
}

/**
 * If the action type is 'change_value', then return a new object with the same properties as the state
 * object, but with the property whose name is the inputName property of the action payload object set
 * to the inputValue property of the action payload object. Otherwise, if the action type is 'clear',
 * then return the INITIAL_STATE object.
 * @param state - FormState['inputValues']
 * @param {FormReducerAction} action - FormReducerAction
 * @returns The return value is the new state.
 */
const formReducer = (state: FormState['inputValues'], action: FormReducerAction) => {
  switch (action.type) {
    case 'change_value':
      const {inputName, inputValue} = action.payload;
      return {
        ...state,
        [inputName]: inputValue,
      }
    case 'clear':
      return INITIAL_STATE
  }
}

const useNewSubs = () => {
  return useReducer(formReducer, INITIAL_STATE)
}

export default useNewSubs