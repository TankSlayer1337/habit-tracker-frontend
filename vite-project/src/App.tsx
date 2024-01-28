import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import Habits from './habits/Habits';

function App() {
  return (
    <Authenticator className='authenticator' socialProviders={['google']} hideSignUp>
      {({ signOut }) => (
        <>
          <h1>Habit Tracker</h1>
          <p>Disclaimer: this app is under development and everything is subject to change. Your data may get deleted.</p>
          <Habits signOut={signOut}></Habits>
        </>
      )}
    </Authenticator>
  )
}

export default App
