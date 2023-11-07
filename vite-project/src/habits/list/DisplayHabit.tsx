import './DisplayHabit.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { HabitRecord } from "../models/habit-record";
import { HabitDate } from '../models/habit-date';
import { useEffect, useState } from 'react';
import RecordButton from './record-button/RecordButton';

interface DisplayHabitProps {
  habitRecord: HabitRecord,
  reloadRecords: () => Promise<void>,
  setDisplayEdit: Function
}

const DisplayHabit = ({ habitRecord, reloadRecords, setDisplayEdit }: DisplayHabitProps) => {
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
    const isDone = habitRecord.doneDates.some(doneDate => date.isEqualTo(doneDate));
    return (
      <div key={`${date.year}-${date.month}-${date.day}`}>
        <RecordButton habitId={habitRecord.habitId} date={date} isDone={isDone} reloadRecord={reloadRecords} key={`${isDone}`}></RecordButton>
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
        <p>Days completed: {habitRecord.allTimeDoneDatesCount}</p>
      </div>      
      <div className="habit-record-grid-container">
        {recordButtons}
      </div>
    </div>
  )
}

export default DisplayHabit;