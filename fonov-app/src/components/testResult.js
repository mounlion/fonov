import React, { Component } from 'react';
import { connect } from 'react-redux'
import {replace} from 'react-router-redux';
import URLS from '../constant/urls'
import {ExitTest} from '../actions/test'
import FontAwesome from 'react-fontawesome'
import { View, Navbar, Pages, Page, Views, NavCenter, ContentBlock,
    ContentBlockTitle, Button, List, ListItem, Badge
} from 'framework7-react';


class TestResult extends Component {

    constructor(props) {
        super(props);

        this.ratingTest = {
            About: {
                title: 'Информация о iPhone',
                pass: true,
                warning: 'Информация о телефоне не совпадает с заявленной информацией. Мы не рекомендуем Вам покупать данный телефон.',
                weight:-100
            },
            Appearance: {
                title: 'Внешний вид iPhone',
                weight:7.5
            },
            WaterSensor: {
                title: 'Датчик влаги',
                pass: false,
                warning: 'Мы не рекамендуем к покупки iPhone после попадания воды. Вода оказывет негативное влияние на внутренные микросхемы iPhone и разрушают его',
                weight:-100
            },
            ButtonsAndVibration: {
                title: 'Кнопки и вибрация',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон с нерабочими кнопками или вибрацией.',
                weight:-100
            },
            Sensor: {
                title: 'Сенсор',
                pass: true,
                warning: 'Мы не рекамендуем к покупки с не корректно работающим сенсором',
                weight:-100
            },
            Touch3D: {
                title: '3D Touch',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон с не работающим 3D Touch, скорей всего экран был поврежден и был замен на более дешевыф аналог без поддержки 3D Touch',
                weight:-100
            },
            iCloid: {
                title: 'iCloud',
                pass: true,
                warning: 'Мы категорически не рекамендуем к покупки iPhone с приявязкой к iCloid. Вы не сможете ввести свой iCloud а так же iPhone можеи быть заблокирован.',
                weight:-100
            },
            Flash: {
                title: 'Вспышка',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон с нерабочий вспышкой.',
                weight:-100
            },
            Speaker: {
                title: 'Динамики',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон с не рабочим динамиком',
                weight:-100
            },
            CompassAndGsensor: {
                title: 'Компас и G-sensor',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон с не рабочим компасом или g-sensor',
                weight:-100
            },
            Camera: {
                title: 'Камера',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон с не рабочей камерой',
                weight:-100
            },
            HeadphoneJack: {
                title: 'Входа для наушников',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон с не рабочим входом для наушников',
                weight:-100
            },
            TouchIDorFaceID: {
                title: props.currentModel === 'iPhone X' ? 'Face ID' : 'Touch ID',
                pass: true,
                warning: `Мы не рекамендуем к покупки телефон с не рабочим ${props.currentModel === 'iPhone X' ? 'Face ID' : 'Touch ID'}`,
                weight:-100
            },
            WiFi: {
                title: 'WiFi',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон с нерабочим wifi.',
                weight:-100
            },
            Bluetooth: {
                title: 'Bluetooth',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон с нерабочим Bluetooth.',
                weight:-100
            },
            Microphone: {
                title: 'Микрофон',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон с нерабочим микрофоном.',
                weight:-100
            },
            CallAndProximitySensor: {
                title: 'Вызов и Датчик приближения',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон без возможности вызова или датчика приближения.',
                weight:-100
            },
            Charging: {
                title: 'Зарядка',
                pass: true,
                warning: 'Мы не рекамендуем к покупки телефон с нерабочим зарядкой.',
                weight:-100
            },
            Warranty: {
                title: 'Гарантия',
                pass: true,
                weight:5
            },
            IMEI: {
                title: 'Совпадение IMEI',
                pass: true,
                weight:5
            },
            Picking: {
                title: 'Комплектация',
                pass: true,
                weight:5
            }
        };

        this.state = {rank: null, testList: null}
    }

    componentWillMount() {

        const {rating, replace, currentModel} = this.props;

        if (currentModel === null) {
            replace(URLS.Home)
        }

        let testList = [], rank = 0;

        for (let key of Object.keys(rating)) {
            let rTest = this.ratingTest[key], tResult = rating[key];
            if (typeof tResult.check !== 'undefined') {
                if (tResult.check !== rTest.pass) {
                    rank = rank+rTest.weight
                }
                testList.push(
                    <li className='item-content'>
                        <div className="item-media">
                            {tResult.check === rTest.pass ? (
                                <FontAwesome name='check-circle-o' style={{fontSize: 40, color: 'MediumSeaGreen'}}/>
                            ) : (
                                <FontAwesome name='times-circle-o' style={{fontSize: 40, color: 'Tomato'}}/>
                            )}
                        </div>
                        <div className="item-inner">
                            <div className="item-title">
                                {rTest.title}
                                {tResult.check !== rTest.pass && rTest.warning ? (
                                    <div className="item-footer">
                                        {rTest.warning}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </li>
                )
            }
            if (typeof tResult.firstStars !== 'undefined' && typeof tResult.secondStars !== 'undefined') {
                if (tResult.firstStars > tResult.secondStars) {
                    rank = rank+(tResult.firstStars-tResult.secondStars)*rTest.weight
                }
                const {firstStars, secondStars} = tResult;
                testList.push(
                    <ListItem title={rTest.title}>
                        <Badge color='blue'>
                            {`${firstStars}/${secondStars}`} <FontAwesome name='star-o'/>
                        </Badge>
                    </ListItem>
                )
            }
        }

        this.setState({rank, testList});
    }

    conclusion() {

        const { rank } = this.state,
            { currentModel } = this.props;

        if (rank < 0) {
            return (
                <div>
                    <ContentBlockTitle>
                        <Badge color='red'>
                            {currentModel} не рекомендован к покупке!
                        </Badge>
                    </ContentBlockTitle>
                    <ContentBlock inner inset>
                        {currentModel} содержит критические недостатки.
                    </ContentBlock>
                </div>
            )
        } else if (rank === 0) {
            return (
                <div>
                    <ContentBlockTitle>
                        <Badge color='green'>
                            {currentModel} рекомендован к покупке!
                        </Badge>
                    </ContentBlockTitle>
                    <ContentBlock inner inset>
                        {currentModel} полностью соответствует заявленной информацией и абсолютно рабочий.
                    </ContentBlock>
                </div>
            )
        } else if (rank > 0 && rank <= 10) {
            return (
                <div>
                    <ContentBlockTitle>
                        <Badge color='green'>
                            {currentModel} рекомендован к покупке!
                        </Badge>
                    </ContentBlockTitle>
                    <ContentBlock inner inset>
                        {currentModel} имеет маленькие не достатки. Вы можете расчитывать на не большую скидку от продовца.
                    </ContentBlock>
                </div>
            )
        } else if (rank > 10 && rank <= 20) {
            return (
                <div>
                    <ContentBlockTitle>
                        <Badge color='green'>
                            {currentModel} рекомендован к покупке!
                        </Badge>
                    </ContentBlockTitle>
                    <ContentBlock inner inset>
                        {currentModel} имеет не достатки, но не критические. Вы можете расчитывать на среднию скидку от продовца.
                    </ContentBlock>
                </div>
            )
        } else if (rank > 20 && rank <= 25) {
            return (
                <div>
                    <ContentBlockTitle>
                        <Badge color='green'>
                            {currentModel} рекомендован к покупке!
                        </Badge>
                    </ContentBlockTitle>
                    <ContentBlock inner inset>
                        {currentModel} имеет не достатки, но не критические. Вы можете расчитывать на скидку выше среднего от продовца.
                    </ContentBlock>
                </div>
            )
        } else {
            return (
                <div>
                    <ContentBlockTitle>
                        <Badge color='green'>
                            {currentModel} рекомендован к покупке!
                        </Badge>
                    </ContentBlockTitle>
                    <ContentBlock inner inset>
                        {currentModel} имеет не достатки, но не критические. Вы можете расчитывать на высокую скидку от продовца.
                    </ContentBlock>
                </div>
            )
        }
    }

    render() {

        const { currentModel, exit_test } = this.props,
            { testList } = this.state;

        return (
            <Views>
                <View navbarThrough>
                    <Navbar>
                        <NavCenter>Результаты теста {currentModel}</NavCenter>
                    </Navbar>
                    <Pages>
                        <Page>
                            <List inset>
                                {testList !== null && testList}
                            </List>

                            {this.conclusion()}

                            <ContentBlock>
                                <Button big color="blue" onClick={() => exit_test()}>
                                    Домой
                                </Button>
                            </ContentBlock>
                        </Page>
                    </Pages>
                </View>
            </Views>
        );
    }

}

const mapStateToProps = state => {
    return {
        currentModel: state.currentModel,
        rating: state.rating
    }
};

const mapDispatchToProps = dispatch => {
    return {
        replace: path =>  dispatch(replace(path)),
        exit_test: () => dispatch(ExitTest())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestResult);