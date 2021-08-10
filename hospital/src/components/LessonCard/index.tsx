import { View, Text, Image } from '@tarojs/components'
import { Component } from '@tarojs/taro'
import { CardProps } from '../../common/HomeInterfaces'

export default class LessonCardView extends Component<CardProps> {
    render () {
      return (
      <View style={{height: 100, display: 'flex', flexDirection: 'column'}}>
        <View style={{height: 100, display: 'flex', flexDirection: 'column',justifyItems: 'flex-end'}}>
          <View style={{flex: 1}}> </View>
          <Text style={{fontSize: 30, color: 'white'}} > pappapapapapap </Text>
          <Text style={{fontSize: 15, color: 'gray'}} > testtttt </Text>
        </View>
        
         <Image
            style={{height: 100, position: 'absolute', zIndex: -1}}
            mode='center'
            src={this.props.image}
          >
          </Image>
      </View>
      )
    }
  }