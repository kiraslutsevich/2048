const matrixSize = 4;
const matrix = new Array(matrixSize).fill().map(() => new Array(matrixSize).fill(0))
const prevMatrix = [];

const newGame = function () {
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
  let randomCell = Math.floor(Math.random() * (freeCellsIndices.length));
  let randomCellValue = Math.round(Math.random());
  let randomCellRow = freeCellsIndices[randomCell][0];
  let randomCellCol = freeCellsIndices[randomCell][1];
  matrix[randomCellRow][randomCellCol] = (randomCellValue) ? 2 : 4;
}

// j - column, i - row

const makeMove = function (move) {
  switch (move) {
    case 'up':
      for (let j = 0; j < matrixSize; j++) {
        for (let i = matrixSize - 1; i > 0; i--) {
          if (matrix[i][j] == 0) continue;
          for (let z = i - 1; z >= 0; z--) { // сравнивает с предыдущими и соединяет
            if (matrix[z][j] == 0) continue;
            if (matrix[i][j] == matrix[z][j]) {
              matrix[z][j] *= 2;
              matrix[i][j] = 0;
              i = z - 1;
            } else i = z;
            break;
          }
        }

        let a = 0;
        for (let i = 1; i < matrixSize; i++) {
          if (matrix[i][j] == 0) continue;
          matrix[a][j] = matrix[i][j];
          matrix[i][j] = 0;
          a++;
        }
      }
      break;

    case 'down':
      for (let j = 0; j < matrixSize; j++) {
        for (let i = 0; i < matrixSize - 1; i++) {
          if (matrix[i][j] == 0) continue;
          for (let z = i + 1; z < matrixSize; z++) { // сравнивает с предыдущими и соединяет
            if (matrix[z][j] == 0) continue;
            if (matrix[i][j] == matrix[z][j]) {
              matrix[z][j] *= 2;
              matrix[i][j] = 0;
              i = z + 1;
            } else i = z;
            break;
          }
        }

        let a = matrixSize - 1;
        for (let i = matrixSize - 2; i >= 0; i--) {
          if (matrix[i][j] == 0) continue;
          matrix[a][j] = matrix[i][j];
          matrix[i][j] = 0;
          a--;
        }
      }
      break;

    case 'right':
      for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize - 1; j++) {
          if (matrix[i][j] == 0) continue;
          for (let z = j + 1; z < matrixSize; z++) { // сравнивает с предыдущими и соединяет
            if (matrix[i][z] == 0) continue;
            if (matrix[i][j] == matrix[i][z]) {
              matrix[i][z] *= 2;
              matrix[i][j] = 0;
              j = z + 1;
            } else j = z;
            break;
          }
        }

        let a = matrixSize - 1;
        for (let j = matrixSize - 2; j >= 0; j--) {
          if (matrix[i][j] == 0) continue;
          matrix[i][a] = matrix[i][j];
          matrix[i][j] = 0;
          a--;
        }
      }
      break;

    case 'left':
      for (let i = 0; i < matrixSize; i++) {
        for (let j = matrixSize - 1; j > 0; j--) {
          if (matrix[i][j] == 0) continue;
          for (let z = j - 1; z >= 0; z--) { // сравнивает с предыдущими и соединяет
            if (matrix[i][z] == 0) continue;
            if (matrix[i][j] == matrix[i][z]) {
              matrix[i][z] *= 2;
              matrix[i][j] = 0;
              j = z - 1;
            } else j = z;
            break;
          }
        }

        let a = 0;
        for (let j = 1; j < matrixSize; j++) {
          if (matrix[i][j] == 0) continue;
          matrix[i][a] = matrix[i][j];
          matrix[i][j] = 0;
          a++;
        }
      }
      break;
    default:
      console.log('wrong arg')
  }
}


