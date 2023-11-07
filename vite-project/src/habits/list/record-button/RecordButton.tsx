import './RecordButton.css';
import { useState } from "react";
import { HabitDate } from "../../models/habit-date"
import { DoneHabitRequest } from '../../models/done-habit-request';
import { ApiCaller } from '../../../api-caller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';

interface RecordButtonProps {
  habitId: string,
  date: HabitDate,
  isDone: Boolean,
  reloadRecord: () => Promise<void>,
  key: string // forces this component to be recreated when changed.
}

const RecordButton = ({habitId, date, isDone, reloadRecord}: RecordButtonProps) => {
  const [animationClassName, setAnimationClassName] = useState<string>('');

  const callDoneHabitEndpoint = async (doneHabit: DoneHabitRequest, httpMethod: string) => {
    try {
      await ApiCaller.call('/habits/done', httpMethod, doneHabit);
    } catch (error) {
      console.error('Error: ', error);
    }
    reloadRecord();
  }

  const toggleDoneHabit = async () => {
    const doneHabit: DoneHabitRequest = { habitId: habitId, date: date };
    if (isDone) {
      setAnimationClassName('not-done-pending');
      await callDoneHabitEndpoint(doneHabit, 'DELETE');
    } else {
      setAnimationClassName('done-pending');
      await callDoneHabitEndpoint(doneHabit, 'POST');
    }
  }

  return (
    <button className={`${isDone ? 'done' : 'not-done'} ${animationClassName}`} onClick={toggleDoneHabit}>{isDone ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faMinus} />}</button>
  )
}

export default RecordButton;