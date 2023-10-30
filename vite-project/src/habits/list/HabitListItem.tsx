import { AmplifyUser } from "@aws-amplify/ui";
import { useState } from "react";
import { HabitDefinition } from "../models/habit-definition";
import DisplayHabit from "./DisplayHabit";
import EditHabit from "./EditHabit";

const HabitListItem = ({ user, habit, onEdit }: { user: AmplifyUser, habit: HabitDefinition, onEdit: Function }) => {
  const [displayEdit, setDisplayEdit] = useState<Boolean>();

  return (
    <div>
      {displayEdit ?
        <EditHabit user={user} habit={habit} onEdit={onEdit} setDisplayEdit={setDisplayEdit}></EditHabit> :
        <DisplayHabit habit={habit} setDisplayEdit={setDisplayEdit}></DisplayHabit>}
    </div>
  )
}

export default HabitListItem;