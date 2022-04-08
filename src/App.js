import './App.css';
import { useState } from 'react';
import Select from "react-select";


const displayEmojiName = event => alert(event.target.id);

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
    console.log(firstNumber)
    console.log(secondNumber)
    console.log(selectedOperator)
    const API_URL = process.env.REACT_APP_API_URL;
    //console.log(API_URL)
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
        console.log(resJson.result);
        setResult(resJson.result)
      } else {
        //setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={firstNumber}
          placeholder="First Number"
          onChange={(e) => setFirstNumber(e.target.value)}
        />
        <Select
          name="operator"
          options={emojis}
          value={selectedOperator}
          onChange={setSelectedOperator}
          getOptionLabel={(emojis) => emojis.emoji}
          getOptionValue={(emojis) => emojis.type} // It should be unique value in the options. E.g. ID
        />
        <input
          type="number"
          value={secondNumber}
          placeholder="Second Number"
          onChange={(e) => setSecondNumber(e.target.value)}
        />

        <button type="submit">Calculate</button>

        <div className="message"> The calculated result is: {<p>{result}</p>}</div>
      </form>
    </div>
  )
}

export default App;