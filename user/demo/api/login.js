import {request2} from "./index";

export function login(account,password,code){
  return request2({
    url:"/user/login",
    method:"post",
    header:{
      "Content-Type":'application/json'
    },
    data:{
      username:account,
        password:password,
        code:code
    }
  })
} 

export function getCode(user) {
  return request2({
    url: '/user/code/'+user,
    method: 'get',

  });
};