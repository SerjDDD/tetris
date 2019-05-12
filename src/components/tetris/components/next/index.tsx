import * as React from 'react';
import TetrisField from '../field';
import { TetrominoShape } from '../../../../constants';
import TetrisBox from '../box';

export interface TetrisNextProp {
    tetromino: TetrominoShape;
}

export default class TetrisNext extends React.PureComponent<TetrisNextProp> {

    public render(): React.ReactNode {

        const { tetromino } = this.props;
        return (
            <TetrisBox>
                <p>NEXT</p>
                <TetrisField field={tetromino} />
                <div style={{ marginTop: '50%' }}>

                </div>
            </TetrisBox>
        );
    }
}
