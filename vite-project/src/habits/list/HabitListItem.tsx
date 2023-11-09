import '../Habits.css';
import { useEffect, useState } from "react";
import DisplayHabit from "./DisplayHabit";
import EditHabit from "./EditHabit";
import { HabitRecord } from "../models/habit-record";
import HabitChart from './chart/HabitChart';
import { ApiCaller } from '../../api-caller';
import { ChartData } from './chart/chart-data';

interface HabitListItemProps {
  habitRecord: HabitRecord,
  reloadRecords: () => Promise<void>,
  onEdit: Function
}

const HabitListItem = ({ habitRecord, reloadRecords, onEdit }: HabitListItemProps) => {
  const [displayEdit, setDisplayEdit] = useState<Boolean>();
  const [chartData, setChartData] = useState<ChartData>({ dates: [], values: [] });

  useEffect(() => {
    fetchChartData();
  }, [habitRecord]);

  const fetchChartData = async () => {
    try {
      const response = await ApiCaller.call(`/habits/chart/${habitRecord.habitId}`);
      setChartData(await response.json());
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  return (
    <div className="habit-card">
      {displayEdit ?
        <EditHabit habit={habitRecord} onEdit={onEdit} setDisplayEdit={setDisplayEdit}></EditHabit> :
        <DisplayHabit habitRecord={habitRecord} setDisplayEdit={setDisplayEdit} reloadRecords={reloadRecords}></DisplayHabit>}
      <HabitChart chartData={chartData}></HabitChart>
    </div>
  )
}

export default HabitListItem;