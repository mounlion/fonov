import React, { Component } from 'react';
import {connect} from "react-redux";
import {Button} from 'framework7-react';


class TestBtnNext extends Component {

    render() {

        const {lastTest, testN, onClick} = this.props;

        return(
            <Button big color="blue" onClick={onClick}>
                {testN === lastTest ? 'Завершить тест' : 'Далее'}
            </Button>
        )
    }
}

const mapStateToProps = state => {
    return {
        lastTest: state.schemeOfTest[state.schemeOfTest.length-1],
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(TestBtnNext);