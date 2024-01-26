import '../Habits.css';
import { useState } from 'react';
import DisplayHabit from './DisplayHabit';
import EditHabit from './EditHabit';
import HabitChart from './chart/HabitChart';
import { HabitRecord } from '../models/habit-record';

interface HabitListItemProps {
  habitRecord: HabitRecord,
  reloadRecords: () => Promise<void>,
  onEdit: Function
}

const HabitListItem = ({ habitRecord, reloadRecords, onEdit }: HabitListItemProps) => {
  const [displayEdit, setDisplayEdit] = useState<Boolean>();

  return (
    <div className="habit-card">
      {displayEdit ?
        <EditHabit habit={habitRecord} onEdit={onEdit} setDisplayEdit={setDisplayEdit}></EditHabit> :
        <DisplayHabit habitRecord={habitRecord} setDisplayEdit={setDisplayEdit} reloadRecords={reloadRecords}></DisplayHabit>}
      <HabitChart chartData={habitRecord.chartData}></HabitChart>
    </div>
  )
}

export default HabitListItem;