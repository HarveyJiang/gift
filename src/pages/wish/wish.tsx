import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Text,RadioGroup,Label, Radio  } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import { AtForm, AtInput, AtButton, AtTextarea } from 'taro-ui'
import './wish.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Wish {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))


class Wish extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '礼卷列表'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      list: [
        {
          value: '发票',
          text: '发票',
          checked: false
        },
        {
          value: '京东优惠卷',
          text: '京东优惠卷',
          checked: true
        },
        {
          value: '天猫优惠卷',
          text: '天猫优惠卷',
          checked: false
        },
        {
          value: '苏宁优惠卷',
          text: '苏宁优惠卷',
          checked: false
        },
        {
          value: '其他',
          text: '其他',
          checked: false
        }
        
      ]
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleClick(value) {
    console.log(value)
    this.setState({
      current: value
    })
  }
  handleChange(value) {
    this.setState({
      value
    })
  }
  onSubmit(event) {
    console.log(event)
  }
  onReset(event) {
    console.log(event)
  }
  render() {
    return (
      <View className='index'>
        <view>
          <view>总数:100</view>
          <view><Button plain size='mini' type='primary'>添加</Button></view>
        </view>
        <view>
          <AtForm onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
            <View className='radio-list'>
              <RadioGroup>
                {this.state.list.map((item, _) => {
                  return (
                      <Radio  value={item.value} checked={item.checked}>{item.text}</Radio>
                  )
                })}
              </RadioGroup>
            </View>
            <AtInput
              name=''
              type='number'
              placeholder='票卷金额'
              onChange={this.handleChange.bind(this)} />

            <AtTextarea
              value=''
              onChange={() => { }}
              maxLength={200} placeholder="描述信息" />
            <AtButton size="normal" formType='submit' className='middle'>提交</AtButton>
            <AtButton size="normal" formType='reset' className='middle'>重置</AtButton>
          </AtForm>
        </view>

      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Wish as ComponentClass<PageOwnProps, PageState>
