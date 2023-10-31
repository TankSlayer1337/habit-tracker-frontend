import HabitListItem from "./HabitListItem";
import { HabitRecord } from "../models/habit-record";
import { DoneHabit } from "../models/done-habit";

interface HabitListProps {
  habitRecords: HabitRecord[],
  updateDoneHabit: (doneHabit: DoneHabit, httpMethod: string) => Promise<void>,
  onEdit: Function
}

const HabitList = ({ habitRecords, updateDoneHabit, onEdit }: HabitListProps) => {

  const habitItems = habitRecords.map(habit =>
    <li key={habit.habitId}>
      <HabitListItem habitRecord={habit} updateDoneHabit={updateDoneHabit} onEdit={onEdit}></HabitListItem>
    </li>
  );

  return (
    <div>
      <h2>Habits</h2>
      <ul>
        {habitItems}
      </ul>
    </div>
  )
}

export default HabitList;