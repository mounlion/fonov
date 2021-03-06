import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BaseTest, BaseCard } from '../../elements/index'
import {replace} from "react-router-redux";
import URLS from "../../constant/urls";
import image_manager from "../../actions/image-manager";
import {getActiveLanguage, getTranslate} from "react-localize-redux/lib/index";


class WiFi extends Component {

    componentWillMount() {
        const {replace, currentModel} = this.props;

        if (currentModel === null) {
            replace(URLS.Home)
        }
    }

    render() {

        const { image_manager, _ } = this.props;

        return (
            <BaseTest
                test='WiFi'
                Title={_('wi-fi')}
                rating_check
                rating_question={_('wi-fi_works?')}
            >
                <BaseCard
                    cards={[
                        [_('open_settings_->_wi-fi._t...'), image_manager(1)]
                    ]}
                />
            </BaseTest>
        )
    }

}

const mapStateToProps = state => {
    return {
        _: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        currentModel: state.current_iphone.model
    }
};

const mapDispatchToProps = dispatch => {
    return {
        replace: path =>  dispatch(replace(path)),
        image_manager: number => dispatch(image_manager('WiFi', number))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WiFi);