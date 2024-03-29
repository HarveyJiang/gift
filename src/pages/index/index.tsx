import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import { AtTabBar, AtNoticebar } from 'taro-ui'
import './index.scss'

import Home from '../home/home'
import Me from '../me/me'
import Gift from '../gift/gift'
import Wish from '../wish/wish'

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

interface Index {
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


class Index extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '首页'
  }


  constructor() {
    super(...arguments)
    this.state = {
      current: 0
    }

  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleClick(value) {
    this.setState({
      current: value
    })

  }
  render() {
    // this.shows = [<Home />, <Gift />, <Wish />, <Me />]
    // const show = [<Home />, <Gift />, <Wish />, <Me />][this.state.current]

    let show
    const index = this.state.current
    if (index == 0) {
      show = <Home />
    }
    else if (index == 1) {
      show = <Gift />
    } else if (index == 2) {
      show = <Wish />
    } else if (index == 3) {
      show = <Me />
    }
    return (
      <View className='index'>
        <AtNoticebar icon='volume-plus'>
          分享礼卷 | 人人为我 | 我为人人
        </AtNoticebar>

        {show}

        <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '列表', iconType: 'money' },
            { title: '送卷', iconType: 'shopping-bag' },
            { title: '我的', iconType: 'home' }
          ]}
          onClick={this.handleClick.bind(this)}
          iconSize={18}
          fontSize={12}
          current={this.state.current}
        />
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

export default Index as ComponentClass<PageOwnProps, PageState>
