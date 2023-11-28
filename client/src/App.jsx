import { useEffect, useState } from 'react'

import './App.css'

function App() {
const [isLoading, setIsLoading] = useState(true);
const [books, setBooks] = useState([])
console.log(books);

useEffect(() => {
  async function fetchBooks(){
    const response = await fetch("/api/book");
    const books = await response.json();
    setBooks(books);
  }
  fetchBooks();
  setIsLoading(false)
}, [])

  return (
    <>
    {isLoading ? <h2>Loading...</h2> : <div>
       <form>Hello</form>
      </div> }
    </>
  )
}

export default App
