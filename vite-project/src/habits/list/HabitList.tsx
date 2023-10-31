import { AmplifyUser } from "@aws-amplify/ui";
import HabitListItem from "./HabitListItem";
import { HabitRecord } from "../models/habit-record";
import { DoneHabit } from "../models/done-habit";

interface HabitListProps {
  user: AmplifyUser,
  habitRecords: HabitRecord[],
  updateDoneHabit: (doneHabit: DoneHabit, httpMethod: string) => Promise<void>,
  onEdit: Function
}

const HabitList = ({ user, habitRecords, updateDoneHabit, onEdit }: HabitListProps) => {

  const habitItems = habitRecords.map(habit =>
    <li key={habit.habitId}>
      <HabitListItem user={user} habitRecord={habit} updateDoneHabit={updateDoneHabit} onEdit={onEdit}></HabitListItem>
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