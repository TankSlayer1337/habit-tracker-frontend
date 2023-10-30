import { AmplifyUser } from "@aws-amplify/ui";
import { HabitDefinition } from "../models/habit-definition";
import HabitListItem from "./HabitListItem";

const MovieList = ({ user, habits, onEdit }: { user: AmplifyUser, habits: HabitDefinition[], onEdit: Function }) => {

  const habitItems = habits.map(habit =>
    <li key={habit.habitId}>
      <HabitListItem user={user} habit={habit} onEdit={onEdit}></HabitListItem>
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

export default MovieList;