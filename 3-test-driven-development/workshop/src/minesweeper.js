class Cell {
    constructor(col, row, hasBomb = false) {
        this.col = col
        this.row = row
        this.hasBomb = hasBomb
        this.surroundingBombs = 0
    }

    addBombCount() {
        this.surroundingBombs++
    }

    setMineStatus(newStatus) {
        this.hasBomb = newStatus
    }

    displayChar() {
        if (this.hasBomb) {
            return '*'
        } else {
            return `${this.surroundingBombs}`
        }
    }
}

class Minesweeper {
    constructor(cols, rows) {
        this.cols = cols
        this.rows = rows
    }

    buildBoard() {
        let board = this.emptyBoardOf(this.cols, this.rows)

        this.mines.forEach(([col, row])=> {
            col--
            row--

            if (!this.isCellInBound(board, col, row)) {
                return
            }

            board[row][col].setMineStatus(true)

            let neighbours = [
                [col-1, row-1], [col, row-1], [col+1, row-1],
                [col-1, row],                 [col+1, row],
                [col-1, row+1], [col, row+1], [col+1, row+1]
            ]

            neighbours.filter(([col, row]) => {
                return this.isCellInBound(board, col, row)
            }).forEach(([col, row]) => {
                board[row][col].addBombCount()
            })
        })

        return board
    }

    showBoard() {
        if(this.rows === 0 || this.cols === 0){
            return null
        }

        const board = this.buildBoard()

        let boardStr = ''
        board.forEach((row) => {
            row.forEach((cell) => {
                boardStr += cell.displayChar()
            })
            boardStr += "\n"
        })

        return boardStr.trim()
    }

    isCellInBound(board, col, row) {
        return board[row] && board[row][col]
    }

    emptyBoardOf(cols, rows) {
        let board = []

        for(let i=1; i<=rows; i++){
            let newRow = []
            for(let j=1; j<=cols; j++){
                const newCell = new Cell(j, i)
                newRow.push(newCell)
            }
            board.push(newRow)
        }

        return board
    }

    setMines(mines) {
        this.mines = mines
    }
}

const input = "3 3\n" +
    "*...\n" +
    "....\n" +
    ".*.." +
"3 3\n" +
"*...\n" +
"....\n" +
".*..";

class MinesweeperReader {
    constructor(input) {
        this.input = input
    }

    read() {
        let lines = this.input.split("\n")
        const [cols, rows] = lines[0].split(" ").map(Number)
        const minesCoordinates = lines.slice(1).map((line, lineIndex) => {
            return line.split("").map((char, charIndex) => {
                if(char === '*'){
                    return [charIndex+1, lineIndex+1]
                }
            }).filter(Array.isArray)
        })
        .flat()

        const minesweeper = new Minesweeper(cols, rows)
        minesweeper.setMines(minesCoordinates)

        return minesweeper.showBoard()
    }

}

module.exports = {
    Minesweeper,
    Cell,
    MinesweeperReader
}