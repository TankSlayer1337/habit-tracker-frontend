import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Spinner from "../../spinner/Spinner";
import { HabitDefinition } from "../models/habit-definition";
import HabitForm from "../HabitForm";
import { ApiCaller } from "../../api-caller";

const EditHabit = ({ habit, onEdit, setDisplayEdit }: { habit: HabitDefinition, onEdit: Function, setDisplayEdit: Function }) => {
  const [request, setRequest] = useState<HabitDefinition>({
    ...habit
  });
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);

  const deleteHabit = async () => {
    setAwaitingResponse(true);
    try {
      await ApiCaller.call('/habits/' + habit.habitId, 'DELETE');
    } catch (error) {
      console.error('Error: ', error);
    }
    onEdit();
  }

  const updateHabit = async () => {
    setAwaitingResponse(true);
    try {
      await ApiCaller.call('/habits/update', 'POST', request);
    } catch (error) {
      console.error('Error: ', error);
    }

    onEdit();
  }

  return (
    <div>
      <HabitForm request={request} setRequest={setRequest} onSubmit={updateHabit}></HabitForm>
      {awaitingResponse ? <Spinner></Spinner> :
      <>
        <button onClick={() => updateHabit()}>Save Changes</button>
        <button onClick={() => deleteHabit()}>Delete <FontAwesomeIcon icon={faTrash} /></button>
        <button onClick={() => setDisplayEdit(false)}>Cancel</button>
      </>}
    </div>
  )
}

export default EditHabit;