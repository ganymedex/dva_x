import React,  { Component, PropTypes } from 'react';

import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModal from '../components/Users/UserModal';


// 引入 connect 工具函数
import { connect } from 'dva';

function Users({ location, dispatch,users }) {
    const {
    loading, list, total, current,
    currentItem, modalVisible, modalType
    } = users;
    const userSearchProps = {};
    const userListProps={
        dataSource: list,
        total,
        loading,
        current,
    };
  const userModalProps = {};
  return (
    <div>
      {/* 用户筛选搜索框 */}
      <UserSearch {...userSearchProps} />
      {/* 用户信息展示列表 */}
      <UserList {...userListProps} />
      {/* 添加用户 & 修改用户弹出的浮层 */}
      <UserModal {...userModalProps} />
    </div>
  );
}

// Users.PropTypes = {
//   users: PropTypes.object,
// };

// 指定订阅数据，这里关联了 users
function mapStateToProps({ users }) {
  return {users};
}
export default connect(mapStateToProps)(Users);