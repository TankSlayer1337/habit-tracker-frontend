import { AmplifyUser } from "@aws-amplify/ui";
import { useEffect, useState } from "react";
import { ApiUrlProvider } from "../api-url-provider";
import Spinner from "../spinner/Spinner";
import { HabitDefinition } from "./models/habit-definition";
import AddHabit from "./AddHabit";
import HabitList from "./list/HabitList";

const Movies = ({ user }: { user: AmplifyUser }) => {
  const [habitDefinitions, setHabitDefinitions] = useState<HabitDefinition[]>([]);
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(true);

  const fetchHabitDefinitions = async () => {
    setAwaitingResponse(true);
    try {
      const url = ApiUrlProvider.getApiUrl() + '/habits';
      const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('HabitDefinition retrieval was unsuccessful.');
      }

      const data = await response.json();
      setHabitDefinitions(data);
    } catch (error) {
      console.error('Error: ', error);
    }

    setAwaitingResponse(false);
  }

  useEffect(() => {
    fetchHabitDefinitions();
  }, []);

  return (
    <>
      <AddHabit user={user!} onAdd={fetchHabitDefinitions}></AddHabit>
      {awaitingResponse ? <Spinner></Spinner> :
        <HabitList user={user} habits={habitDefinitions} onEdit={fetchHabitDefinitions}></HabitList>
      }
    </>
  )
}

export default Movies;