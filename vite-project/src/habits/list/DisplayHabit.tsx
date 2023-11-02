import './DisplayHabit.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { HabitRecord } from "../models/habit-record";
import { DoneHabit } from "../models/done-habit";
import { HabitDate } from './habit-date';
import { useEffect, useState } from 'react';

interface DisplayHabitProps {
  habitRecord: HabitRecord,
  updateDoneHabit: (doneHabit: DoneHabit, httpMethod: string) => Promise<void>,
  setDisplayEdit: Function
}

const DisplayHabit = ({ habitRecord, updateDoneHabit, setDisplayEdit }: DisplayHabitProps) => {
  const [lastWeeksDates, setLastWeeksDates] = useState<HabitDate[]>(getLastWeeksDates());

  function getLastWeeksDates(): HabitDate[] {
    const currentDate = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    let lastWeeksDates: HabitDate[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate.getTime() - i * millisecondsPerDay);
      const habitDate = new HabitDate(date);
      lastWeeksDates.push(habitDate);
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

  const updateDates = () => {
    const currentDate = new Date().getDate();
    if (lastWeeksDates[lastWeeksDates.length - 1].day != currentDate) {
      setLastWeeksDates(getLastWeeksDates());
    }
  }

  useEffect(() => {
    const intervalId = window.setInterval(updateDates, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const recordButtons = lastWeeksDates.map(date => {
    const isDone = habitRecord.dates.includes(date.fullDate);
    return (
      <div key={date.fullDate}>
        <button className={isDone ? 'done' : 'not-done'} onClick={() => toggleDoneHabit(date.fullDate)}>{isDone ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faMinus} />}</button>
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