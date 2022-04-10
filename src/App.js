import './App.css';
import { useState } from 'react';
import Select from "react-select";


const emojis = [
  {
    emoji: '👽',
    type: "addition"
  },
  {
    emoji: '💀',
    type: "subtraction"
  },
  {
    emoji: '👻',
    type: "multiplication"
  },
  {
    emoji: '😱',
    type: "division"
  }
];

function App() {

  const message = null;
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [selectedOperator, setSelectedOperator] = useState(null)
  const [result, setResult] = useState(0)



  let handleSubmit = async (e) => {
    e.preventDefault();

    if(selectedOperator == null){
      alert('Please select operator from select field'); 
    }
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      let res = await fetch(API_URL + '/calculate', {
        method: "POST",
        body: JSON.stringify({
          firstNumber: firstNumber,
          secondNumber: secondNumber,
          operator: selectedOperator.type,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setResult(resJson.result);
      } else {
        //setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>First Number:</label>
        <input
          type="number"
          value={firstNumber}
          placeholder="First Number"
          onChange={(e) => setFirstNumber(e.target.value)}
        />
        <label>Select Operator</label>
        <Select
          name="operator"
          options={emojis}
          value={selectedOperator}
          className="selectField"
          onChange={setSelectedOperator}
          getOptionLabel={(emojis) => emojis.emoji}
          getOptionValue={(emojis) => emojis.type} // It should be unique value in the options. E.g. ID
        />
        <label>Second number:</label>
        <input
          type="number"
          value={secondNumber}
          placeholder="Second Number"
          onChange={(e) => setSecondNumber(e.target.value)}
        />

        <button class="submitBtn" type="submit">Calculate</button>

        <div className="message"> The calculated result is: {<h2>{result}</h2>}</div>
      </form>
    </div>
  )
}

export default App;