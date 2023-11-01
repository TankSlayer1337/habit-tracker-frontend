import './DisplayHabit.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { HabitRecord } from "../models/habit-record";
import { DoneHabit } from "../models/done-habit";

interface DisplayHabitProps {
  habitRecord: HabitRecord,
  updateDoneHabit: (doneHabit: DoneHabit, httpMethod: string) => Promise<void>,
  setDisplayEdit: Function
}

interface SegregatedDate {
  year: number,
  month: number,
  day: number
}

const DisplayHabit = ({ habitRecord, updateDoneHabit, setDisplayEdit }: DisplayHabitProps) => {
  const getLastWeeksDates = (): SegregatedDate[] => {
    const currentDate = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    let lastWeeksDates: SegregatedDate[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate.getTime() - i * millisecondsPerDay);
      const segregatedDate: SegregatedDate = {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // getMonth returns 0-11.
        day: date.getDate()
      };
      lastWeeksDates.push(segregatedDate);
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

  const recordButtons = getLastWeeksDates().map(date => {
    const paddedMonth = date.month.toString().padStart(2, '0');
    const paddedDay = date.day.toString().padStart(2, '0');
    const fullDate = `${date.year}-${paddedMonth}-${paddedDay}`;
    return (
      <div key={fullDate}>
        <button onClick={() => toggleDoneHabit(fullDate)}>{habitRecord.dates.includes(fullDate) ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faMinus} />}</button>
        <p className='date'>{date.day}/{date.month}</p>
      </div>
    )
  }
  );

  return (
    <div>
      <div className='display-habit-header'>
        <h3>{habitRecord.name}</h3>
        <button className='edit-button' onClick={() => setDisplayEdit(true)}>Edit <FontAwesomeIcon icon={faPenToSquare} /></button>
        <p>Days completed: {habitRecord.doneCount}</p>
      </div>      
      <div className="habit-record-grid-container">
        {recordButtons}
      </div>
    </div>
  )
}

export default DisplayHabit;