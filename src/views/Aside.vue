<template>
  <div id="Aside">
    <el-menu active-text-color="#1D1D1D" background-color="#0000" class="el-menu-vertical-demo" default-active="2"
      text-color="#1D1D1D" unique-opened router style="height: 700px;">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Avatar /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userlist" >用户列表</el-menu-item>
          <el-menu-item index="/userpower" >用户权限</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Goods /></el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/goodslist" >商品列表</el-menu-item>
          <el-menu-item index="/classify" >商品分类</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3" disabled>
        <template #title>
          <el-icon><Odometer /></el-icon>
          <span>统计管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" >用户统计</el-menu-item>
          <el-menu-item index="3-2" >商品统计</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="4" disabled>
        <template #title>
          <el-icon><Checked /></el-icon>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" >订单列表</el-menu-item>
          <el-menu-item index="3-2" >订单统计</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

    </el-menu>
    <div style="text-align: center;">
      <span style="font-size: 1px;">Copyright 2023-6</span>
      <br>
      <span style="font-size: 1px;">14组-网上购物系统</span>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    data(){
      return{
      }
    }
  }
</script>

<style>
.Aside {
  width: 200px;
  padding: 0;
  margin: 0;
}
</style>
