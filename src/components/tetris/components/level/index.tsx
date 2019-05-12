import * as React from 'react';
import TetrisBox from '../box';

export interface TetrisLevelProps {
    level: number;
}

export default class TetrisLevel extends React.PureComponent<TetrisLevelProps> {

    public render(): React.ReactNode {

        const { level } = this.props;
        return (
            <TetrisBox>
                <p>LEVEL</p>
                <p>{String.prototype.padStart.call(level >= 99 ? 99 : level, 2, '0')}</p>
            </TetrisBox>
        );
    }
}
