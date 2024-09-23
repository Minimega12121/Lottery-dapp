import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./App.css";
import lottery from "./lottery";
import web3 from "./web3";

const App = () => {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const managerResponse = await lottery.methods.manager().call();
        const playersResponse = await lottery.methods.getPlayers().call();
        const balanceResponse = await web3.eth.getBalance(
          lottery.options.address
        );

        setManager(managerResponse); // Set manager address
        setPlayers(playersResponse); // Set players array
        setBalance(balanceResponse); // Set balance in wei

        console.log({ managerResponse, playersResponse, balanceResponse }); // Log the data to debug
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting on transaction success...");

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });

    setMessage("You have been entered! Congratulations and good luck!");
  };

  const pickWinnerHandler = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting for picking the winner...");
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    setMessage("A winner has been picked!");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply theme class to the body element
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  return (
    <div className={`container my-5 ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className={`card shadow-lg p-4 ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
        <div className="d-flex justify-content-between">
          <h2 className="text-center mb-4">🎟️ Lottery Contract</h2>
          <button className="btn btn-secondary" onClick={toggleDarkMode}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="mb-4">
          <p className="lead text-center">
            <strong>Managed by:</strong>{" "}
            {typeof manager === "string" ? manager : "Loading..."}
          </p>
          <p className="text-center">
            There are currently{" "}
            <strong>{Array.isArray(players) ? players.length : 0}</strong>{" "}
            people entered, competing to win{" "}
            <strong>{web3.utils.fromWei(balance, "ether")}</strong> ether!
          </p>
        </div>

        <hr />

        <div className="mb-5">
          <h4 className="mb-3">Want to try your luck?</h4>
          <form onSubmit={submitHandler}>
            <div className="form-group mb-3">
              <label htmlFor="etherAmount">Amount of ether to enter</label>
              <input
                type="text"
                id="etherAmount"
                className="form-control"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Enter amount in ether"
              />
            </div>
            <button type="submit" className={`btn btn-block ${isDarkMode ? "btn-danger" : "btn-danger"}`}>
              Enter
            </button>
          </form>
        </div>

        <hr />

        <div className="mb-5 text-center">
          <h4>Ready to pick a winner?</h4>
          <button
            type="button"
            className={`btn ${isDarkMode ? "btn-success" : "btn-primary"}`}
            onClick={pickWinnerHandler}
          >
            Pick a Winner!
          </button>
        </div>

        {message && (
          <div className="alert alert-info text-center" role="alert">
            <h5>{message}</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
