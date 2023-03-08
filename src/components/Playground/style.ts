const GridTemplates = (squares: number, width: number) => {
  const squareSizeFor5 = width > 600 ? '50px' : '40px';
  const squareSizeFor15 = width > 620 ? '35px' : width > 420 ? '25px' : '20px';
  const squareSizeFor25 = width > 600 ? '20px' : '13px';
  const WH = squares === 5 ? squareSizeFor5 : (squares === 15 ? squareSizeFor15 : squareSizeFor25);
  return {
    gridTemplateColumns: `repeat(${squares}, ${WH})`,
    gridTemplateRows: `repeat(${squares}, ${WH})`,
  };
};

const color = (squareNumber: number, onSquareNum: number[]) => {
  return ({backgroundColor: onSquareNum.some(e => e === squareNumber) ? '#007bff' : 'white'})
}

export {GridTemplates, color};
