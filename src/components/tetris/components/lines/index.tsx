import * as React from 'react';

export interface TetrisLinesProps {
    lines: number;
}

export default class TetrisLines extends React.PureComponent<TetrisLinesProps> {

    public render(): React.ReactNode {

        const { lines } = this.props;
        return `Lines: ${lines}`;
    }
}
