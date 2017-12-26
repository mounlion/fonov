import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import ChangeRoute from '../actions/route'


class TestResult extends Component {

    render() {

        const { changeRoute } = this.props;

        return (
            <div>
                <h1>Результаты теста</h1>
                <Button color="primary" block onClick={() => changeRoute('Home')}>На главную</Button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        changeRoute: route => dispatch(ChangeRoute(route))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestResult);
