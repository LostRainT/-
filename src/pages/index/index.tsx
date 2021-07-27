import { Component } from 'react'
import { View, Text, ScrollView, Image, CoverImage } from '@tarojs/components'
import { AtButton, AtForm, AtInput, AtList,AtCard  } from 'taro-ui'
import Taro from '@tarojs/taro'
import { GetLessonListRequest } from '../../Common/Server'
import { LessonModel } from '../../Common/NetInterface'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

interface MyProps {
}

interface MyState {
  values: [LessonModel?]
  loading: boolean
}

export default class Index extends Component<MyProps, MyState> {
  pageIndex: number = 1
  constructor(props: MyProps) {
    super(props)
    
    this.state = {
      values: [],
      loading: false
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

  onRefreshPullDown() {
    this.setState({loading: true})
    
    GetLessonListRequest({page: 1}).then(res=>{
      console.log(res)
      this.pageIndex = 2
      this.setState({values: res, loading: false})
    })
  }

  onRefreshPullUp() {
    this.setState({loading: true})
    console.log(this.pageIndex)
    GetLessonListRequest({page: this.pageIndex}).then(res=>{
      console.log(res)
      this.pageIndex += 1
      let r =  this.state.values
      res.forEach(e=>{
        r.push(e)
      })
      this.setState({values: r, loading: false})
    })
  }

  carClikc(card: LessonModel) {
    console.log("what's card")
    Taro.navigateTo({
      url: `/pages/lessonDetail/lessonDetail?title=${card.title}&info=${card.info}&imageurl=${card.imageUrl}&videourl=${card.videoUrl}`
    })
  }

  render () {
    let cards = this.state.values
    let loading = this.state.loading
    let height = Taro.getSystemInfoSync().windowHeight
    let that = this
      return (
        <View className='index' style={{display: 'flex'}}>
          <ScrollView 
          style={{flex: 1, height: height}}
          scrollY refresherEnabled={true} 
          refresherTriggered={loading}
           onRefresherRefresh={()=>{this.onRefreshPullDown()} }
           onScrollToLower={()=> {this.onRefreshPullUp()}}>
            {cards.map((card)=>{
              return (
                <View onClick={()=>{
                  that.carClikc(card)
                }}>
                  <HomeCardView title={card.title} image={card.imageUrl} update={card.updatedAt}>
                  </HomeCardView>
                  {/* <LessonCardView title={card.title} image={card.imageUrl} update={card.updatedAt}></LessonCardView> */}
                </View>
              )
              
            })}
          </ScrollView>
          
            
        </View>
      )
    
  }
}

interface CardProps {
  title: string
  image: string
  update: string
}

class LessonCardView extends Component<CardProps> {
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

class HomeCardView extends Component<CardProps> {
  
  render () {
    const dot = " . "
    return (
      <View>
      <View style={{
        paddingTop: 10,
        paddingBottom: 10,
        
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap", 
        alignContent: "space-between", 
        backgroundColor: "white",
      }}>
        <View style={{
          marginLeft: 16,
          backgroundColor: "white", 
          flex: 1, 
          display: "flex",
           alignContent: "space-around", 
           flexDirection: "column"
           }}>
          <Text style={{fontSize: 30, color: "black"}}>
           {this.props.title}
          </Text>
          <View style={{flex: 1}}>
          </View>
          <View style={{
            display: "flex"
            }}>
            <Text style={{fontSize: 12, color: 'darkgray'}}> {this.props.update} </Text>
            <Text style={{fontSize: 12, color: 'darkgray'}}>  {dot} </Text>
            <Text style={{fontSize: 12, color: 'darkgray'}}> 100w 收藏 </Text>
          </View>
        </View>

        <View></View>

        <View style={{ width: 100, height: 80, marginRight: 16, borderRadius: '4%'}}>
        <Image
          style={{width: 100, height: 80, borderRadius: '4%'}}
          mode='center'
          src={this.props.image}
        />
        </View>
        
      </View>
      <View style={{height: 1, backgroundColor: "gray"}} ></View>
      </View>
    )
  }
}
