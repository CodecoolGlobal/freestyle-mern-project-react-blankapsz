import { useState } from "react";
import "./Home.css";

export default function Home() {
  const [userName, setUserName] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const user = {
      name: userName,
    };
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const user = await response.json();
        console.log("New user added", user);
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="home-container">
      <div>
        <img
          width={200}
          src="https://content.presentermedia.com/files/clipart/00015000/15090/figure_climb_large_books_stack_800_wht.jpg"
          alt=""
        />
      </div>
      <h1 id="welcome">Welcome to our book library!</h1>
      <h2 id="registersign">
        Please register your name to add your books and borrow!
      </h2>
      <div id="register-container">
        <form onSubmit={(e) => handleRegister(e)}>
          <label id="username">User Name:</label>
          <input
            id="usernameinput"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
          />
          <br />
          <br />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}
