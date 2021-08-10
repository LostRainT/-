import { View } from "@tarojs/components";
import { Component } from "@tarojs/taro";
import { AtButton } from "taro-ui";

import './settings.scss'

export default class Settings extends Component {
    config = {
        navigationBarTitleText: '设置'
    }
    quitClick() {
        Taro.reLaunch({
            url: '/pages/register/register'
        })
    }
    render() {
        return (
            <View className='back'>
                <AtButton className='quit-button' type='primary' onClick={this.quitClick}>退出登录</AtButton>
            </View>
        )
    }
}