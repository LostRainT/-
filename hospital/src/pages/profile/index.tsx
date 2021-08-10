import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Header } from '../../components'
import { AtGrid } from "taro-ui"

import {UserPatientModel} from '../../common/NetInterface'
import './index.scss'

import info from '../../images/profile/profile_info.png'
import doctor from '../../images/profile/profile_doctor.png'
import signin from '../../images/profile/profile_signin.png'
import settings from '../../images/profile/profile_settings.png'

// interface MyProps {
// }

// interface MyState {
//     value: UserPatientModel
//     avatar: string
// }
let Keys = require('../../static/consts')
export default class Mine extends Component {
    config = {
        navigationBarTitleText: '我的'
    }
    state = {
        name: '',
        age: 0, 
        address: '',
        contact: '',
        gender: true,
        id: ''
    }
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            age: 0, 
            address: '',
            contact: '',
            gender: true,
            id: ''
        }
        // console.log('constructor', this.state)
        let that = this
        Taro.getStorage({
            key: Keys.storageKeys.patient,
            success: function(res) {
                let mo = res.data as unknown as UserPatientModel
                that.updateInfo(mo)
            }
        })
    }
    // componentWillMount() {
        
    // }
    updateInfo(info: UserPatientModel) {
        // console.log('updateInfo', info, info.name, info.age, this.state)
        this.setState({
            name: info.name,
            age: info.age,
            address: info.address,
            contact: info.contact,
            gender: info.gender,
            id: info.id
        })
    }
    selectItem(obj, index) {
        var page = ''
        switch (index) {
            case 0:
                page = '/pages/diseaseHistory/diseaseHistory'
                break
            case 1:
                page = '/pages/doctors/doctors'
                break
            case 2:
                console.log('gotosign: ', this.state)
                page = `/pages/signin/signin?id=${this.state.id}`
                break
            case 3:
                page = '/pages/settings/settings'
                break
        }
        Taro.navigateTo({
            url: page
        })
        console.log(index, obj)
    }
    goToEdit() {
        // console.log('go to edit page', this.state.name)
        Taro.navigateTo({
            url: `/pages/editPage/editPage?name=${this.state.name}&age=${this.state.age}&address=${this.state.address}&contact=${this.state.contact}&gender=${this.state.gender}`
        })
    }
    render() {
        return (
            <View className='mine-back'>
                <Header avatar={''} name={this.state.name} age={this.state.age} editClick={this.goToEdit.bind(this)}></Header>
                <View className='mine-bottom'>
                    <AtGrid data={
                        [
                            {
                                image: info,
                                value: '既往病史'
                            },
                            {
                                image: doctor,
                                value: '我的医生'
                            },
                            {
                                image: signin,
                                value: '打卡记录'
                            },
                            {
                                image: settings,
                                value: '设置'
                            }
                        ]
                    } onClick={this.selectItem.bind(this)}/>
                </View>
            </View>
        )
    }
}