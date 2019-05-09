import * as React from 'react';
import classNames from 'classnames';
import { Tetrominos, TetrominoShape } from '../../../../constants';
import './style.css';

export interface TetrisFieldProps {
    field: TetrominoShape;
}

export default class TetrisField extends React.PureComponent<TetrisFieldProps> {

    public render(): React.ReactNode {

        const { field } = this.props;

        return (
            <table
                className='tetris-field'
                cellSpacing={0}
                cellPadding={0}
            >
                <tbody>
                    {
                        field.map((line: (Tetrominos | null)[], lineIndex: number): React.ReactNode => (
                            <tr key={`line${lineIndex}`} className='tetris-field-line'>
                                {
                                    line.map((cell: Tetrominos | null, cellIndex: number): React.ReactNode => {

                                        const key: string = `${lineIndex}x${cellIndex}`;

                                        const cellClassName: string = classNames({
                                            'tetris-field-cell': true,
                                            'cell-i': cell === Tetrominos.I,
                                            'cell-j': cell === Tetrominos.J,
                                            'cell-l': cell === Tetrominos.L,
                                            'cell-o': cell === Tetrominos.O,
                                            'cell-s': cell === Tetrominos.S,
                                            'cell-t': cell === Tetrominos.T,
                                            'cell-z': cell === Tetrominos.Z,
                                            'cell-null': cell === null,
                                        });

                                        return <td key={key} className={cellClassName} />
                                    })
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}
