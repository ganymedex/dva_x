import { hashHistory } from 'dva/router';
import {query} from '../services/UsersService';
import pathToRegexp from 'path-to-regexp';
//import { create, remove, update, query } from '../services/users';


export default {
  namespace: 'users',

  state: {
    list: [],
    total: null,
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
  },

  // Quick Start 已经介绍过 subscriptions 的概念，这里不在多说
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/users').exec(pathname);
        if (match) {
            dispatch({
            type: 'query', //调用方法
            payload: {}  //传递参数
          });
        }
      });
    },
  },

  effects: {
    *query({payload},{select,call,put}){
      yield put({type:'showLoading'});
      const data = yield call(query);
      if(data){
        yield put({
          type:'querySuccess',
          payload:{
            list:data.data,
            total:data.total,
            current:data.current
          }
        })
      }
    },
    *create(){},
    *'delete'(){},
    *update(){},
  },
  reducers: {
    showLoading(state, action){
      return { ...state, loading: true };
    },// 控制加载状态的 reducer
    showModal(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},
    // querySuccess(state, action){
    //   return {...state, ...action.payload, loading: false};
    // },
    //使用静态数据返回
    querySuccess(state,action){
      const mock = {
        total: 3,
        current: 1,
        loading: false,
        list: [
          {
            id:1,
            name: '张三1',
            age: 23,
            address: '成都',
          },
          {
            id:2,
            name: '李四',
            age: 24,
            address: '杭州',
          },
          {
            id:3,
            name: '王五',
            age: 25,
            address: '上海',
          },
        ],

      };
      return {...state, ...mock, loading: false};
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  }
}