const matrixSize = 4;
const colors = {
  2: '#FFCCFF',
  4: '#f5a4f5',
  8: '#ff89ff',
  16: '#fd72fd',
  32: '#f75bf7',
  64: '#ff43ff',
  128: '#ff32ff',
  256: '#ff00ff',
  512: '#e000e0',
  1024: '#b300b3',
  2048: '#8a008a',
};

let score = 0;
let bestScore = 0;
let tempScore = 0;

let currentDataCells = new Array(matrixSize).fill().map(() => new Array(matrixSize).fill(0));
let prevDataCells = new Array(matrixSize).fill().map(() => new Array(matrixSize).fill(0));

const saveCurrentDataCells = (currentDataCells) => localStorage.setItem('matrix', JSON.stringify(currentDataCells))
const getCurrentDataCells = (key = 'matrix') => currentDataCells = JSON.parse(localStorage.getItem(key))
if (localStorage.getItem('matrix')) {
  getCurrentDataCells()
}
const savePrevDataCells = (prevDataCells) => localStorage.setItem('prevMatrix', JSON.stringify(prevDataCells))
const getPrevDataCells = (key = 'prevMatrix') => prevDataCells = JSON.parse(localStorage.getItem(key))
if (localStorage.getItem('prevMatrix')) {
  getPrevDataCells()
}
const saveCurrentScoreData = (score) => localStorage.setItem('score', score);
const getCurrentScoreData = (key = 'score') => score = +(localStorage.getItem(key));
if (localStorage.getItem('score')) {
  getCurrentScoreData();
}
const saveBestScoreData = (bestScore) => localStorage.setItem('bestscore', bestScore);
const getBestScoreData = (key = 'bestscore') => bestScore = +(localStorage.getItem(key));
if (localStorage.getItem('bestscore')) {
  getBestScoreData();
}

let matrix = [...currentDataCells]
let prevMatrix = [...prevDataCells]

const newGameButton = document.getElementById('new');
const rulesButton = document.getElementById('rules');
const undoMoveButton = document.getElementById('undo');

const field = document.querySelector('.field');
const cells = document.querySelectorAll('.cell');

const scoreBoard = document.getElementById('score');
const bestScoreBoard = document.getElementById('best')

const controlKeys = document.querySelector('.control-keys');

scoreBoard.innerText = score;
bestScoreBoard.innerText = bestScore;

const copyItem = (item) => {
  if (Array.isArray(item)) {
    return item.map(copyItem);
  }
  if (item instanceof Date) {
    return new Date(item);
  }
  if (item && typeof item === 'object') {
    return Object.entries(item).reduce((acc, [key, value]) => {
      acc[key] = copyItem(value);
      return acc;
    }, {});
  }
  return item;
};

const showCellsValues = (cells, matrix) => {
  cells.forEach(cell => {
    let i = +cell.id.slice(0, 1);
    let j = cell.id.slice(1);

    if (matrix[i][j] == 0) {
      cell.innerText = '';
    } else {
      cell.innerText = matrix[i][j];
    }

    if (cell.textContent != '') {
      cell.style.background = colors[cell.textContent]
    } else {
      cell.style.background = '#CC99CC'
    }
  })

}

const increaseScore = (value) => {
  if (!Number.isInteger(value)) {
    throw new Error('wrong argument')
  }
  score += value;
  scoreBoard.innerText = score;
  saveCurrentScoreData(score)
}

const getBestScore = () => {
  if (score > bestScore) {
    bestScore = score;
    bestScoreBoard.innerText = bestScore;
  }
  score = 0;
  scoreBoard.innerText = score;
  saveCurrentScoreData(score)
  saveBestScoreData(bestScore)
}

const addRandomCellValue = () => {
  let freeCellsIndices = [];
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      if (matrix[i][j] === 0) {
        freeCellsIndices.push([i, j])
      }
    }
  }
  if (freeCellsIndices.length == 0) {
    return;
  }

  let randomCell = Math.floor(Math.random() * (freeCellsIndices.length));
  let randomCellValue = Math.round(Math.random() + 0.4);
  let randomCellRow = freeCellsIndices[randomCell][0];
  let randomCellCol = freeCellsIndices[randomCell][1];
  matrix[randomCellRow][randomCellCol] = randomCellValue ? 2 : 4;
}

const makeStep = (step, matrix) => {
  let tempPrev = copyItem(prevMatrix);
  prevMatrix = copyItem(matrix);
  savePrevDataCells(prevMatrix);
  tempScore = score;


  switch (step) {
    case 'up':
      for (let j = 0; j < matrixSize; j++) {
        for (let i = 0; i < matrixSize - 1; i++) {
          if (matrix[i][j] == 0) {
            continue;
          }
          for (let z = i + 1; z < matrixSize; z++) {
            if (matrix[z][j] == 0) {
              continue;
            }
            if (matrix[i][j] == matrix[z][j]) {
              matrix[i][j] *= 2;
              matrix[z][j] = 0;
              increaseScore(matrix[i][j]);
              i = z;
            } else {
              i = z - 1;
            }
            break;
          }
        }

        let a = 0;
        for (let i = 1; i < matrixSize; i++) {
          if (matrix[i][j] == 0) {
            continue;
          }
          if (matrix[a][j] != 0) {
            a++;
          }
          if (a == i) {
            continue;
          }
          matrix[a][j] = matrix[i][j];
          matrix[i][j] = 0;
        }
      }

      if (JSON.stringify(prevMatrix) != JSON.stringify(matrix)) {
        addRandomCellValue()
      } else {
        prevMatrix = copyItem(tempPrev);
      }
      break;

    case 'down':
      for (let j = 0; j < matrixSize; j++) {
        for (let i = matrixSize - 1; i > 0; i--) {
          if (matrix[i][j] == 0) {
            continue;
          }
          for (let z = i - 1; z >= 0; z--) {
            if (matrix[z][j] == 0) {
              continue;
            }
            if (matrix[i][j] == matrix[z][j]) {
              matrix[i][j] *= 2;
              matrix[z][j] = 0;
              increaseScore(matrix[i][j]);
              i = z;
            } else {
              i = z + 1;
            }
            break;
          }
        }

        let a = matrixSize - 1;
        for (let i = matrixSize - 2; i >= 0; i--) {
          if (matrix[i][j] == 0) {
            continue;
          }
          if (matrix[a][j] != 0) {
            a--;
          }
          if (a == i) {
            continue;
          }
          matrix[a][j] = matrix[i][j];
          matrix[i][j] = 0;
        }
      }


      if (JSON.stringify(prevMatrix) != JSON.stringify(matrix)) {
        addRandomCellValue()
      } else {
        prevMatrix = copyItem(tempPrev);
      }
      break;

    case 'right':
      for (let i = 0; i < matrixSize; i++) {
        for (let j = matrixSize - 1; j > 0; j--) {
          if (matrix[i][j] == 0) {
            continue;
          }
          for (let z = j - 1; z >= 0; z--) {
            if (matrix[i][z] == 0) {
              continue;
            }
            if (matrix[i][j] == matrix[i][z]) {
              matrix[i][j] *= 2;
              matrix[i][z] = 0;
              increaseScore(matrix[i][j]);
              j = z;
            } else {
              j = z + 1;
            }
            break;
          }
        }

        let a = matrixSize - 1;
        for (let j = matrixSize - 2; j >= 0; j--) {
          if (matrix[i][j] == 0) {
            continue;
          }
          if (matrix[i][a] != 0) {
            a--;
          }
          if (a == j) {
            continue;
          }
          matrix[i][a] = matrix[i][j];
          matrix[i][j] = 0;
        }
      }
      if (JSON.stringify(prevMatrix) != JSON.stringify(matrix)) {
        addRandomCellValue()
      } else {
        prevMatrix = copyItem(tempPrev);
      }
      break;

    case 'left':
      for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize - 1; j++) {
          if (matrix[i][j] == 0) {
            continue;
          }
          for (let z = j + 1; z < matrixSize; z++) {
            if (matrix[i][z] == 0) {
              continue;
            }
            if (matrix[i][j] == matrix[i][z]) {
              matrix[i][j] *= 2;
              matrix[i][z] = 0;
              increaseScore(matrix[i][j]);
              j = z;
            } else {
              j = z - 1;
            }
            break;
          }
        }

        let a = 0;
        for (let j = 1; j < matrixSize; j++) {
          if (matrix[i][j] == 0) {
            continue;
          }
          if (matrix[i][a] != 0) {
            a++;
          }
          if (a == j) {
            continue;
          }
          matrix[i][a] = matrix[i][j];
          matrix[i][j] = 0;
        }
      }
      if (JSON.stringify(prevMatrix) != JSON.stringify(matrix)) {
        addRandomCellValue()
      } else {
        prevMatrix = copyItem(tempPrev);
      }
      break;

    default: console.log('missed :)');
  }
  saveCurrentDataCells(matrix)
}

const undoMove = () => {
  matrix = copyItem(prevMatrix);
  saveCurrentDataCells(matrix);
  showCellsValues(cells, matrix);
  score = tempScore;
  scoreBoard.innerText = score;
}

const startNewGame = (cells, matrix, score) => {
  matrix = matrix.map((elem) => elem.fill(0));
  prevMatrix = prevMatrix.map((elem) => elem.fill(0));
  addRandomCellValue();
  addRandomCellValue();
  getBestScore();
  showCellsValues(cells, matrix);
  saveCurrentDataCells(matrix)
}

// const showModalWindow = () => {
//   const modalWindow = document.createElement(div);
//   modalWindow.classList = 

// }

newGameButton.addEventListener('click', () => startNewGame(cells, matrix))

undoMoveButton.addEventListener('click', () => undoMove(matrix, prevMatrix))

controlKeys.addEventListener('click', (e) => {
  makeStep(e.target.id, matrix);
  showCellsValues(cells, matrix);
})

document.addEventListener('keydown', (e) => {
  if (e.code == 'ArrowDown' ||
    e.code == 'ArrowLeft' ||
    e.code == 'ArrowRight' ||
    e.code == 'ArrowUp') {
    let move = e.code.toLowerCase().slice(5);
    makeStep(move, matrix)
    showCellsValues(cells, matrix)
    let key = document.getElementById(move);
    key.style.background = '#925792'
    document.addEventListener('keyup', (e) => {
      if (e.code == 'ArrowDown' ||
        e.code == 'ArrowLeft' ||
        e.code == 'ArrowRight' ||
        e.code == 'ArrowUp') {
        key.style.background = '#996699'
      }
    })
  }
})

rulesButton.addEventListener('click', () => {
  showModalWindow()
})

document.onload = showCellsValues(cells, matrix);