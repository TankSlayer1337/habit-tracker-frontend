import './App.css'
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react'
import Habits from './habits/Habits';

function App() {
  return (
    <Authenticator socialProviders={['google']}>
      {({ signOut, user }) => (
        <>
          <button onClick={signOut}>Sign Out</button>
          <Habits user={user!}></Habits>
        </>
      )}
    </Authenticator>
  )
}

export default App
