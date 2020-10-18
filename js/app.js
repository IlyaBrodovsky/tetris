
let overlay = document.querySelector('.overlay')
let modal = document.querySelector('.modal')
let modalControl = document.querySelector('.modalControl')
let mainScreen = document.querySelector('.modalscreen') 
let speed = 0 

//mainScreen
mainScreen.addEventListener('click', function(event) {
	if (event.target.classList.contains('start')) {
		mainScreen.style.display = 'none'
	}
})

// modal window control

modalControl.addEventListener('click', function(event) {
	if (event.target.classList.contains('okay')) {
		modalControl.style.display = 'none'	
	}
})
// modal window difficulty
modal.addEventListener('click', function(event) {

	if (event.target.classList.contains('easy')) {
			speed = 1000
	} else if (event.target.classList.contains('normal')) {
		speed = 500 
	} else if (event.target.classList.contains('hard')) {
		speed = 300
	}
	if (event.target.classList.contains('button')) {
		modal.style.display = 'none'
		overlay.style.display = 'none'
		startGame()
	}

})


function startGame () {
	
// music game 
document.getElementById('sound-tetris').play();

	let tetris = document.createElement('div')
	tetris.classList.add('tetris')


	for (let i = 1; i < 181; i++) {
		let excel = document.createElement('div')
		excel.classList.add('excel')
		tetris.appendChild(excel)
	}

let main = document.getElementsByClassName('main')[0]
main.appendChild(tetris)

let excel = document.getElementsByClassName('excel')
let i = 0

	for (let y = 18; y > 0; y--) {
		for (let x = 1; x < 11; x++) {
			excel[i].setAttribute('posX', x)
			excel[i].setAttribute('posY', y)
			i++ 
		}
	}

// create figure

let x = 5, y = 15

let mainArr=[[[0,1],[0,2],[0,3],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]]],[[1,0],[0,1],[1,1],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]]],[[1,0],[0,1],[0,2],[[0,0],[-1,1],[1,0],[2,-1]],[[1,-1],[1,-1],[-1,0],[-1,0]],[[-1,0],[0,-1],[2,-2],[1,-1]],[[0,-1],[0,-1],[-2,0],[-2,0]]],[[1,0],[1,1],[1,2],[[0,0],[0,0],[1,-1],[-1,-1]],[[0,-1],[-1,0],[-2,1],[1,0]],[[2,0],[0,0],[1,-1],[1,-1]],[[-2,0],[1,-1],[0,0],[-1,1]]],[[1,0],[-1,1],[0,1],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]]],[[1,0],[1,1],[2,1],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]]],[[1,0],[2,0],[1,1],[[1,-1],[0,0],[0,0],[0,0]],[[0,0],[-1,0],[-1,0],[1,-1]],[[1,-1],[1,-1],[1,-1],[0,0]],[[-2,0],[0,-1],[0,-1],[-1,-1]]]];

let rotate = 0
let currentFigure = 0
let figureBody = 0

function create () {

	function getRandom () {

		return Math.round(Math.random() * (mainArr.length - 1)) 
	}
	rotate = 1
	currentFigure = getRandom()

	figureBody = [
		document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),

	]

	for (let i = 0; i < figureBody.length; i++) {
		figureBody[i].classList.add('figure')
	}

}
create()

// Scoring

let score = 0
let input = document.getElementsByTagName('input')[0]
input.value = `Ваши очки ${score}`


// movement of figures


function move () {

	let moveFlag = true

	let coordinates = [
		[figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY') ],
		[figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY') ],
		[figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY') ],
		[figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY') ],
	]

	for (let i = 0; i < coordinates.length; i++) {
		if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
			moveFlag = false
			break
		}
	}
	if (moveFlag) {
		for (let i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.remove('figure') 
		}

		figureBody = [
			document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] -1}"]`),
			document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] -1}"]`),
			document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] -1}"]`),
			document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] -1}"]`),
		]

		for (let i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.add('figure')
		}
 	} else {
 		for (let i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.remove('figure') 
			figureBody[i].classList.add('set') 

 		}
 		for (let i = 1; i < 15; i++) {
 			let count = 0
 			for (let k = 1; k < 11; k++) {
 				if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
 					count++
 					if (count == 10) {
 						score += 10
 						input.value = `Ваши очки ${score}`
 						for (let m = 1; m < 11; m++) {
 							document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
 						}
 						let set = document.querySelectorAll('.set')
 						newSet = []
 						for (let s = 0; s < set.length; s++) {
 							let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY') ]
 							if (setCoordinates[1] > i) {
 								set[s].classList.remove('set')
 								newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`)) 
 							}
 						}
 						for (let a = 0; a < newSet.length; a++) {
 							newSet[a].classList.add('set')
 						}
 						i--
 					}
 				}
 			} 
 		}
 		for (let n = 1; n < 11; n++) {
 			if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
 				clearInterval(interval)
 				alert(`Ваши очки ${score}`)
 			}
 		}
 		create()
 	}	
}
let interval = setInterval(() => {
	move()
}, speed)

let flag = true

function getCoordinates () {

	let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')]
	let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')]
	let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')]
	let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]

	return [coordinates1, coordinates2, coordinates3, coordinates4]
}
function getRotate () {

	flag = true

	let [coordinates1, coordinates2, coordinates3, coordinates4] = getCoordinates()

	let figureNew = [
		document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),

		document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),

		document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),

		document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),	
	]

	for (let i = 0; i < figureNew.length; i ++) {
		if (!figureNew[i] || figureNew[i].classList.contains('set')) {
			flag = false
		}
	}
	if (flag) {
		for (let i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.remove('figure')
		}
		figureBody = figureNew
		for (let i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.add('figure')
		}
		if (rotate < 4) {
			rotate++
		} else {
			rotate = 1
		}
	}
}

function getNewState (a) {

	let [coordinates1, coordinates2, coordinates3, coordinates4] = getCoordinates()

	flag = true

	let figureNew = [

		document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
		document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
		document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
		document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
	]

	for (let i = 0; i < figureNew.length; i++) {
		if (!figureNew[i] || figureNew[i].classList.contains('set')) {
			flag = false
		}
	}
	if (flag) {
		for (let i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.remove('figure')
		}
		figureBody = figureNew
		for (let i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.add('figure')
		}
	}		
}   

document.getElementById('left').addEventListener('click', () => getNewState(-1))
document.getElementById('right').addEventListener('click', () => getNewState(1))
document.getElementById('down').addEventListener('click', () => move())
document.getElementById('up').addEventListener('click', () => getRotate())

window.addEventListener('keydown', function (event) {

	let [coordinates1, coordinates2, coordinates3, coordinates4] = getCoordinates()

	if (event.keyCode == 37 ) {
		getNewState(-1)
	} else if (event.keyCode == 39) {
		getNewState(1)
	} else if (event.keyCode == 40) {
		move()
	} else if (event.keyCode == 38) {
		flag = true 

		let figureNew = [
		document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),

		document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),

		document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),

		document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),	
	]

	for (let i = 0; i < figureNew.length; i++) {
		if (!figureNew[i] || figureNew[i].classList.contains('set')) {
			flag = false
		}
	}
	if (flag) {
		for (let i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.remove('figure')
		}
		figureBody = figureNew
		for (let i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.add('figure')
		}
		if (rotate < 4) {
			rotate++
		} else {
			rotate = 1
		}
	}

	}
})
}