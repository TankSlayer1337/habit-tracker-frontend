import { AmplifyUser } from "@aws-amplify/ui";
import { useState } from "react";
import { ApiUrlProvider } from "../api-url-provider";
import Spinner from "../spinner/Spinner";
import { CreateHabitRequest } from "./models/create-habit-request";
import HabitForm from "./HabitForm";

const AddHabit = ({ user, onAdd }: { user: AmplifyUser, onAdd: Function }) => {
  const [request, setRequest] = useState<CreateHabitRequest>({
    name: ''
  });
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);

  const createHabit = async () => {
    setAwaitingResponse(true);
    try {
      const url = ApiUrlProvider.getApiUrl() + '/habits';
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
        throw new Error('Create habit request was unsuccessful.');
      }
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