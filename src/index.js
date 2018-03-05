module.exports = function solveSudoku(matrix) {
	
	let i, figures, k_row, row, k_column, column, obj = {}, isPresent, cot, rot, cross_cot, cross_rot, cross, without_cross, cot_r, rot_r;
	let findInSubsquares = function(){
		for (i=1; i<10; i+=1){
			obj[i+''] = 0;
		
			for (k_row=0; k_row<9; k_row+=3){
				for (k_column=0; k_column<9; k_column+=3){
					for (row=0+k_row; row<3+k_row; row+=1){
						for (column=0+k_column; column<3+k_column; column+=1){
							if(matrix[column]){
							if(i === matrix[column][row]){obj[i+''] += 1;}
							}
						}
					}
				}
			}
		}
		for (i=1; i<10; i+=1){
			if(obj[i+''] > 2){
				for (k_row=0; k_row<9; k_row+=3){
					for (k_column=0; k_column<9; k_column+=3){
						isPresent = false;
						for (row=0+k_row; row<3+k_row; row+=1){
							for (column=0+k_column; column<3+k_column; column+=1){							
								if(i === matrix[column][row]){isPresent = true;}
							}
						}
						if(!isPresent){ column -= 1; row -= 1;					
							
							without_cross = 0;						
							for (cot=column; cot>column-3; cot-=1){
								for (rot=row; rot>row-3; rot-=1){							
									if(matrix[cot][rot]===0){
										let findCross = function (cot,rot){
											cross=false;
											
											for(cross_cot=0; cross_cot<9; cross_cot+=1){
												if(i===matrix[cross_cot][rot]){cross=true; cross_cot = 10;}											
											}
											if(!cross){
												for(cross_rot=0; cross_rot<9; cross_rot+=1){
													if(i===matrix[cot][cross_rot]){cross=true; cross_rot = 10;}
												}
											}
											return cross;
										}
										if(!findCross(cot,rot)){without_cross+=1; cot_r = cot; rot_r = rot;}
									}
								}
							}
							if(without_cross===1){matrix[cot_r][rot_r]=i;}
						}
					}
				}
			}
		}
	}
	findInSubsquares();
	
	let findCross = function (item,x,y){
		cross=false;											
		for(let i=0; i<9; i+=1){
			if(matrix[i]){
				if(item===matrix[i][y]){cross=true; i = 10;}
			}
		}
		if(!cross){
			for(let n=0; n<9; n+=1){
				if(matrix[x]){
					if(item===matrix[x][n]){cross=true; n = 10;}
				}	
			}
		}
		return cross;
	}
	let findHorizontal = function(){
		let row_2, column_2, zero_2, digits_2,without_cross_2, row_return, column_return;
		for(row_2=0; row_2<9; row_2+=1){
			digits_2 = [];
			zero_2 = 0;
			obj_zeros = {};
			without_cross_2 = 0;		
			for(column_2=0; column_2<9; column_2+=1){
				if(matrix[row_2]){
					if(matrix[row_2][column_2]===0){
						zero_2+=1; 
						if(zero_2>3){
							column_2 = 10;
						}			
						else{obj_zeros[zero_2+'']=column_2;}						
					}			
					else{digits_2.push(matrix[row_2][column_2]);}
				}	
			}
			
			if(zero_2<=3){			
				digits_2 = digits_2.sort();	
				let m=1;
				let digits_2_length = digits_2.length;
				for(let i=1; i-1<digits_2_length; i+=1){
					if(digits_2[i-m]!==i){					
						m+=1;
						for(let k=1; k-1<zero_2; k+=1){
							if(!findCross(i,row_2,obj_zeros[k])){without_cross_2+=1; row_return = row_2; column_return = obj_zeros[k];}
						}
						if(without_cross_2===1){matrix[row_return][column_return]=i;}
					}			
				}
			}
		}
	}
	let findVertical = function(){
		let x, y, zero_2, digits_2,without_cross_2, row_return, column_return;
		for(y=0; y<9; y+=1){
			digits_2 = [];
			zero_2 = 0;
			obj_zeros = {};
			without_cross_2 = 0;		
			for(x=0; x<9; x+=1){
				if(matrix[x]){
					if(matrix[x][y]===0){
						zero_2+=1; 
						if(zero_2>3){
							y = 10;
						}			
						else{obj_zeros[zero_2+'']=y;}						
					}				
				else{digits_2.push(matrix[x][y]);}
				}
			}
			
			if(zero_2<=3){			
				digits_2 = digits_2.sort();	
				let m=1;
				let digits_2_length = digits_2.length;
				for(let i=1; i-1<digits_2_length; i+=1){
					if(digits_2[i-m]!==i){					
						m+=1;
						for(let k=1; k-1<zero_2; k+=1){
							if(!findCross(i,x,obj_zeros[k])){without_cross_2+=1; row_return = x; column_return = obj_zeros[k];}
						}
						if(without_cross_2===1){matrix[row_return][column_return]=i;}
					}			
				}
			}
		}
	}
	findHorizontal();
	findVertical();
	let findNumbers = function(){
		let arr;
		let zeros;	
		for(let x=0; x<9; x+=1){			
			for(let y=0; y<9; y+=1){
				if(matrix[x]){
					if(matrix[x][y]===0){
						zeros = 0;
						arr = [1,2,3,4,5,6,7,8,9];
						for(let i=0; i<9; i+=1){
							if(matrix[x][i]!==0){
								for(let j=0; j<9; j+=1){
									if(arr[j]===matrix[x][i]){arr[j] = 0;}
								}
							}
							if(matrix[i]){
								if(matrix[i][y]!==0){
									for(let j=0; j<9; j+=1){
										if(arr[j]===matrix[i][y]){arr[j] = 0;}
									}
								}
							}
						}
						for(let j=0; j<9; j+=1){
							if(arr[j]===0){zeros+=1;}
						}
						if(zeros===8){matrix[x][y]=Math.max.apply(Math, arr);}
					}
				}
			}
		}
	}
	
	findNumbers();
	findHorizontal();
	findVertical();	
	findNumbers();	

	let findNumbers_D = function(){
		let arr;
		let zeros;	
		for(let x=0; x<9; x+=1){			
			for(let y=0; y<9; y+=1){
			if(matrix[x]){
				if(matrix[x][y]===0){
					zeros = 0;
					arr = [1,2,3,4,5,6,7,8,9];
					for(let i=0; i<9; i+=1){
						if(matrix[x][i]!==0){
							for(let j=0; j<9; j+=1){
								if(arr[j]===matrix[x][i]){arr[j] = 0;}
							}
						}
						if(matrix[i]){
							if(matrix[i][y]!==0){						
								for(let j=0; j<9; j+=1){
									if(arr[j]===matrix[i][y]){arr[j] = 0;}
								}
							}
						}
					}
					for(let j=0; j<9; j+=1){
						if(arr[j]===0){zeros+=1;}
					}
					if(zeros===7){
						arr = arr.sort();
						matrix[x][y]=arr[7]; return;
					}
				}
			}
			}
		}
	}
	let findNumbers_A = function(){
		let arr;
		let zeros;	
		for(let x=0; x<9; x+=1){			
			for(let y=0; y<9; y+=1){
				if(matrix[x]){	
					if(matrix[x][y]===0){
						zeros = 0;
						arr = [1,2,3,4,5,6,7,8,9];
						for(let i=0; i<9; i+=1){
							if(matrix[x][i]!==0){
								for(let j=0; j<9; j+=1){
									if(arr[j]===matrix[x][i]){arr[j] = 0;}
								}
							}
							if(matrix[i]){
							if(matrix[i][y]!==0){
								for(let j=0; j<9; j+=1){
									if(arr[j]===matrix[i][y]){arr[j] = 0;}
								}
							}
							}
						}
						for(let j=0; j<9; j+=1){
							if(arr){if(arr[j]===0){zeros+=1;}}
						}
						if(zeros===7){
							arr = arr.sort();
							matrix[x][y]=arr[8];  return;
						}
					}
				}
			}
		}
	}
			
	let Default_massive = [];	
	for (let s=0; s<9; s+=1){
		Default_massive[s]=[];
		for (let p=0; p<9; p+=1){				
			Default_massive[s].push(matrix[s][p]);
		}
	}		
		
	findNumbers_D(); findNumbers();	findNumbers();	findNumbers_D(); findNumbers();	findNumbers_D(); findNumbers();	findNumbers_A(); findNumbers();	findNumbers_D(); findNumbers();	findNumbers_A(); findNumbers();	findNumbers_A(); findNumbers();	findInSubsquares();	findNumbers();	findNumbers_D(); findNumbers();	findInSubsquares();	findNumbers_D(); findNumbers();	findInSubsquares();	findNumbers_A(); findNumbers();
	
	let result = 0;
	for(let x=0; x<9; x+=1){			
			for(let y=0; y<9; y+=1){
				result+=matrix[x][y];
			}
	}	
	if (result===405){return matrix;}
	
	else if(1){		
		matrix=[];
		for (let s=0; s<9; s+=1){			
			matrix[s]=[];
			for (let p=0; p<9; p+=1){				
				matrix[s].push(Default_massive[s][p]);
			}
		}
		findInSubsquares();	findNumbers();	findInSubsquares();	findNumbers();	findInSubsquares();	findNumbers();	findInSubsquares();
		
		result = 0;
		for(let x=0; x<9; x+=1){			
			for(let y=0; y<9; y+=1){
				if(matrix[x]){
					result+=matrix[x][y];
				}	
			}
		}
		if (result===405){return matrix;}

		else if(1){		
			matrix=[];
			for (let s=0; s<9; s+=1){			
				matrix[s]=[];
				for (let p=0; p<9; p+=1){				
					matrix[s].push(Default_massive[s][p]);
				}
			}
			findInSubsquares();	findNumbers();	findInSubsquares();	findNumbers();	findInSubsquares();	findNumbers_A(); findNumbers();	findInSubsquares();	findNumbers();	findInSubsquares();	findNumbers();	findInSubsquares();	findNumbers_A(); findNumbers(); findInSubsquares();	
			
			result = 0;
			for(let x=0; x<9; x+=1){			
				for(let y=0; y<9; y+=1){
					if(matrix[x]){
						result+=matrix[x][y];
					}	
				}
			}
			if (result===405){return matrix;}
	
			else if(1){		
				matrix=[];
				for (let s=0; s<9; s+=1){			
					matrix[s]=[];
					for (let p=0; p<9; p+=1){				
						matrix[s].push(Default_massive[s][p]);
					}
				}
				findNumbers_A(); findNumbers();	findNumbers_A(); findNumbers();	findNumbers_D(); findNumbers();	findNumbers_D(); findNumbers();	findNumbers_A(); findNumbers(); findNumbers_D(); findNumbers();	findNumbers_A(); findNumbers(); findInSubsquares();	findNumbers();	findNumbers_A(); findNumbers();	findInSubsquares();	findNumbers_D(); findNumbers();	findInSubsquares();				
				
				result = 0;
				for(let x=0; x<9; x+=1){			
					for(let y=0; y<9; y+=1){
						if(matrix[x]){
							result+=matrix[x][y];
						}	
					}
				}
				if (result===405){return matrix;}

			}
		}
	}
}