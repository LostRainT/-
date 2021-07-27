import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './index.scss'
import avatar from '../../images/tabbar/profile_nor.png'

export default function Mine() {
    return (
        <View className='mine'>
            <View>
                <Image src={avatar} className='mine-avatar' />
                <View className='mine-nickname'>所长sb</View>
                <View className='mine-username'>sbsb</View>
            </View>
            <View className='mine-footer'>sb</View>
        </View>
    )
}