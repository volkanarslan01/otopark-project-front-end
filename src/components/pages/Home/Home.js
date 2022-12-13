import Axios from "axios";

import classes from "./Home.module.scss";

import { useState, useEffect } from "react";
export default function Home() {
  const [message, setMessage] = useState("");

  const handlerSend = () => {
    const data = { message };
    Axios.post("http://localhost:3001/veri", data).then((result) =>
      console.log(result.data.success)
    );
    console.log(message);
  };

  return (
    <>
      <h1>Home</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={handlerSend}>Send</button>

      <div className="reservations">
        <h2>Mpark</h2>

        <h3>Volkan Arslan</h3>
        <ul>
          <li>Muğla/Köyceğiz</li>
          <li>28/19/2023 Pazar - 12.00</li>
          <p>arasinda</p>
          <li>28/19/2023 Pazar - 15.00</li>
          <li> Toplam tutar : 50 TL</li>
        </ul>
      </div>
    </>
  );
}
