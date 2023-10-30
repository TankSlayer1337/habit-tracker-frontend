import { AmplifyUser } from "@aws-amplify/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ApiUrlProvider } from "../../api-url-provider";
import Spinner from "../../spinner/Spinner";
import { HabitDefinition } from "../models/habit-definition";
import HabitForm from "../HabitForm";
import { UpdateHabitRequest } from "../models/update-habit-request";

const EditHabit = ({ user, habit, onEdit, setDisplayEdit }: { user: AmplifyUser, habit: HabitDefinition, onEdit: Function, setDisplayEdit: Function }) => {
  const [request, setRequest] = useState<UpdateHabitRequest>({
    ...habit
  });
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);

  const deleteHabit = async () => {
    setAwaitingResponse(true);
    try {
      const url = ApiUrlProvider.getApiUrl() + '/habits/' + habit.habitId;
      const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Habit deletion was unsuccessful.');
      }
    } catch (error) {
      console.error('Error: ', error);
    }

    onEdit();
  }

  const updateHabit = async () => {
    setAwaitingResponse(true);
    try {
      const url = ApiUrlProvider.getApiUrl() + '/habits/update';
      const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('Update habit request was unsuccessful.');
      }
    } catch (error) {
      console.error('Error: ', error);
    }

    onEdit();
  }

  return (
    <div>
      <HabitForm request={request} setRequest={setRequest}></HabitForm>
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