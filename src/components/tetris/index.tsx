import * as React from 'react';
import TetrisField from './components/field';
import TetrisWins from './components/wins';
import { Tetrominos, FIELD_HEIGHT, FIELD_WIDTH, TetrominoShape, NULL_SHAPE, TETROMINOS, TETROMINOS_COUNT, Keys, TETROMINOS_SHAPE_SIZE, SCORES } from '../../constants';
import TetrisScore from './components/score';
import TetrisLines from './components/lines';
import TetrisLevel from './components/level';
import './styles.css';
import TetrisBox from './components/box';
import TetrisNext from './components/next';
import TetrisRate from './components/rate';

export enum TetrisPanelPosition {
    LEFT,
    RIGHT,
};

export interface TetrisProps {
    fieldHeight: number;
    fieldWidth: number;
    panelPosition?: TetrisPanelPosition;
    startLevel: number;
};

interface ActiveTetromino {
    type: Tetrominos;
    state: number;
    x: number;
    y: number;
}

interface TetrisState {
    burn: number;
    field: TetrominoShape;
    iago: number;
    level: number;
    lines: number;
    nextTetromino: Tetrominos | null;
    paused: boolean;
    score: number;
    tetrisLines: number;
    tetromino: ActiveTetromino | null;
};

export default class Tetris extends React.PureComponent<TetrisProps, TetrisState> {

    private readonly tetrisElement: React.RefObject<HTMLElement>;
    private framesCount: number = 0;

    constructor(props: Readonly<TetrisProps>) {

        super(props);

        this.generateField = this.generateField.bind(this);
        this.getFieldWithActiveTetromino = this.getFieldWithActiveTetromino.bind(this);
        this.removeLines = this.removeLines.bind(this);
        this.calculateScore = this.calculateScore.bind(this);
        this.getCurrentLevel = this.getCurrentLevel.bind(this);
        this.getActiveTetrominoShape = this.getActiveTetrominoShape.bind(this);
        this.getNextTetrominoShape = this.getNextTetrominoShape.bind(this);
        this.getRandomTetromino = this.getRandomTetromino.bind(this);
        this.createTetromino = this.createTetromino.bind(this);
        this.getBufferLeft = this.getBufferLeft.bind(this);
        this.getBufferRight = this.getBufferRight.bind(this);
        this.getBufferDown = this.getBufferDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.rotateLeft = this.rotateLeft.bind(this);
        this.rotateRight = this.rotateRight.bind(this);
        this.shiftTetromino = this.shiftTetromino.bind(this);
        this.hasOverlaps = this.hasOverlaps.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
        this.getFramesPerLevel = this.getFramesPerLevel.bind(this);
        this.processFrame = this.processFrame.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.pause = this.pause.bind(this);
        this.adjustFieldSize = this.adjustFieldSize.bind(this);
        this.adjustNextTetrominoSize = this.adjustNextTetrominoSize.bind(this);

        this.tetrisElement = React.createRef<HTMLElement>();

        this.state = {
            burn: 0,
            field: this.generateField(),
            iago: 0,
            level: props.startLevel,
            lines: 0,
            nextTetromino: null,
            paused: true,
            score: 0,
            tetrisLines: 0,
            tetromino: null,
        };
    }

    private generateField(): TetrominoShape {

        const { fieldHeight, fieldWidth } = this.props;
        return new Array(fieldHeight).fill(undefined).map(
            (): null[] => (new Array(fieldWidth)).fill(null)
        );
    }

    private getFieldWithActiveTetromino(): TetrominoShape {

        const { field, tetromino } = this.state;

        if (tetromino === null) {

            return field;
        }

        const tetrominoShape: TetrominoShape = this.getActiveTetrominoShape();

        return field.map(
            (line: (Tetrominos | null)[], lineIndex: number): (Tetrominos | null)[] => (
                line.map(
                    (cell: Tetrominos | null, cellIndex: number): Tetrominos | null => {

                        if (cell !== null) {

                            return cell;
                        }

                        if (lineIndex >= tetromino.y && lineIndex < tetromino.y + tetrominoShape.length) {
                            if (cellIndex >= tetromino.x && cellIndex < tetromino.x + tetrominoShape[lineIndex - tetromino.y].length) {

                                return tetrominoShape[lineIndex - tetromino.y][cellIndex - tetromino.x];
                            }
                        }

                        return null;
                    }
                )
            ),
        );
    }

    private removeLines(field: TetrominoShape): { burn: number, field: TetrominoShape, lines: number, level: number, tetrisLines: number, score: number } {

        const emptyField: TetrominoShape = this.generateField();
        const fieldLines: TetrominoShape = field.filter((line: any[]): boolean => !line.every((cell: any): boolean => cell !== null));

        const { startLevel } = this.props;
        const { burn, lines, tetrisLines, score } = this.state;

        const removedLines = FIELD_HEIGHT - fieldLines.length;
        const updatedField = [ ...emptyField, ...fieldLines ].reverse().slice(0, FIELD_HEIGHT).reverse();
        const updatedLines = lines + removedLines;
        const updatedTetrisLines = removedLines === 4 ? tetrisLines + removedLines : tetrisLines;
        const updatedLevel = this.getCurrentLevel(startLevel, updatedLines);
        const updatedScore = score + this.calculateScore(updatedLevel, removedLines);

        return {
            burn: removedLines ? removedLines === 4 ? 0 : burn + removedLines : burn,
            field: updatedField,
            lines: updatedLines,
            level: updatedLevel,
            tetrisLines: updatedTetrisLines,
            score: updatedScore,
        };
    }

    private calculateScore(level: number, lines: number): number {

        if (lines === 0) {

            return 0;
        }

        const baseScore: number =  SCORES[lines - 1];
        return baseScore * (level + 1);
    }

    private getCurrentLevel(startLevel: number, lines: number): number {

        const a: number = startLevel * 10 + 10;
        const b: number = Math.max(100, startLevel * 10 - 50);
        const increasingNumber: number = Math.min(a, b);

        const diference: number = lines - increasingNumber;
        if (diference < 0) {

            return startLevel;
        }

        return startLevel + Math.floor(diference / 10) + 1;
    }

    private getActiveTetrominoShape(): TetrominoShape {

        const { tetromino } = this.state;

        if (tetromino === null) {

            return NULL_SHAPE;
        }

        return TETROMINOS[tetromino.type][tetromino.state];
    }

    private getNextTetrominoShape(): TetrominoShape {

        const { nextTetromino } = this.state;

        if (nextTetromino === null) {

            return NULL_SHAPE;
        }

        return TETROMINOS[nextTetromino][0].filter((line: (Tetrominos | null)[], index: number): boolean => index < 2);
    }

    private getRandomTetromino(): Tetrominos {

        return Math.floor(Math.random() * TETROMINOS_COUNT);
    }

    private createTetromino(type: Tetrominos): ActiveTetromino {

        return {
            type,
            state: 0,
            x: 3,
            y: 0,
        };
    }

    private getBufferLeft(shape: TetrominoShape): number {

        return shape.reduce(
            (acc: number, line: (Tetrominos | null)[]): number => {
                const offset: number = line.findIndex(
                    (cell: Tetrominos | null): boolean => cell !== null,
                );
                if (offset === -1) {
                    return acc;
                }
                return Math.min(acc, offset);
            },
            TETROMINOS_SHAPE_SIZE,
        );
    }

    private getBufferRight(shape: TetrominoShape): number {

        return shape.reduce(
            (acc: number, line: (Tetrominos | null)[]): number => {
                const offset: number = [...line].reverse().findIndex(
                    (cell: Tetrominos | null): boolean => cell !== null,
                );
                if (offset === -1) {
                    return acc;
                }
                return Math.min(acc, offset);
            },
            TETROMINOS_SHAPE_SIZE,
        );
    }

    private getBufferDown(shape: TetrominoShape): number {

        let buffer: number = 0;
        for (let i = shape.length - 1; i >= 0; i -= 1) {
            const line: (Tetrominos | null)[] = shape[i];
            if (line.findIndex((cell: Tetrominos | null): boolean => cell !== null) !== -1) {
                break;
            }

            buffer += 1;
        }
        return buffer;
    }

    private moveLeft(): void {

        this.setState(
            (prevState: Readonly<TetrisState>, props: Readonly<TetrisProps>): Pick<TetrisState, 'tetromino'> => {

                if (prevState.tetromino === null) {

                    return prevState;
                }

                const tetromino: ActiveTetromino = {
                    ...prevState.tetromino!
                };

                const shape: TetrominoShape = this.getActiveTetrominoShape();
                const availableBuffer: number = this.getBufferLeft(shape);

                if ((tetromino.x + availableBuffer) > 0) {

                    tetromino.x -= 1;
                }

                if (this.hasOverlaps(tetromino)) {

                    return prevState;
                }

                return { tetromino };
            },
        );
    }

    private moveRight(): void {

        this.setState(
            (prevState: Readonly<TetrisState>, props: Readonly<TetrisProps>): Pick<TetrisState, 'tetromino'> => {

                if (prevState.tetromino === null) {

                    return prevState;
                }

                const tetromino: ActiveTetromino = {
                    ...prevState.tetromino!
                };

                const shape: TetrominoShape = this.getActiveTetrominoShape();
                const availableBuffer: number = this.getBufferRight(shape);

                if (tetromino.x < (props.fieldWidth + availableBuffer - TETROMINOS_SHAPE_SIZE)) {

                    tetromino.x += 1;
                }

                if (this.hasOverlaps(tetromino)) {

                    return prevState;
                }

                return { tetromino };
            },
        );
    }

    private moveDown(): void {

        this.setState(
            (prevState: Readonly<TetrisState>, props: Readonly<TetrisProps>): Pick<TetrisState, 'field' | 'tetromino'> => {

                if (prevState.tetromino === null) {

                    return prevState;
                }

                const tetromino: ActiveTetromino = {
                    ...prevState.tetromino!
                };

                const shape: TetrominoShape = this.getActiveTetrominoShape();
                const availableBuffer: number = this.getBufferDown(shape);

                if (((props.fieldHeight + availableBuffer) - (tetromino.y + TETROMINOS_SHAPE_SIZE) - 1) >= 0) {

                    tetromino.y += 1;
                } else {

                    return {
                        ...this.removeLines(this.getFieldWithActiveTetromino()),
                        tetromino: null,
                    };
                }

                if (this.hasOverlaps(tetromino)) {

                    return {
                        ...this.removeLines(this.getFieldWithActiveTetromino()),
                        tetromino: null,
                    };
                }

                return {
                    field: prevState.field,
                    tetromino
                };
            },
        );
    }

    private rotateLeft(): void {

        this.setState(
            (prevState: Readonly<TetrisState>, props: Readonly<TetrisProps>): Pick<TetrisState, 'tetromino'> => {

                if (prevState.tetromino === null) {

                    return prevState;
                }

                let tetromino: ActiveTetromino = {
                    ...prevState.tetromino!
                };

                const lastShape: number = TETROMINOS[tetromino.type].length - 1;
                tetromino.state = tetromino.state === 0 ? lastShape : tetromino.state - 1;

                tetromino = this.shiftTetromino(tetromino);
                if (this.hasOverlaps(tetromino)) {

                    return prevState;
                }

                return { tetromino };
            },
        );
    }

    private rotateRight(): void {

        this.setState(
            (prevState: Readonly<TetrisState>, props: Readonly<TetrisProps>): Pick<TetrisState, 'tetromino'> => {

                if (prevState.tetromino === null) {

                    return prevState;
                }

                let tetromino: ActiveTetromino = {
                    ...prevState.tetromino!
                };

                const lastShape: number = TETROMINOS[tetromino.type].length - 1;
                tetromino.state = tetromino.state === lastShape ? 0 : tetromino.state + 1;

                tetromino = this.shiftTetromino(tetromino);
                if (this.hasOverlaps(tetromino)) {

                    return prevState;
                }

                return { tetromino };
            },
        );
    }

    private shiftTetromino(tetromino: ActiveTetromino): ActiveTetromino {

        const { fieldWidth } = this.props;
        const shape: TetrominoShape = TETROMINOS[tetromino.type][tetromino.state];

        const leftBuffer: number = this.getBufferLeft(shape);
        if ((tetromino.x + leftBuffer) < 0) {

            tetromino.x = 0;
        }

        const rightBuffer: number = this.getBufferRight(shape);
        if (tetromino.x > (fieldWidth + rightBuffer - TETROMINOS_SHAPE_SIZE)) {

            tetromino.x = fieldWidth + rightBuffer - TETROMINOS_SHAPE_SIZE;
        }

        return tetromino;
    }

    private hasOverlaps(tetromino: ActiveTetromino) {

        const { field } = this.state;
        const shape: TetrominoShape = TETROMINOS[tetromino.type][tetromino.state];

        for (let i = 0, li = shape.length; i < li; i += 1) {
            for (let j = 0, lj = shape[i].length; j < lj; j += 1) {

                if (shape[i][j] === null) {

                    continue;
                }

                const fieldCell: Tetrominos | null = field[tetromino.y + i][tetromino.x + j];
                if (fieldCell === null || fieldCell === undefined) {

                    continue;
                }

                return true;
            }
        }

        return false;
    }

    private keyPressed(event: KeyboardEvent): void {

        const { paused } = this.state;

        if (paused && event.keyCode !== Keys.ENTER && event.keyCode !== Keys.SELECT) {
            return;
        }

        switch (event.keyCode) {

            case Keys.LEFT:
                this.moveLeft();
                break;

            case Keys.RIGHT:
                this.moveRight();
                break;

            case Keys.UP:
                this.rotateRight();
                break;

            case Keys.DOWN:
                this.moveDown();
                break;

            case Keys.ROTATE_LEFT:
                this.rotateLeft();
                break;

            case Keys.ROTATE_RIGHT:
                this.rotateRight();
                break;

            case Keys.SELECT:
                break;

            case Keys.ENTER:
                this.pause();
                break;

            default:
                break;
        }
    }

    private getFramesPerLevel(level: number): number {

        if (level === 0) return 48;
        if (level === 1) return 43;
        if (level === 2) return 38;
        if (level === 3) return 33;
        if (level === 4) return 28;
        if (level === 5) return 23;
        if (level === 6) return 18;
        if (level === 7) return 13;
        if (level === 8) return 8;
        if (level === 9) return 6;
        if (level >= 10 && level <= 12) return 5;
        if (level >= 13 && level <= 15) return 4;
        if (level >= 16 && level <= 18) return 3;
        if (level >= 19 && level <= 28) return 2;
        if (level >= 29) return 1;

        return 60;
    }

    private processFrame(): void {

        const { level, paused } = this.state;

        this.framesCount += 1;
        const framesLimit: number = this.getFramesPerLevel(level);

        if (this.framesCount >= framesLimit) {

            this.framesCount = 0;
            this.moveDown();
            this.play();
        } else if (paused === false) {

            requestAnimationFrame(this.processFrame);
        }
    }

    private play(): void {

        const { paused, tetromino } = this.state;

        if (paused === true) {

            this.setState(
                (prevState: Readonly<TetrisState>, props: Readonly<TetrisProps>): Pick<TetrisState, 'paused'> => ({
                    paused: false,
                }),
            );
        }

        if (tetromino === null) {

            this.setState(
                (prevState: Readonly<TetrisState>, props: Readonly<TetrisProps>): Pick<TetrisState, 'nextTetromino' & 'paused' & 'tetromino'> => {

                    const newTetromino: ActiveTetromino = this.createTetromino(
                        prevState.nextTetromino === null
                            ? this.getRandomTetromino()
                            : prevState.nextTetromino,
                    );

                    return {
                        iago: newTetromino.type === Tetrominos.I ? 0 : prevState.iago + 1,
                        nextTetromino: this.getRandomTetromino(),
                        paused: this.hasOverlaps(newTetromino),
                        tetromino: newTetromino,
                    };
                },
            );
        }

        requestAnimationFrame(this.processFrame);
    }

    private stop(): void {

        this.setState(
            (prevState: Readonly<TetrisState>, props: Readonly<TetrisProps>): Pick<TetrisState, 'paused'> => ({
                paused: true,
            }),
        );
    }

    private pause(): void {

        const { paused } = this.state;

        if (paused) {
            this.play();
        } else {
            this.stop();
        }
    }

    private adjustFieldSize(height: number, width: number): { height: number | null, width: number | null } {

        return {
            height: null,
            width: height / FIELD_HEIGHT * FIELD_WIDTH,
        };
    }

    private adjustNextTetrominoSize(height: number, width: number): { height: number | null, width: number | null } {

        return {
            height: width / 2,
            width: null,
        }
    }

    public componentDidMount(): void {

        window.addEventListener('keydown', this.keyPressed);
    }

    public componentWillUnmount(): void {

        this.stop();

        window.removeEventListener('keydown', this.keyPressed);
    }

    public render(): React.ReactNode {

        const { burn, iago, level, lines, tetrisLines, score } = this.state;

        const trate: number = lines ? Math.round((tetrisLines / lines) * 100) : lines;

        return (
            <section className='tetris' ref={this.tetrisElement}>
                <section className='tetris-main-section'>
                    <TetrisBox flex={true} adjustSize={this.adjustFieldSize}>
                        <TetrisField field={this.getFieldWithActiveTetromino()} />
                    </TetrisBox>
                    <TetrisBox>
                        <TetrisWins />
                    </TetrisBox>
                </section>
                <aside>
                    <TetrisScore score={score} />
                    <TetrisNext tetromino={this.getNextTetrominoShape()} />
                    <TetrisLevel level={level} />
                    <TetrisLines lines={lines} />
                    <TetrisRate burn={burn} iago={iago} rate={trate} />
                </aside>
            </section>
        );
    }
}
