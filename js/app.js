const matrixSize = 4;
// cons matrix = new Array(matrixSize).fill().map(() => new Array(matrixSize).fill(0))
const matrix = [
  [128, 0, 0, 2],
  [1024, 512, 2, 2],
  [1024, 0, 8, 8],
  [32, 0, 8, 128]
]
const a = [
  [128, 512, 0, 0],
  [128, 512, 2, 8],
  [1024, 0, 8, 8],
  [32, 128, 8, 8]
]
const b = [
  [0, 32, 0, 2],
  [1024, 512, 32, 2],
  [32, 0, 32, 8],
  [32, 0, 8, 32]
]
const c = [
  [0, 4, 4, 2],
  [1024, 512, 128, 2],
  [0, 0, 4, 8],
  [32, 128, 4, 128]
]
const d = [
  [0, 2, 0, 2],
  [1024, 2, 2, 2],
  [128, 2, 32, 8],
  [0, 2, 8, 128]
]
const prevMatrix = [];
let score = 0;

const increaseScore = function (value) {
  if (!Number.isInteger(value)) {
    throw new Error('wrong argument')
  }
  score += value;
}


console.log(score)
const newGame = function () {
  addRandomCellValue();
  addRandomCellValue();
}

const addRandomCellValue = function () {
  const freeCellsIndices = [];
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      if (matrix[i][j] === 0) {
        freeCellsIndices.push([i, j])
      }
    }
  }
  if (freeCellsIndices.length == 0) return;

  let randomCell = Math.floor(Math.random() * (freeCellsIndices.length));
  let randomCellValue = Math.round(Math.random());
  let randomCellRow = freeCellsIndices[randomCell][0];
  let randomCellCol = freeCellsIndices[randomCell][1];
  matrix[randomCellRow][randomCellCol] = (randomCellValue) ? 2 : 4;
}

// j - column, i - row

const makeStep = function (step, matrix) {
  switch (step) {
    case 'up':
      for (let j = 0; j < matrixSize; j++) {
        for (let i = 0; i < matrixSize - 1; i++) {
          if (matrix[i][j] == 0) continue;
          for (let z = i + 1; z < matrixSize; z++) { // сравнивает с предыдущими и соединяет
            if (matrix[z][j] == 0) continue;
            if (matrix[i][j] == matrix[z][j]) {
              matrix[i][j] *= 2;
              matrix[z][j] = 0;
              increaseScore(matrix[i][j]);
              i = z;
            } else i = z - 1;
            break;
          }
        }

        let a = 0;
        for (let i = 1; i < matrixSize; i++) {
          if (matrix[i][j] == 0) continue;
          if (matrix[a][j] != 0) {
            a++;
          }
          matrix[a][j] = matrix[i][j];
          matrix[i][j] = 0;
        }
      }
      break;

    case 'down':
      for (let j = 0; j < matrixSize; j++) {
        for (let i = matrixSize - 1; i > 0; i--) {
          if (matrix[i][j] == 0) continue;
          for (let z = i - 1; z >= 0; z--) { // сравнивает с предыдущими и соединяет
            if (matrix[z][j] == 0) continue;
            if (matrix[i][j] == matrix[z][j]) {
              matrix[i][j] *= 2;
              matrix[z][j] = 0;
              increaseScore(matrix[i][j]);
              i = z;
            } else i = z + 1;
            break;
          }
        }

        let a = matrixSize - 1;
        for (let i = matrixSize - 2; i >= 0; i--) {
          if (matrix[i][j] == 0) continue;
          if (matrix[a][j] != 0) {
            a--;
          }
          if (a == i) continue;
          matrix[a][j] = matrix[i][j];
          matrix[i][j] = 0;
        }
      }
      break;

    case 'right':
      for (let i = 0; i < matrixSize; i++) {
        for (let j = matrixSize - 1; j > 0; j--) {
          if (matrix[i][j] == 0) continue;
          for (let z = j - 1; z >= 0; z--) { // сравнивает с предыдущими и соединяет
            if (matrix[i][z] == 0) continue;
            if (matrix[i][j] == matrix[i][z]) {
              matrix[i][j] *= 2;
              matrix[i][z] = 0;
              increaseScore(matrix[i][j]);
              j = z;
            } else j = z + 1;
            break;
          }
        }

        let a = matrixSize - 1;
        for (let j = matrixSize - 2; j >= 0; j--) {
          if (matrix[i][j] == 0) continue;
          if (matrix[i][a] != 0) {
            a--;
          }
          if (a == j) continue;
          matrix[i][a] = matrix[i][j];
          matrix[i][j] = 0;
        }
      }
      break;

    case 'left':
      for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize - 1; j++) {
          if (matrix[i][j] == 0) continue;
          for (let z = j + 1; z < matrixSize; z++) { // сравнивает с предыдущими и соединяет
            if (matrix[i][z] == 0) continue;
            if (matrix[i][j] == matrix[i][z]) {
              matrix[i][j] *= 2;
              matrix[i][z] = 0;
              increaseScore(matrix[i][j]);
              j = z;
            } else j = z - 1;
            break;
          }
        }

        let a = 0;
        for (let j = 1; j < matrixSize; j++) {
          if (matrix[i][j] == 0) continue;
          if (matrix[i][a] != 0) {
            a++;
          }
          if (a == j) continue;
          matrix[i][a] = matrix[i][j];
          matrix[i][j] = 0;
        }
      }
      break;
    default:
      console.log('wrong arg')
  }
}



console.log(a)
makeStep('up', a)
console.log(a)
console.log(score)
// console.log(score)
const field = document.querySelector('.field')

const cells = document.querySelectorAll('.cell')

function showCellsValues(cells, matrix) {
  cells.forEach(cell => {
    let i = +cell.id.slice(0, 1);
    let j = cell.id.slice(1);
    cell.innerText = matrix[i][j];
    console.log(typeof i)
  })
}
// showCellsValues(cells, matrix)
// console.log(cells)