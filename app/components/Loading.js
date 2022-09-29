import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    content: {
        fontSize: '3rem',
        position: 'absolute',
        fonWeight: 'bold',
        left: 0,
        right: 0,
        marginTop: '2rem',
        textAlign: 'center'
    }
};


export default class Loading extends React.Component {
    /*constructor(props) {
        super(props);
    
        this.state = {
            content: props.text,
            loadText: props.loadText
        };
    }*/

    state = {
        content: this.props.text,
        loadText: this.props.loadText
    };
    
    componentDidMount() {
        const { speed, text, loadText } = this.props;

        this.interval = window.setInterval(() => {
             this.state.content === text + loadText.repeat(3)
                ? this.setState({ content: text })
                : this.setState(({ content }) => ({ content: content + loadText }))
        }, speed);        
    }

    componentWillUnmount() {
       window.clearInterval(this.interval);
    }

    render() {
        return (
            <p style={styles.content}>
                {this.state.content}
            </p>
        );
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    loadText: PropTypes.string,
    speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
    text: 'Loading',
    loadText: '.',
    speed: 300
};