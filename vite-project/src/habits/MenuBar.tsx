import './MenuBar.css';
import { AuthEventData } from '@aws-amplify/ui';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { View } from './View';
import { Dispatch, SetStateAction } from 'react';

interface MenuBarProps {
  view: View,
  setView: Dispatch<SetStateAction<View>>,
  signOut: ((data?: AuthEventData | undefined) => void) | undefined
}

const MenuBar = ({ view, setView, signOut }: MenuBarProps) => {
  const getButtonClassName = (viewButton: View) => {
    return view == viewButton ? 'selected' : undefined
  }

  return (
    <div>
      <button onClick={() => setView(View.List)} className={getButtonClassName(View.List)}>View</button>
      <button onClick={() => setView(View.Create)} className={getButtonClassName(View.Create)}>Create</button>
      <button onClick={signOut}>Sign Out <FontAwesomeIcon icon={faRightFromBracket} /></button>
    </div>
  )
}

export default MenuBar;