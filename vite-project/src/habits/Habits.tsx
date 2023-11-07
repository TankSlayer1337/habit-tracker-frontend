import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import AddHabit from "./AddHabit";
import HabitList from "./list/HabitList";
import { ApiCaller } from "../api-caller";
import { HabitRecord } from "./models/habit-record";
import { DoneHabitRequest } from "./models/done-habit-request";

const Habits = () => {
  const [habitRecords, setHabitRecords] = useState<HabitRecord[]>([]);
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(true);

  const fetchHabitRecords = async () => {
    setAwaitingResponse(true);
    try {
      const response = await ApiCaller.call('/habits/records');
      setHabitRecords(await response.json());
    } catch (error) {
      console.error('Error: ', error);
    }
    setAwaitingResponse(false);
  }

  const callDoneHabitEndpoint = async (doneHabit: DoneHabitRequest, httpMethod: string) => {
    try {
      await ApiCaller.call('/habits/done', httpMethod, doneHabit);
    } catch (error) {
      console.error('Error: ', error);
    }
    fetchHabitRecords();
  }

  useEffect(() => {
    fetchHabitRecords();
  }, []);

  const showSpinner = (): Boolean => {
    return awaitingResponse && (habitRecords === undefined || habitRecords.length == 0)
  }

  return (
    <>
      <AddHabit onAdd={fetchHabitRecords}></AddHabit>
      {showSpinner() ? <Spinner></Spinner> :
        <HabitList habitRecords={habitRecords} updateDoneHabit={callDoneHabitEndpoint} onEdit={fetchHabitRecords}></HabitList>
      }
    </>
  )
}

export default Habits;