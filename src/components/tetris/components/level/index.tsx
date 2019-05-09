import * as React from 'react';

export interface TetrisLevelProps {
    level: number;
}

export default class TetrisLevel extends React.PureComponent<TetrisLevelProps> {

    public render(): React.ReactNode {

        const { level } = this.props;
        return `Level: ${level}`;
    }
}
