import { useState } from "react";
import Spinner from "../spinner/Spinner";
import { CreateHabitRequest } from "./models/create-habit-request";
import HabitForm from "./HabitForm";
import { ApiCaller } from "../api-caller";

const AddHabit = ({ onAdd }: { onAdd: Function }) => {
  const [request, setRequest] = useState<CreateHabitRequest>({
    name: ''
  });
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);

  const createHabit = async () => {
    setAwaitingResponse(true);
    try {
      await ApiCaller.call('/habits', 'POST', request);
    } catch (error) {
      console.error('Error: ', error);
    }
    setRequest({name: ''});
    setAwaitingResponse(false);
    onAdd();
  }

  return (
    <div>
      <h4>Create habit</h4>
      <HabitForm request={request} setRequest={setRequest}></HabitForm>
      {awaitingResponse ? <Spinner></Spinner> : <button onClick={createHabit}>Create</button>}
    </div>
  )
}

export default AddHabit;