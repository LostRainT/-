import { Component, MessageType } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { GetLessonListRequest } from '../../common/Server'
import { LessonModel} from '../../common/HomeInterfaces'

import { HomeCardView } from '../../components'
import { AtActivityIndicator, AtMessage } from 'taro-ui'

// import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

interface MyProps {
}

interface MyState {
  values: LessonModel[]
  loading: boolean
  dragStyle: {}
  downDragStyle: {}
  downText: string
  upDragStyle: {}
  pullText: string
  start_p: any
  scrollY: boolean
  dragState: number//刷新状态 0不做操作 1刷新 -1加载更多
}

export default class Index extends Component<MyProps, MyState> {
  config = {
    navigationBarTitleText: '首页'
  }
  pageIndex: number = 1
  
  constructor(props: MyProps) {
    super(props)
    
    this.state = {
      values: [],
      loading: false,
      dragStyle: {//下拉框的样式
        top: 0 + 'px'
      },
      downDragStyle: {//下拉图标的样式
        height: 0 + 'px'
      },
      downText: '下拉刷新',
      upDragStyle: {//上拉图标样式
        height: 0 + 'px'
      },
      pullText: '上拉加载更多',
      start_p: {},
      scrollY:true,
      dragState: 0//刷新状态 0不做操作 1刷新 -1加载更多
    }
  }

  componentWillMount () { 
    this.onRefreshPullDown()

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  submit() {
    console.log('12344')
  }
  handleChange(){
    console.log('xxx')
  }
  onSubmit() {
    console.log('www')
  }
  onReset() {
    console.log('vvv')
  }

  showMessage( title: string, tp: MessageType) {
    console.log("what's wrong????")
    Taro.atMessage({
      'message': title,
      'type': tp,
    })
  }

  onRefreshPullDown() {
    this.setState({loading: true})
    GetLessonListRequest({page: 1}).then(res=>{
      console.log(res)
      this.pageIndex = 2
      this.setState({values: res, loading: false})
      this.showMessage('刷新成功', 'success')
    })
  }

  onRefreshPullUp() {
    this.setState({loading: true})
    // console.log(this.pageIndex)
    GetLessonListRequest({page: this.pageIndex}).then(res=>{
      console.log(res)
      this.pageIndex += 1
      let r =  this.state.values
      res.forEach(e=>{
        r.push(e)
      })
      
      this.setState({values: r, loading: false})
      let msg = res.length > 0 ? '加载了' + res.length + '条' : '没有更多'
      this.showMessage(msg, 'success')
    })
  }

  touchStart(e) {
    
    this.setState({
        start_p: e.touches[0]
    })
  }

  touchmove(e) {
    let that = this
    let move_p = e.touches[0],//移动时的位置
        deviationX = 0.30,//左右偏移量(超过这个偏移量不执行下拉操作)
        deviationY = 70,//拉动长度（低于这个值的时候不执行）
        maxY = 100;//拉动的最大高度

    let start_x = this.state.start_p.clientX,
        start_y = this.state.start_p.clientY,
        move_x = move_p.clientX,
        move_y = move_p.clientY;


    //得到偏移数值
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
    if (dev < deviationX) {//当偏移数值大于设置的偏移数值时则不执行操作
        let pY = Math.abs(move_y - start_y) / 3.5;//拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
        if (move_y - start_y > 0) {//下拉操作
            if (pY >= deviationY) {
              if (this.state.dragState != 1) {
                this.setState({ dragState: 1, downText: '释放刷新' })
              }
            }else{
              if (this.state.dragState != 0) {
                // console.log('set state2')
                this.setState({ dragState: 0, downText: '下拉刷新' })
              }
            }
            if (pY >= maxY) {
                pY = maxY
            }
            // console.log('set state3')
            this.setState({
                dragStyle: {
                    top: pY + 'px',
                },
                downDragStyle: {
                    height: pY + 'px'
                },
                scrollY:false//拖动的时候禁用
            })
        }
        if (start_y - move_y > 0) {//上拉操作
            // console.log('上拉操作')
            if (pY >= deviationY) {
              if (this.state.dragState != -1) {
                this.setState({ dragState: -1, pullText: '释放加载更多' })
              }
            }else{
              if (this.state.dragState != 0) {
                this.setState({ dragState: 0, pullText: '上拉加载更多' })
              }
            }
            if (pY >= maxY) {
                pY = maxY
            }
            this.setState({
                dragStyle: {
                    top: -pY + 'px',
                },
                upDragStyle: {
                    height: pY + 'px'
                },
                scrollY: false//拖动的时候禁用
            })
        }

    }
  }
  pull() {//上拉
    if (this.state.loading) {
      return
    }
    console.log('上拉')
    // this.props.onPull()
    this.onRefreshPullUp()
  }

  down() {//下拉
    if (this.state.loading) {
      return
    }
    console.log('下拉')
    // this.props.onDown()
    this.onRefreshPullDown()
  }

  ScrollToUpper() { //滚动到顶部事件
    console.log('滚动到顶部事件')
    // this.props.Upper()
  }
  ScrollToLower() { //滚动到底部事件
    console.log('滚动到底部事件')
    // this.props.Lower()
  }

  touchEnd(e) {
    if (this.state.dragState === 1) {
        this.down()
    } else if (this.state.dragState === -1) {
        this.pull()
    }
    this.reduction()
  }

  reduction() {//还原初始设置
    const time = 0.5;
    this.setState({
        upDragStyle: {//上拉图标样式
            height: 0 + 'px',
            transition: `all ${time}s`
        },
        dragState: 0,
        dragStyle: {
            top: 0 + 'px',
            transition: `all ${time}s`
        },
        downDragStyle: {
            height: 0 + 'px',
            transition: `all ${time}s`
        },
        scrollY:true
    })
    setTimeout(() => {
        this.setState({
            dragStyle: {
                top: 0 + 'px',
            },
            upDragStyle: {//上拉图标样式
                height: 0 + 'px'
            },
            pullText: '上拉加载更多',
            downText: '下拉刷新'
        })
    }, time * 1000);
}

  cardClick(lesson: LessonModel) {
    // console.log("what's card")
    console.log('goto: ', lesson.id, lesson)
    Taro.navigateTo({
      url: `/pages/detail/lessonDetail?lessonID=${lesson.id}`
    })
  }

  render () {
    let cards = this.state.values
    let that = this
    let dargStyle = this.state.dragStyle;
        let downDragStyle = this.state.downDragStyle;
        let upDragStyle = this.state.upDragStyle;
      return (
        <View className='index' style={{display: 'flex'}}>
          <AtMessage />
            <View className='downDragBox' style={downDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.downText}</Text>
                </View>
                <ScrollView
                    style={dargStyle}
                    onTouchMove={this.touchmove}
                    onTouchEnd={this.touchEnd}
                    onTouchStart={this.touchStart}
                    onScrollToUpper={this.ScrollToUpper}
                    onScrollToLower={this.ScrollToLower}
                    className='dragUpdata'
                    scrollY={this.state.scrollY}
                    scrollWithAnimation>
                    {cards.map((card)=>{
              // console.log('lessonid ', card.id)
              return (
                <View onClick={()=>{
                  that.cardClick(card)
                }}>
                  <HomeCardView title={card.title} image={card.imageUrl} update={card.updatedAt} lessonId={card.id} videoDuration={card.videoDuration}/>
                </View>
              )
            })}
                </ScrollView>
                <View className='upDragBox' style={upDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.pullText}</Text>
                </View>
        </View>
      )
    
  }
}






