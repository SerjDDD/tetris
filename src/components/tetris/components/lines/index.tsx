import * as React from 'react';
import TetrisBox from '../box';

export interface TetrisLinesProp {
    lines: number;
}

export default class TetrisLines extends React.PureComponent<TetrisLinesProp> {

    public render(): React.ReactNode {

        const { lines } = this.props;
        return (
            <TetrisBox>
                <p>LINES</p>
                <p>{String.prototype.padStart.call(lines >= 999 ? 999 : lines, 3, '0')}</p>
            </TetrisBox>
        );
    }
}
