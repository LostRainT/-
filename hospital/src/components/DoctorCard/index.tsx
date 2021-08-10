import { View, Text} from '@tarojs/components'
import { Component } from '@tarojs/taro'
import { DoctorModel } from '../../common/NetInterface'
import { AtAvatar } from 'taro-ui'

import './index.scss'

export default class DoctorCardView extends Component<DoctorModel> {
    constructor(props: DoctorModel) {
        super(props)
    }

    render() {
        return (
            <View className='back'>
                <View className='left-part'>
                    <AtAvatar size='large' circle text= {this.props.name}/>
                </View>
                <View className='right-part'>
                    <View className='row'>
                        <Text className='name'>{this.props.name}</Text>
                        <Text className='job'>{this.props.jobNumber}</Text>
                    </View>
                    <View className='row'>
                        <Text className='contact'>{this.props.contact}</Text>
                    </View>
                </View>
            </View>
        )
    }
}