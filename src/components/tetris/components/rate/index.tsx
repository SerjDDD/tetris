import * as React from 'react';
import TetrisBox from '../box';

export interface TetrisRateProp {
    rate: number;
}

export default class TetrisRate extends React.PureComponent<TetrisRateProp> {

    public render(): React.ReactNode {

        const { rate } = this.props;
        return (
            <TetrisBox>
                <p>TRATE</p>
                <p>{`${String.prototype.padStart.call(rate, 2, '0')}%`}</p>
            </TetrisBox>
        );
    }
}
