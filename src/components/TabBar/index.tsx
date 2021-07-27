import Taro, { Component } from '@tarojs/taro'
import { AtTabBar }  from 'taro-ui'
import videoNor from '../../images/tabbar/video_nor.png'
import videoSel from '../../images/tabbar/video_sel.png'
import profileNor from '../../images/tabbar/profile_nor.png'
import profileSel from '../../images/tabbar/profile_sel.png'

export default class TabBar extends Component {
    constructor () {
        super(...arguments)
        this.state = {
            current: 0
        }
    }

    handleClick(value) {
        this.setState({
          current: value
        })
        switch (value) {
          case 0:
            Taro.redirectTo({
              url: '/pages/home/index'
            })
            break;
          case 1:
            Taro.redirectTo({
              url: '/pages/profile/index'
            })
            break;
          default:
            break;
        }
    }
    render () {
        return (
            <AtTabBar
            fixed
            tabList={[
                { title: '首页', image: videoNor, selectedImage: videoSel},
                { title: '拍照', image: profileNor, selectedImage: profileSel}
            ]}
            onClick={this.handleClick.bind(this)}
            current={this.state.current}/>
        )
    }
}

