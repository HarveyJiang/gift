import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import { AtList, AtListItem, AtSearchBar, AtPagination } from 'taro-ui'
import './index.scss'



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

interface GiftForm {
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


class GiftForm extends Component {

    render() {
        return (
          <View className='index'>
            <View>hello</View>
          </View>
        )
      }
}
export default GiftForm as ComponentClass<PageOwnProps, PageState>