import './../Habits.css';
import './HabitList.css';
import HabitListItem from "./HabitListItem";
import { HabitRecord } from "../models/habit-record";

interface HabitListProps {
  habitRecords: HabitRecord[],
  reloadRecords: () => Promise<void>,
  onEdit: Function
}

const HabitList = ({ habitRecords, reloadRecords, onEdit }: HabitListProps) => {

  const habitItems = habitRecords.map(habitRecord =>
    <li key={habitRecord.habitId} className='habit-card'>
      <HabitListItem habitRecord={habitRecord} reloadRecords={reloadRecords} onEdit={onEdit}></HabitListItem>
    </li>
  );

  return (
    <div>
      { habitRecords.length == 0 && <p>Add some habits to see them listed here.</p>}
      <ul>
        {habitItems}
      </ul>
    </div>
  )
}

export default HabitList;