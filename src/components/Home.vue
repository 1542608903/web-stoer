<template>
    <div id="layout">
        <el-container >
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <Aside></Aside>
                </el-aside>
                <el-main id="main">
                    <router-view></router-view>
                    <el-footer default="Footer"></el-footer>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Aside from '../views/Aside.vue';
import Header from '../views/Header.vue';


export default {
    data(){
        return{

        }
    },
    components: {
        Aside,
        Header,
    }
};
</script>
  
<style>
.container-box{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.layout {
    display: flex;
}

.main {
    flex-grow: 1;
    margin: 10px;
}
.container-main{
    height: 100%;
}
</style>