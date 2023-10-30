import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { HabitDefinition } from "../models/habit-definition";

const DisplayHabit = ({ habit, setDisplayEdit }: { habit: HabitDefinition, setDisplayEdit: Function }) => {
  return (
    <div>
      <h3>{habit.name}</h3>
      <button onClick={() => setDisplayEdit(true)}>Edit <FontAwesomeIcon icon={faPenToSquare} /></button>
    </div>
  )
}

export default DisplayHabit;