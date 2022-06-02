const matrixSize = 4;
const matrix = new Array(matrixSize).fill().map(() => new Array(matrixSize).fill(0));
let prevMatrix;
let score = 0;
let bestScore = 0;

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


const showCellsValues = function (cells, matrix) {
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

const increaseScore = function (value) {
  if (!Number.isInteger(value)) {
    throw new Error('wrong argument')
  }
  score += value;
  scoreBoard.innerText = score;
}

const getBestScore = function () {
  if (score > bestScore) {
    bestScore = score;
    bestScoreBoard.innerText = bestScore;
  }
  score = 0;
  scoreBoard.innerText = score;
}

const addRandomCellValue = function () {
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
  let randomCellValue = Math.round(Math.random());
  let randomCellRow = freeCellsIndices[randomCell][0];
  let randomCellCol = freeCellsIndices[randomCell][1];
  matrix[randomCellRow][randomCellCol] = randomCellValue ? 2 : 4;
}

const makeStep = function (step, matrix) {

  prevMatrix = JSON.parse(JSON.stringify(matrix));

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

      break;

    default:
      console.log('wrong arg')
  }
  if (JSON.stringify(prevMatrix) != JSON.stringify(matrix)) {
    addRandomCellValue()
  }
}

const startNewGame = function (cells, matrix, score) {
  matrix = matrix.map((elem) => elem.fill(0));
  addRandomCellValue();
  addRandomCellValue();
  getBestScore();
  showCellsValues(cells, matrix);
}

newGameButton.addEventListener('click', () => startNewGame(cells, matrix))

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
  }
})



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
