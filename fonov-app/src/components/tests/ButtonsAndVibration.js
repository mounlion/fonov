import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Image} from '../../elements/index'
import { RatingCheck } from '../rating/index'
import URLS from "../../constant/urls";
import {replace} from "react-router-redux";
import { View, Navbar, Pages, Page, Views, NavCenter,Card, CardContent, CardHeader,
    NavLeft, NavRight} from 'framework7-react';


class ButtonsAndVibration extends Component {

    componentWillMount() {
        const {replace, currentModel} = this.props;

        if (currentModel === null) {
            replace(URLS.Home)
        }
    }

    lockButton() {

        const { currentModel } = this.props;

        switch (currentModel) {
            case 'iPhone':
            case 'iPhone 3G':
            case 'iPhone 3GS':
            case 'iPhone 4':
            case 'iPhone 4S':
            case 'iPhone 5':
            case 'iPhone 5c':
            case 'iPhone 5s':
            case 'iPhone SE':
                return <Image src={require('../../assets/image/ButtonsAndVibration/iphone-topBotton.png')}/>;
            default:
                return <Image src={require('../../assets/image/ButtonsAndVibration/Кпокпи 3.png')}/>;
        }
    }

    render() {

        const { currentModel } = this.props;

        return (
            <Views>
                <View navbarThrough>
                    <Navbar>
                        <NavLeft/>
                        <NavCenter>Проверка кнопок и вибрации {currentModel}</NavCenter>
                        <NavRight/>
                    </Navbar>
                    <Pages>
                        <Page>

                            <Card>
                                <CardHeader>
                                    Проверьте клавиши громкости и кнопку бесшумного режима. При переводе iPhone в бесшумных телефон должен завибрировать
                                </CardHeader>
                                <CardContent>
                                    <Image src={require('../../assets/ButtonsAndVibration/кнопки/Кпокпи 2.png')}/>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    Клавиша Домой
                                </CardHeader>
                                <CardContent>
                                    <Image src={require('../../assets/ButtonsAndVibration/кнопки/Кпокпи.png')}/>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    Клавиша блокировки
                                </CardHeader>
                                <CardContent>
                                    {this.lockButton()}
                                </CardContent>
                            </Card>

                            <RatingCheck testN='ButtonsAndVibration'>
                                Работаю кнопки и вибрация в {currentModel}?
                            </RatingCheck>
                        </Page>
                    </Pages>
                </View>
            </Views>
        );
    }

}

const mapStateToProps = state => {
    return {
        currentModel: state.current_iphone.model
    }
};

const mapDispatchToProps = dispatch => {
    return {
        replace: path =>  dispatch(replace(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsAndVibration);
