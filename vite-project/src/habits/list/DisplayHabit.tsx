import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { HabitRecord } from "../models/habit-record";
import { DoneHabit } from "../models/done-habit";

interface DisplayHabitProps {
  habitRecord: HabitRecord,
  updateDoneHabit: (doneHabit: DoneHabit, httpMethod: string) => Promise<void>,
  setDisplayEdit: Function
}

const DisplayHabit = ({ habitRecord, updateDoneHabit, setDisplayEdit }: DisplayHabitProps) => {
  const getLastWeeksDates = (): string[] => {
    const currentDate = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    let lastWeeksDates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate.getTime() - i * millisecondsPerDay);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;  // getMonth returns 0-11.
      const day = date.getDate();
      lastWeeksDates.push(`${year}-${month}-${day}`);
    }
    lastWeeksDates.reverse();
    return lastWeeksDates;
  }

  const toggleDoneHabit = async (date: string) => {
    const doneHabit: DoneHabit = { habitId: habitRecord.habitId, date: date };
    if (habitRecord.dates.includes(date)) {
      await updateDoneHabit(doneHabit, 'DELETE');
    } else {
      await updateDoneHabit(doneHabit, 'POST');
    }
  }

  const recordButtons = getLastWeeksDates().map(date =>
    <button onClick={() => toggleDoneHabit(date)} key={date}>{habitRecord.dates.includes(date) ? 'X' : '-'}</button>
  );
  
  return (
    <div>
      <h3>{habitRecord.name}</h3>
      <p>Completed days: {habitRecord.doneCount}</p>
      {recordButtons}
      <button onClick={() => setDisplayEdit(true)}>Edit <FontAwesomeIcon icon={faPenToSquare} /></button>
    </div>
  )
}

export default DisplayHabit;