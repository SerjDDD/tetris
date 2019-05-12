import * as React from 'react';
import './styles.css';

export interface TetrisBoxProps {
    adjustSize?: (height: number, width: number) => TetrisBoxState;
    color?: string;
    flex?: boolean;
}

export interface TetrisBoxState {
    height: number | null;
    width: number | null;
}

export default class TetrisBox extends React.PureComponent<TetrisBoxProps, TetrisBoxState> {

    private readonly tetrisBoxElement: React.RefObject<HTMLElement>;

    constructor(props: Readonly<TetrisBoxProps>) {

        super(props);

        this.updateDimensions = this.updateDimensions.bind(this);

        this.tetrisBoxElement = React.createRef<HTMLElement>();

        this.state = {
            height: null,
            width: null,
        }
    }

    private updateDimensions(): void {

        this.setState(
            (prevState: Readonly<TetrisBoxState>, props: Readonly<TetrisBoxProps>): TetrisBoxState => {

                const tetrisBoxElement: HTMLElement | null = this.tetrisBoxElement.current;
                if (tetrisBoxElement === null || props.adjustSize === undefined) {

                    return prevState;
                }

                const style: CSSStyleDeclaration = window.getComputedStyle(tetrisBoxElement, null);
                const computedHeight: number = parseInt(style.getPropertyValue('height'));
                const computedWidth: number = parseInt(style.getPropertyValue('width'));

                return props.adjustSize(computedHeight, computedWidth);
            },
        );
    }

    public componentDidMount(): void {

        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    public componentWillUnmount(): void {

        window.removeEventListener('resize', this.updateDimensions);
    }

    public render(): React.ReactElement<HTMLTableSectionElement> {

        const { color, flex } = this.props;
        const { height, width } = this.state;

        const style = {
            color,
            borderColor: color,
            flex: flex === true ? 1 : 0,
            height: height || undefined,
            width: width || undefined,
        }

        return (
            <section
                className='tetris-box'
                style={style}
                ref={this.tetrisBoxElement}
            >
                {this.props.children}
            </section>
        );
    }
}
