import './HabitForm.css';
import { ChangeEvent, FormEvent } from "react";
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        autoFocus={true}
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