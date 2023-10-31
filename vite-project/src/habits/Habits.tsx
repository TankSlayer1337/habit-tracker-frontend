import { AmplifyUser } from "@aws-amplify/ui";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import AddHabit from "./AddHabit";
import HabitList from "./list/HabitList";
import { ApiCaller } from "../api-caller";
import { HabitRecord } from "./models/habit-record";
import { DoneHabit } from "./models/done-habit";

const Movies = ({ user }: { user: AmplifyUser }) => {
  const [habitRecords, setHabitRecords] = useState<HabitRecord[]>([]);
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(true);

  const fetchHabitRecords = async () => {
    setAwaitingResponse(true);
    try {
      const response = await ApiCaller.call(user, '/habits/records');
      setHabitRecords(await response.json());
    } catch (error) {
      console.error('Error: ', error);
    }
    setAwaitingResponse(false);
  }

  const callDoneHabitEndpoint = async (doneHabit: DoneHabit, httpMethod: string) => {
    try {
      await ApiCaller.call(user, '/habits/done', httpMethod, doneHabit);
    } catch (error) {
      console.error('Error: ', error);
    }
    fetchHabitRecords();
  }

  useEffect(() => {
    fetchHabitRecords();
  }, []);

  return (
    <>
      <AddHabit user={user!} onAdd={fetchHabitRecords}></AddHabit>
      {awaitingResponse ? <Spinner></Spinner> :
        <HabitList user={user} habitRecords={habitRecords} updateDoneHabit={callDoneHabitEndpoint} onEdit={fetchHabitRecords}></HabitList>
      }
    </>
  )
}

export default Movies;