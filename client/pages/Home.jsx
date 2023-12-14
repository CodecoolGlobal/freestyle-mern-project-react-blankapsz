import { useState } from 'react'

export default function Home() {
const [userName, setUserName] = useState("");

async function handleRegister(e){
    e.preventDefault()
    const user = {
        name: userName,
    }
    try {
        const response = await fetch("/api/users", {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(user)
        });
        if(response.ok){
            const user = await response.json();
            console.log("New user added", user);
        } else {
            console.error("Failed to add user");
        }
    } catch (error) {
        console.error(error)
    }
}

  return (
    <div>
        <h2>Welcome</h2>
        <form onSubmit={(e) => handleRegister(e)}>
            <label >User Name:</label>
            <input value={userName} onChange={(e) => setUserName(e.target.value)} type='text'/> <br />
            <button>Register</button>
        </form>
    </div>
  )
}
