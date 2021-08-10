import { View } from '@tarojs/components';
import { Component } from '@tarojs/taro'
import { UserDoctorModel, UserPatientModel } from 'src/common/NetInterface';
import { AtActivityIndicator } from "taro-ui";
import { LoginRequest, UserManager } from '../../common/Server'
import './loading.scss'

let Keys = require('../../static/consts')
export default class Loading extends Component {
    // fetchUserInfo() {
        // let opid = UserManager.getInstance().getWxId()
        // console.log('lookres   ' + opid)
        // if (opid == undefined) {
        //     Taro.navigateTo({
        //         url: '/pages/register/register'
        //     })
        // }else{

        // }
    // }
    state = {
        title: ''
    }
    constructor(props) {
        super(props)
        this.state = {
            title: '加载中...'
        }
    } 
    
    fetchUserInfo() {
        let opid = UserManager.getInstance().getWxId()
        console.log('lookres   ' + opid)
        if (opid == undefined) {
            this.setState({
                title: '获取微信id失败'
            })
           return
        }
        LoginRequest({wxid: opid}).then(res=> {
            
            UserManager.getInstance().updateToken(res.token)
            if (res.type == 1) {
                let mo = res.userInfo as UserPatientModel
                console.log('loginrequest: ', mo)
                Taro.setStorage({
                    key: Keys.storageKeys.patient,
                    data: mo,
                    success: this.goToIndex
                })
                
            }else{
                let mo = res.userInfo as UserDoctorModel
                Taro.setStorage({
                    key: Keys.storageKeys.doctor,
                    data: mo,
                    success: this.goToIndex
                })
            }
        }).catch(err => {
            console.log('error: ' + err)
            Taro.navigateTo({
                url: '/pages/register/register'
            })
        })
    }

    goToIndex() {
        Taro.switchTab({
            url: '/pages/index/index'
        })
    }

    componentDidMount () {
        console.log('开始获取opid')
        UserManager.getInstance().geOpenId().then (value => {
            console.log('success: ' + value)
            this.fetchUserInfo()
        }).catch(err => {
            console.log('fail')
        })
        


        // GetLessonListRequest({page: 1}).then(res=>{
        //     console.log(res)
        //     this.pageIndex = 2
        //     this.setState({values: res, loading: false})
        //   })
    }
    render() {
        return (
            <View className='cover'>
                <View className='loading-back'>
                    <AtActivityIndicator mode='center' size={60} content={this.state.title} color={'#00a573'}></AtActivityIndicator>
                </View>
            </View>
        )
    }
}