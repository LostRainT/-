import { View } from "@tarojs/components";
import { Component } from "@tarojs/taro";
import { LoginRequest, UserManager, PatientRegister } from '../../common/Server'
import { AtForm, AtInput, AtCheckbox, AtButton } from "taro-ui";

import './register.scss'


export default class Register extends Component {
    config = {
        navigationBarTitleText: '注册'
    }
    state = {
        name: '',
        age: 0,
        gender: 'male',
        contact: '',
        address: ''
    }
    checkBoxOption = [
        { value: 'male', label: '男'},
        { value: 'female', label: '女'}
    ]
    constructor () {
        super(...arguments)
    }

    componentWillMount() {
        
        
    }

    handleChange(content, input) {
        console.log(content, input, this.state.name)
        if (content == 'name') {
            this.setState({
                name: input
            })
        }else if (content == 'age'){
            this.setState({
                age: input
            })
        }else if (content == 'address'){
            this.setState({
                address: input
            })
        }else if (content == 'contact'){
            this.setState({
                contact: input
            })
        }
        return input
    }

    handleGender(value: Array<string>) {
        let index = value.lastIndexOf(this.state.gender)
        if ( index < 0) {
            return
        }
        let gen = this.state.gender
        var res = 'female'
        if (gen == 'female') {
            res = 'male'
        }
        console.log(res)
        this.setState({
            gender: res
        })
    }

    submitClick() {
        let opid = UserManager.getInstance().getWxId()
        let gen = this.state.gender == 'male' ? true : false
        console.log('get gender'+ this.state)
        PatientRegister(
            {
                wxid: opid, 
                age: this.state.age, 
                name: this.state.name, 
                address: this.state.address, 
                contact: this.state.contact, 
                gender: gen
            }).then(res => {
                let token = res.token
                console.log('regis: ' + token + res)
                if (res == undefined) {
                    Taro.navigateBack({
                        delta: 1
                    })
                    return
                }
                UserManager.getInstance().updateToken(token)
                Taro.switchTab({
                    url:'/pages/index/index'
                })
            }).catch(err => {
                console.log('regis err: ' + err)
            })
    }

    resetClick() {
        this.setState({
            name: '',
            age: '',
            gender: 'male',
            phone: ''
        })
        console.log(this.state)
    }

    valid() {
        console.log(this.state.name, this.state.age)
        return this.state.name.length > 0 && this.state.age >= 0
    }

    render() {
        return (
            <View className='bg'>
                <AtForm
                className='form-bg'>
                <View className='top-part'>
                <AtInput
                    required
                    name='name' 
                    title='姓名' 
                    type='text' 
                    placeholder='请输入您的姓名' 
                    value={this.state.name}
                    onChange={this.handleChange.bind(this, 'name')}/>
                <AtInput
                    required
                    name='age' 
                    title='年龄' 
                    type='number' 
                    placeholder='请输入您的年龄' 
                    value={this.state.age.toString()}
                    onChange={this.handleChange.bind(this, 'age')}/>
                <AtCheckbox className='check-box-back' options={this.checkBoxOption} selectedList={[this.state.gender]} onChange={this.handleGender.bind(this)}/> 
                <AtInput
                    name='address' 
                    title='联系地址' 
                    type='text' 
                    placeholder='请输入您的联系地址(选填)' 
                    value={this.state.address}
                    onChange={this.handleChange.bind(this, 'address')}/>
                <AtInput
                    name='contact' 
                    title='手机号' 
                    type='phone' 
                    placeholder='请输入您的联系方式' 
                    value={this.state.contact}
                    onChange={this.handleChange.bind(this, 'contact')}/>
                </View>
                </AtForm>
                <View className='flexable-bg'></View>
                <View className='bottom-part'>
                    <View className='bottom-button'>
                    <AtButton formType='submit' className={this.valid() ? 'submit-normal' : 'submit-disable'} disabled={!this.valid()} onClick={this.submitClick.bind(this)}>提交</AtButton>
                    </View>
                    <View className='bottom-button'>
                    <AtButton className='reset' formType='reset' onClick={this.resetClick.bind(this)}>重置</AtButton>
                    </View>
                </View>
            </View>
        )
    }
}
