import * as React from 'react';
import TetrisBox from '../box';

export interface TetrisRateProp {
    burn: number;
    iago: number;
    rate: number;
}

export default class TetrisRate extends React.PureComponent<TetrisRateProp> {

    public render(): React.ReactNode {

        const { burn, iago, rate } = this.props;

        if (iago > 12) {

            return (
                <TetrisBox color='#ff0000'>
                    <p>I AGO</p>
                    <p>{String.prototype.padStart.call(iago, 3, '0')}</p>
                </TetrisBox>
            );
        }

        if (burn > 0) {

            return (
                <TetrisBox>
                    <p>BURN</p>
                    <p>{String.prototype.padStart.call(burn, 3, '0')}</p>
                </TetrisBox>
            );
        }

        return (
            <TetrisBox>
                <p>TRATE</p>
                <p>{`${String.prototype.padStart.call(rate, 2, '0')}%`}</p>
            </TetrisBox>
        );
    }
}
