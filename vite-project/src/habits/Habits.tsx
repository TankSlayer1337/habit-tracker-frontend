import { AuthEventData } from '@aws-amplify/ui';
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import CreateHabit from "./CreateHabit";
import HabitList from "./list/HabitList";
import { ApiCaller } from "../api-caller";
import { HabitRecord } from "./models/habit-record";
import MenuBar from "./MenuBar";
import { View } from "./View";

interface HabitsProps {
  signOut: ((data?: AuthEventData | undefined) => void) | undefined
}

const Habits = ({ signOut }: HabitsProps) => {
  const [view, setView] = useState<View>(View.List);
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

  useEffect(() => {
    fetchHabitRecords();
  }, []);

  const showSpinner = (): Boolean => {
    return awaitingResponse && (habitRecords === undefined || habitRecords.length == 0)
  }

  const showView = (view: View) => {
    switch (view) {
      case View.List:
        return <>
          {showSpinner() ? <Spinner></Spinner> :
            <HabitList habitRecords={habitRecords} reloadRecords={fetchHabitRecords} onEdit={fetchHabitRecords}></HabitList>
          }
        </>
      case View.Create:
        return <CreateHabit onAdd={fetchHabitRecords}></CreateHabit>
    }
  }

  return (
    <>
      <MenuBar view={view} setView={setView} signOut={signOut}></MenuBar>
      {showView(view)}
    </>
  )
}

export default Habits;