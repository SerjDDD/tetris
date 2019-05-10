import * as React from 'react';
import './styles.css';

export default class TetrisWins extends React.PureComponent {

    public render(): React.ReactNode {
        return (
            <section className='tetris-wins'>
                <span role="img" aria-label="life">❤️❤️❤️</span>
            </section>
        );
    }
}
