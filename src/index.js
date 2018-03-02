module.exports = function solveSudoku(matrix) {
  let k, m, p = 1;
  for(m = 0; m<9; m += 1){
	for(k = 0; k<9; k += 1){
		if(matrix[m][k] === 0){matrix[m][k] = p; p += 1;}
	}
  } 
  return matrix;
}
