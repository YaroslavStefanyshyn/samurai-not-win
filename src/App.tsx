import React, {useCallback, useState} from 'react';
// components
import Playground from "./components/Playground";
import Select, {SelectedValue} from "./shared/components/Select/Select";
import Button from "./shared/components/Button";
import {ResultArea} from "./components/ResultArea/ResultArea";
import {SingleValue} from "react-select";

function App() {
  const [selectedOption, setSelectedOption] = useState<string>("Pick mode"); // mode name
  const [selectedSquares, setSelectedSquares] = useState<number>(5); // game mode for playground
  const [onSquareNum, setOnSquareNum] = useState<number[]>([]); // array of hovered items
  const [startGame, setStartGame] = useState<boolean>(false);
  const [openSelect, setOpenSelect] = useState<boolean>(false);

  const handleStart = useCallback(() => {
    setOnSquareNum([])
    setStartGame(true)
  }, [selectedSquares])

  const handleRestart = useCallback(() => setOnSquareNum([]), [])

  const onSelect = (e: SingleValue<SelectedValue>) => {
    setSelectedOption(e!.value);
    setSelectedSquares(e!.field)
    setOnSquareNum([])
    setStartGame(false)
  }

  return (
    <div className="App">
      <div>
        <div className="App_change-mode flex-row">
          <Select onSelect={onSelect} selectedOption={selectedOption} setOpenSelect={setOpenSelect}/>
          <div className="flex-row">
            <Button
              className={`btn mr-5 ${selectedOption === "Pick mode" ? 'btn-disabled' : 'btn-primary'}`}
              label="Start"
              disabled={selectedOption === "Pick mode"}
              onClick={handleStart}
            />
            <Button
              className={`btn ${onSquareNum.length <= 0 ? 'btn-disabled' : 'btn-secondary'}`}
              label="Restart"
              disabled={onSquareNum.length <= 0}
              onClick={handleRestart}
            />
          </div>
        </div>

        <div className="App_change-mode">
          <Playground
            selectedSquares={selectedSquares}
            onSquareNum={onSquareNum}
            setOnSquareNum={setOnSquareNum}
            startGame={startGame}
            openSelect={openSelect}
          />
        </div>
      </div>

      <ResultArea onSquareNum={onSquareNum} selectedSquares={selectedSquares}/>

    </div>
  );
}

export default App;
