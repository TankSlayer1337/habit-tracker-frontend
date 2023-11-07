import './HabitList.css';
import HabitListItem from "./HabitListItem";
import { HabitRecord } from "../models/habit-record";
import { DoneHabitRequest } from "../models/done-habit-request";

interface HabitListProps {
  habitRecords: HabitRecord[],
  updateDoneHabit: (doneHabit: DoneHabitRequest, httpMethod: string) => Promise<void>,
  onEdit: Function
}

const HabitList = ({ habitRecords, updateDoneHabit, onEdit }: HabitListProps) => {

  const habitItems = habitRecords.map(habitRecord =>
    <li key={habitRecord.habitId}>
      <HabitListItem habitRecord={habitRecord} updateDoneHabit={updateDoneHabit} onEdit={onEdit}></HabitListItem>
    </li>
  );

  return (
    <div>
      <h2>Habits</h2>
      { habitRecords.length == 0 && <p>Add some habits to see them listed here.</p>}
      <ul>
        {habitItems}
      </ul>
    </div>
  )
}

export default HabitList;