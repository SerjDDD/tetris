import * as React from 'react';

export interface TetrisScoreProps {
    score: number;
}

export default class TetrisScore extends React.PureComponent<TetrisScoreProps> {

    public render(): React.ReactNode {

        const { score } = this.props;
        return `Score: ${score}`;
    }
}
