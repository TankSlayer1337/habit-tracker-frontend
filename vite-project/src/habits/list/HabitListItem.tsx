import { AmplifyUser } from "@aws-amplify/ui";
import { useState } from "react";
import DisplayHabit from "./DisplayHabit";
import EditHabit from "./EditHabit";
import { HabitRecord } from "../models/habit-record";
import { DoneHabit } from "../models/done-habit";

interface HabitListItemProps {
  user: AmplifyUser,
  habitRecord: HabitRecord,
  updateDoneHabit: (doneHabit: DoneHabit, httpMethod: string) => Promise<void>,
  onEdit: Function
}

const HabitListItem = ({ user, habitRecord, updateDoneHabit, onEdit }: HabitListItemProps) => {
  const [displayEdit, setDisplayEdit] = useState<Boolean>();

  return (
    <div>
      {displayEdit ?
        <EditHabit user={user} habit={habitRecord} onEdit={onEdit} setDisplayEdit={setDisplayEdit}></EditHabit> :
        <DisplayHabit habitRecord={habitRecord} setDisplayEdit={setDisplayEdit} updateDoneHabit={updateDoneHabit}></DisplayHabit>}
    </div>
  )
}

export default HabitListItem;