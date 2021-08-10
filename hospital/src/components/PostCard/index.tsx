import Taro from '@tarojs/taro'
import {View, Form, Input, Textarea, Picker } from '@tarojs/components'
import { AtButton, AtImagePicker } from 'taro-ui'

import './index.scss'
import { Component } from '@tarojs/taro'
let departs = require('../../static/departs')
interface MyProps {
    handleSubmit: () => void
    // handleNameInput: () => void

    name: string
    hospital: string
    info: string
}
class ImgFile {
    url: string
    constructor(url: string) {
        this.url = url
    }
}
export default class PostCard extends Component<MyProps> {

    state = {
        // multiIndex: [0,0],
        // multiArray: [['']],
        firstColum: [''],
        secondColumn: [''],
        source: [['']],
        type: '',
        depart: '',
        files:[]
    }

    constructor(props: MyProps) {
        super(props)
        let a = departs.dataList as Array<{string: Array<string>}>
        var leftColum: string[] = []
        // var rightColum: string[][] = []
        var fir: string[] = []
        var sour: string[][] = []
        var index = 0
        a.map((res)=>{
            // console.log('res: ',res)
            var temp: string[] = []
            for(let k in res) {
                leftColum.push(k)
                let arr = res[k] as Array<{}>
                
                arr.map((sub)=>{
                    temp.push(sub['name'] as string)
                })
                if (fir.length == 0) {
                    fir = temp
                }
                // console.log('fir: ',temp)
                
                // rightColum.push(res[k])
            }
            console.log('insert: ', temp, index)
            sour.push(temp)
            index += 1
        })
        console.log('res: ',sour, a.length, sour.length)
        this.state = {
            // multiIndex: [0,0],
            // multiArray: [leftColum, fir],
            firstColum: leftColum,
            secondColumn: fir,
            source: sour,
            type: '',
            depart: '',
            files: []
        }
    }

    handleSubmit() {
        this.props.handleSubmit()
    }

    handleNameInput() {

    }

    handleHospitalInput() {

    }

    handleInfoInput() {

    }

    onChange(e) {
        let indexes = e.detail.value as number[]
        let type = this.state.firstColum[indexes[0]]
        let depart = this.state.secondColumn[indexes[1]]
        // console.log('current: ', type, depart)
        this.setState({
            type: type,
            depart: depart
        })
    }

    onColumnChange(e) {
        let column = e.detail.column
        if (column == 1) {
            return
        }
        let row = e.detail.value
        // let key = this.state.multiArray[0][row]
        let sec = this.state.source[row]
        // console.log('current: ', sec)
        this.setState({
            secondColumn: sec
        })
        
    }

    onImageChange(files) {
        this.setState({
            files
          })
    }

    render() {
        return (
            <View className='post-form'>
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <View className='form-hint'>疾病名称</View>
                <Input 
                  className='input-title'
                  type='text'
                  placeholder='点击输入名称'
                  value={this.props.name}
                  onInput={this.handleNameInput.bind(this)}
                />
                <View className='form-hint'>医院名称</View>
                <Input
                  placeholder='点击输入医院'
                  className='input-title'
                  value={this.props.hospital}
                  onInput={this.handleHospitalInput.bind(this)}
                />
                <View className='form-hint'>科室</View>
                <Picker
                 mode='multiSelector' 
                 value={this.state.firstColum} 
                 range={[this.state.firstColum, this.state.secondColumn]} 
                 onChange={this.onChange.bind(this)} 
                 onColumnChange={this.onColumnChange.bind(this)}>
                    <View className='picker-bg'>{this.state.type.length > 0 ? this.state.type + ' ' + this.state.depart : '请选择科室'}</View>
                </Picker>
                <View className='form-hint'>描述</View>
                <Textarea
                  placeholder='点击输入正文'
                  className='input-content'
                  value={this.props.info}
                  onInput={this.handleInfoInput.bind(this)}
                />
                <View className='form-hint'>选择图片</View>
                <AtImagePicker 
                files={this.state.files} 
                onChange={this.onImageChange.bind(this)}/>
                <AtButton formType='submit' type='primary'>提交</AtButton>
            </Form>
            
        </View>
        )
    }
}



// dep: string;
//   type: string;
//   name: string;
//   info: string;
//   hosptital: string;
//   date: string;