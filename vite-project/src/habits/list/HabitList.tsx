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
    <li key={habitRecord.habitId}>
      <HabitListItem habitRecord={habitRecord} reloadRecords={reloadRecords} onEdit={onEdit}></HabitListItem>
    </li>
  );

  return (
    <div className='habit-list'>
      { habitRecords.length == 0 && <p>Add some habits to see them listed here.</p>}
      <ul>
        {habitItems}
      </ul>
    </div>
  )
}

export default HabitList;