<template>
  <div id="app">
  
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
width: 100%;
height: 100%;
margin: 0 ;
padding: 0;
}
*{
  margin: 0 ;
padding: 0;
}
.el-input__inner {
  -web-kit-appearance: none;
  -moz-appearance: none;
  border-radius: 20px;
  padding-left: 75px!important;
  width: 100%;
  height: 44px;
  padding-left: 75px;
  box-sizing: border-box;
}
</style>
