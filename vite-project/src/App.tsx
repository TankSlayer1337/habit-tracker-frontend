import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react'
import Habits from './habits/Habits';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <Authenticator className='authenticator' socialProviders={['google']} hideSignUp>
      {({ signOut }) => (
        <>
          <h1>Habit-Tracker</h1>
          <button onClick={signOut}>Sign Out <FontAwesomeIcon icon={faRightFromBracket} /></button>
          <p>Disclaimer: this app is under development and everything is subject to change. Your data may get deleted.</p>
          <Habits></Habits>
        </>
      )}
    </Authenticator>
  )
}

export default App
