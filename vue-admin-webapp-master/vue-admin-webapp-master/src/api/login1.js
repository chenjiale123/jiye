import {request2,request3} from "./index1";

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



export function policy() {
  return request3({
    url: '/oss/policy',
    method: 'get',
  
  });
};

export function getuser(user) {
  return request3({
    url: '/ecard/user/info/'+user,
    method: 'get',
  
  });
};

export function userCard(user) {
  return request3({
    url: '/ecard/user/save',
    method: 'post',
  data:user
  });
};

export function updataUserCard(user) {
  return request3({
    url: '/ecard/user/update',
    method: 'post',
  data:user
  });
};


export function userList(limit,page) {
  return request3({
    url: '/ecard/user/list?limit='+limit+'&page='+page,
    method: 'post',
 
  });
};

export function getCompany(limit,page) {
  return request3({
    url: '/ecard/company/list?limit='+limit+'&page='+page,
    method: 'post',
 
  });
};

export function category() {
  return request3({
    url: '/ecard/category/list',
    method: 'get',
 
  });
};

export function article(id) {
  return request3({
    url: '/ecard/item/list/'+id,
    method: 'get',
 
  });
};


export function addCategory(data) {
  return request3({
    url: '/ecard/category/save',
    method: 'post',
    data:data
 
  });
};


export function updateCategory(data) {
  return request3({
    url: '/ecard/category/update',
    method: 'post',
    data:data
 
  });
};
export function addContent(data) {
  return request3({
    url: '/ecard/detail/save',
    method: 'post',
    data:data
 
  });
};

export function delCategory(id) {
  return request3({
    url: '/ecard/item/delete/'+id,
    method: 'get',
 
 
  });
};

export function delItem(id) {
  return request3({
    url: '/ecard/category/delete/'+id,
    method: 'get',
 
 
  });
};

export function delCard(id) {
  return request3({
    url: '/ecard/user/delete/'+id,
    method: 'get',
 
 
  });
};

export function cardDetail(id) {
  return request3({
    url: '/ecard/detail/'+id,
    method: 'get',
 
 
  });
};

export function updataCard(data) {
  return request3({
    url: '/ecard/detail/update',
    method: 'post',
    data:data
 
  });
};


export function recordHistory(data) {
  return request3({
    url: '/ecard/user/log',
    method: 'post',
    data:data
 
  });
};


export function exTable(id) {
  return request3({
    url: '/ecard/user/export/'+id,
    method: 'get',

 
  });
};
export function getUploadAll(data1) {
  return request2({
    url: '/sys/save/cardInfo',
    method: 'post',

    data:data1
  });
};

