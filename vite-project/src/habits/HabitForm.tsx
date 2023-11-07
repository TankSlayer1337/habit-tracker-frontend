import './HabitForm.css';
import { ChangeEvent } from "react";
import { CreateHabitRequest } from "./models/create-habit-request";

const HabitForm = <RequestType extends CreateHabitRequest,>({ request, setRequest }: { request: RequestType, setRequest: Function }) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRequest({
      ...request,
      [event.target.name]: event.target.value
    });
  }

  return (
    <form className='form-container'>
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