import { useState } from 'react'

import './App.css'

function App() {
const [isLoading, setIsLoading] = useState(false);

  return (
    <>
    {isLoading ? <h2>Loading...</h2> : <div>
       <form>Hello</form>
      </div> }
    
    </>
  )
}

export default App
