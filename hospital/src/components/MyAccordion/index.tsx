// import { View } from "@tarojs/components";
import { Component } from "@tarojs/taro";
import { AtAccordion, AtList, AtListItem } from "taro-ui";

// 
import { Disease } from "../../common/DiseaseInterfaces";


// interface MyProps {
// }

// interface MyState {
//   value: Disease
//   open: boolean
// }
export default class MyAccordion extends Component<Disease> {
    state = {
        // name: '',
        // date: Date(),
        // info: '',
        // type: '',
        // hosp: '',
        // dep: '',
        open: false
    }

    handleClick(value: boolean) {
        this.setState({open: value})
    }

    render() {
        // console.log(this.props)
        return (
            <AtAccordion 
            open={this.state.open} 
            onClick={this.handleClick.bind(this)}
            title={this.props.name}
            note={this.props.date} >
              <AtList hasBorder={false}>
                <AtListItem title={this.props.dep} extraText={this.props.hosptital} note={this.props.type}/>
                <AtListItem note={this.props.info}/>
              </AtList>
            </AtAccordion>
        )
    }
}