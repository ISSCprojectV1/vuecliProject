/**
 * Created by yqr on 2018/4/13.
 */
import request from '@/utils/request'

// 登录 post方法 发送form表单
export function loginByEmail(formName) {
  console.log("发送loginByEmail--post")
  const data = {
    formName
  };
  return request({
    url: '/loginByEmail',
    method: 'post',
    data
  });
}
  // 注册
  export function register(formValidate) {
    console.log("发送register--post")
    const data = {
      " accountId":formValidate.accountId,
      "name":formValidate.name,
      "password":formValidate.password
    };
    return request({
      url: '/register',
      method: 'post',
      data
    })
  }
