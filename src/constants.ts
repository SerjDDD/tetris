export const FIELD_HEIGHT: number = 20;
export const FIELD_WIDTH: number = 10;

export const SCORE_1LINE: number = 40;
export const SCORE_2LINES: number = 100;
export const SCORE_3LINES: number = 300;
export const SCORE_TETRIS: number = 1200;

export const SCORES: number[] = [
    SCORE_1LINE,
    SCORE_2LINES,
    SCORE_3LINES,
    SCORE_TETRIS,
];

export enum Keys {
    UP = 38,
    DOWN = 40,
    LEFT = 37,
    RIGHT = 39,
    ROTATE_LEFT = 90,
    ROTATE_RIGHT = 88,
    SELECT = 16,
    ENTER = 13,
}

export enum Tetrominos {
    I,
    J,
    L,
    O,
    S,
    T,
    Z,
}

export const TETROMINOS_COUNT = 7;
export const TETROMINOS_SHAPE_SIZE = 4;

export type TetrominoShape = (Tetrominos | null)[][];
export type TetrominoShapes = TetrominoShape[];

export interface TetrominosMap {
    [Tetrominos.I]: TetrominoShapes;
    [Tetrominos.J]: TetrominoShapes;
    [Tetrominos.L]: TetrominoShapes;
    [Tetrominos.O]: TetrominoShapes;
    [Tetrominos.S]: TetrominoShapes;
    [Tetrominos.T]: TetrominoShapes;
    [Tetrominos.Z]: TetrominoShapes;
}

const TR = Tetrominos;
export const TETROMINOS: TetrominosMap = {
    [Tetrominos.I]: [
        [
            [TR.I, TR.I, TR.I, TR.I],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
        ],
        [
            [null, TR.I, null, null],
            [null, TR.I, null, null],
            [null, TR.I, null, null],
            [null, TR.I, null, null],
        ],
    ],
    [Tetrominos.J]: [
        [
            [TR.J, null, null, null],
            [TR.J, TR.J, TR.J, null],
            [null, null, null, null],
            [null, null, null, null],
        ],
        [
            [null, TR.J, TR.J, null],
            [null, TR.J, null, null],
            [null, TR.J, null, null],
            [null, null, null, null],
        ],
        [
            [TR.J, TR.J, TR.J, null],
            [null, null, TR.J, null],
            [null, null, null, null],
            [null, null, null, null],
        ],
        [
            [null, TR.J, null, null],
            [null, TR.J, null, null],
            [TR.J, TR.J, null, null],
            [null, null, null, null],
        ],

    ],
    [Tetrominos.L]: [
        [
            [null, null, TR.L, null],
            [TR.L, TR.L, TR.L, null],
            [null, null, null, null],
            [null, null, null, null],
        ],
        [
            [null, TR.L, null, null],
            [null, TR.L, null, null],
            [null, TR.L, TR.L, null],
            [null, null, null, null],
        ],
        [
            [TR.L, TR.L, TR.L, null],
            [TR.L, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
        ],
        [
            [TR.L, TR.L, null, null],
            [null, TR.L, null, null],
            [null, TR.L, null, null],
            [null, null, null, null],
        ],

    ],
    [Tetrominos.O]: [
        [
            [null, TR.O, TR.O, null],
            [null, TR.O, TR.O, null],
            [null, null, null, null],
            [null, null, null, null],
        ],
    ],
    [Tetrominos.S]: [
        [
            [null, TR.S, TR.S, null],
            [TR.S, TR.S, null, null],
            [null, null, null, null],
            [null, null, null, null],
        ],
        [
            [null, TR.S, null, null],
            [null, TR.S, TR.S, null],
            [null, null, TR.S, null],
            [null, null, null, null],
        ],
    ],
    [Tetrominos.T]: [
        [
            [null, TR.T, null, null],
            [TR.T, TR.T, TR.T, null],
            [null, null, null, null],
            [null, null, null, null],
        ],
        [
            [null, TR.T, null, null],
            [null, TR.T, TR.T, null],
            [null, TR.T, null, null],
            [null, null, null, null],
        ],
        [
            [TR.T, TR.T, TR.T, null],
            [null, TR.T, null, null],
            [null, null, null, null],
            [null, null, null, null],
        ],
        [
            [null, TR.T, null, null],
            [TR.T, TR.T, null, null],
            [null, TR.T, null, null],
            [null, null, null, null],
        ],
    ],
    [Tetrominos.Z]: [
        [
            [TR.Z, TR.Z, null, null],
            [null, TR.Z, TR.Z, null],
            [null, null, null, null],
            [null, null, null, null],
        ],
        [
            [null, null, TR.Z, null],
            [null, TR.Z, TR.Z, null],
            [null, TR.Z, null, null],
            [null, null, null, null],
        ],
    ],
};

export const NULL_SHAPE: TetrominoShape = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
]
