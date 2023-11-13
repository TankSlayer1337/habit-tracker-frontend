import './HabitForm.css';
import { ChangeEvent } from "react";
import { CreateHabitRequest } from "./models/create-habit-request";

interface HabitFormProps {
  request: CreateHabitRequest,
  setRequest: Function,
  onSubmit: Function
}

const HabitForm = ({ request, setRequest, onSubmit }: HabitFormProps) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRequest({
      ...request,
      [event.target.name]: event.target.value
    });
  }

  return (
    <form className='form-container' onSubmit={() => onSubmit()}>
      <label htmlFor="name">Name: </label>
      <input
        autoComplete="off"
        value={request.name ?? ''}
        id="name"
        type="text"
        name="name"
        onChange={handleChange}></input><br></br>
    </form>
  )
}

export default HabitForm;