import * as React from 'react';
import TetrisBox from '../box';

export interface TetrisScoreProps {
    score: number;
}

export default class TetrisScore extends React.PureComponent<TetrisScoreProps> {

    public render(): React.ReactNode {

        const { score } = this.props;
        return (
            <TetrisBox>
                <p>SCORE</p>
                <p>{String.prototype.padStart.call(score >= 999999 ? 999999 : score, 6, '0')}</p>
            </TetrisBox>
        );
    }
}
