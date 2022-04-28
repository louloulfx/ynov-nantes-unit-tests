const {Minesweeper, MinesweeperReader} = require('../src/minesweeper');

test('Empty response for 0, 0', () => {
    //Given
    const input = '0,0'

    //When
    const fields = new MinesweeperReader(input)

    //Then
    expect(fields.read()).toBe("")
})

test('return board with mines for grid of 3*3', () => {
    //Given
    const input = "3 3\n" +
        "*..\n" +
        "...\n" +
        ".*.";

    //When
    const fields = new MinesweeperReader(input)

    //Then
    expect(fields.read()).toBe("*10\n221\n1*1")
})


test('Blank response for 4, 3', () => {
    //Given
    const input = "4 3\n" +
        "....\n" +
        "....\n" +
        "...."

    //When
    const fields = new MinesweeperReader(input)

    //Then
    expect(fields.read()).toBe("0000\n0000\n0000")
})

test('return board with mines for grid of 3*2', () => {
    //Given
    const input = "3 2\n" +
        ".*.\n" +
        "...\n"

    //When
    const fields = new MinesweeperReader(input)

    //Then
    expect(fields.read()).toBe("1*1\n111")
})

test('return board with mines for grid of 5*3', () => {
    //Given
    const input = "5 3\n" +
        "**...\n" +
        ".....\n" +
        ".*...\n"

    //When
    const fields = new MinesweeperReader(input)

    //Then
    expect(fields.read()).toBe("**100\n33200\n1*100")
})

test('return board with mines for grid of 12*6', () => {


    //Given
    const input = "12 6\n" +
        "............\n" +
        "............\n" +
        "............\n" +
        "....*.......\n" +
        "............\n" +
        "............\n"

    //When
    const fields = new MinesweeperReader(input)

    //Then
    expect(fields.read()).toBe("000000000000\n000000000000\n000111000000\n0001*1000000\n000111000000\n000000000000")
})