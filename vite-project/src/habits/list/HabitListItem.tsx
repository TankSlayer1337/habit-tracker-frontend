import './HabitListItem.css';
import { useState } from "react";
import DisplayHabit from "./DisplayHabit";
import EditHabit from "./EditHabit";
import { HabitRecord } from "../models/habit-record";
import { DoneHabitRequest } from "../models/done-habit-request";

interface HabitListItemProps {
  habitRecord: HabitRecord,
  updateDoneHabit: (doneHabit: DoneHabitRequest, httpMethod: string) => Promise<void>,
  onEdit: Function
}

const HabitListItem = ({ habitRecord, updateDoneHabit, onEdit }: HabitListItemProps) => {
  const [displayEdit, setDisplayEdit] = useState<Boolean>();

  return (
    <div className="list-item-container">
      {displayEdit ?
        <EditHabit habit={habitRecord} onEdit={onEdit} setDisplayEdit={setDisplayEdit}></EditHabit> :
        <DisplayHabit habitRecord={habitRecord} setDisplayEdit={setDisplayEdit} updateDoneHabit={updateDoneHabit}></DisplayHabit>}
    </div>
  )
}

export default HabitListItem;