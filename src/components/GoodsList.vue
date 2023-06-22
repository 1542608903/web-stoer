<template>
    <!-- 商品添加 -->
    <div>
        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
        <el-dialog v-model="dialogVisible" width="30%">
            <el-row :gutter="20">
                <el-col :span="20">
                    <h3 style="text-align: center;">添加商品</h3>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <span>
                        商品名称：
                    </span>
                </el-col>
                <el-col :span="14">
                    <div>
                        <el-input v-model="goodsData.name" placeholder="名称" clearable />
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <span>商品详情：</span>
                </el-col>
                <el-col :span="14">
                    <div>
                        <el-input v-model="goodsData.detail" placeholder="详情" clearable />
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <span>分类：</span>
                </el-col>
                <el-col :span="14">
                    <div style="width: 80px;">
                        <el-select v-model="goodsData.classifyId" placeholder="分类" @click="getClassify">
                            <el-option v-for="(item, index) in categories" :key="index" :value="item.classifyId"
                                :label="item.classifyName" />
                        </el-select>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <span>库存：</span>
                </el-col>
                <el-col :span="14">
                    <div>
                        <el-input-number v-model="goodsData.stock" />
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <span>价格：</span>
                </el-col>
                <el-col :span="14">
                    <div>
                        <el-input v-model="goodsData.price" type="number" mix="0" placeholder="输入价格"
                            style="width: 100px;" /><span>￥</span>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <span>创建时间：</span>
                </el-col>
                <el-col :span="14">
                    <div>
                        <el-date-picker v-model="goodsData.createTime" type="date" placeholder="选择时间"
                            style="width: 150px;" />
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="10">
                <el-col :span="10">
                    <el-upload action="http://127.0.0.1:8080/api/upload" list-type="picture-card"
                        :before-upload="beforeUpload" :on-success="handleSuccess" :on-remove="handleRemove"
                        :file-list="fileList" :limit="1">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <template #file="{ file }">
                            <div>
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                <span class="el-upload-list__item-actions">
                                    <span v-if="!Idisabled" class="el-upload-list__item-delete" @click="handleRemove">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-upload>
                    <el-dialog v-model="IdialogVisible">
                        <img w-full :src="imageUrl" />
                    </el-dialog>
                </el-col>
            </el-row>

            <template #footer>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-button @click="addProduct">保存</el-button>
                    </el-col>
                    <el-col :span="10">
                        <el-button type="primary" @click="dialogVisible = false"> 取消 </el-button>
                    </el-col>
                </el-row>
            </template>
        </el-dialog>
    </div>
    <!-- 商品修改 -->
    <el-dialog v-model="updateVisible" width="30%">
        <el-row :gutter="20">
            <el-col :span="20">
                <h3 style="text-align: center;">修改商品</h3>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="6">
                <span>
                    商品名称：
                </span>
            </el-col>
            <el-col :span="14">
                <div>
                    <el-input v-model="ProductList.name" placeholder="名称" clearable />
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <span>商品详情：</span>
            </el-col>
            <el-col :span="14">
                <div>
                    <el-input v-model="ProductList.detail" placeholder="详情" clearable />
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <span>库存：</span>
            </el-col>
            <el-col :span="14">
                <div>
                    <el-input-number v-model="ProductList.stock" />
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <span>价格：</span>
            </el-col>
            <el-col :span="14">
                <div>
                    <el-input v-model="ProductList.price" type="number" min="0" placeholder="输入价格"
                        style="width: 100px;" /><span>￥</span>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="6">
                <span>创建时间：</span>
            </el-col>
            <el-col :span="14">
                <div>
                    <el-date-picker v-model="ProductList.createTime" type="date" placeholder="选择时间" style="width: 150px;" />
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
                <el-col :span="10">
                    <el-upload action="http://127.0.0.1:8080/api/upload" list-type="picture-card"
                        :before-upload="beforeUpload" :on-success="updateSuccess" :on-remove="handleRemove"
                        :file-list="fileList" :limit="1">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <template #file="{ file}">
                            <div>
                                <img class="el-upload-list__item-thumbnail" :src="iURL + ProductList.coverImage"/>
                                <span class="el-upload-list__item-actions">
                                    <span v-if="!Idisabled" class="el-upload-list__item-delete" @click="handleRemove">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-upload>
                    <el-dialog v-model="IdialogVisible"  >
                        <img w-full :src="iURL+ProductList.coverImage" />
                    </el-dialog>
                </el-col>
            </el-row>
        <template #footer>
            <el-button @click="updateProduct(ProductList.id), updateVisible = false">保存</el-button>
            <el-button type="primary" @click="this.updateVisible = false"> 取消 </el-button>
        </template>
    </el-dialog>
    <!-- 商品列表 -->
    <div>
        <el-table :data="filterTableData" style="width: 100%" height="650">

            <el-table-column fixed prop="name" label="商品名称" width="170" />
            <el-table-column prop="detail" label="详情" width="320" />
            <el-table-column prop="price" label="价格(￥)" width="100" />
            <el-table-column prop="stock" label="库存" width="120" />
            <el-table-column prop="createTime" label="上架时间" width="200" />
            <el-table-column prop="coverImage" label="商品封面" width="220">
                <template #default="scope">
                    <el-image style="width: 40px; height: 40px" :src="iURL+scope.row.coverImage" class="tp" />
                </template>
            </el-table-column>

            <el-table-column fixed="right" width="200">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="搜索" />
                </template>
                <template #default="scope">
                    <el-button link type="primary" @click="handleButtonClick(scope.row.id)">删除</el-button>
                    <el-button link type="primary" @click="oneProduct(scope.row.id), updateVisible = true">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import moment from 'moment';

export default {
    setup() {
    },
    data() {
        return {
            imageUrl:'',
            // search: '',
            dialogVisible: false,
            updateVisible: false,
            disabled: false,
            categories: [],
            tableData: [],
            ProductList: [],
            goodsData: {
                name: "",
                detail: "",
                price: 0,
                stock: 1,
                createTime: new Date(),
                coverImage: '',
                moreImage: '',
                classifyId: null,
            },
            iURL:'http://127.0.0.1:8080/images/',
            fileList:[],
            IdialogVisible:false,
            Idisabled:false,
        }
    },
    mounted() {
        this.productList();
    },
    computed: {
        filterTableData() {
            return this.tableData.filter(
                (data) =>
                    !this.search ||
                    data.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
    methods: {
        getClassify() {
            axios.get('/api/classify')
                .then(response => {
                    this.categories = response.data
                })
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct() {
            // 判断是否为空
            if (this.goodsData.name != '' && this.goodsData.detail != '' && this.goodsData.createTime != null) {
                // 将 publishDate 转换为格式为 "yyyy-MM-dd"
                this.goodsData.createTime = moment(this.goodsData.createTime).format("yyyy-MM-DD");
                // 构造发送给后端的数据对象
                axios.post('/api/products/add', this.goodsData)
                    .then(response => {
                        // 处理成功响应
                        console.log("插入成功", response);
                        this.dialogVisible = false;
                        // 刷新页面
                        this.productList();
                        ElMessage({
                            message: '添加成功',
                            type: 'success',
                        })
                        // 清空数据
                        this.goodsData = {}
                        this.fileList = [];
                    })
                    .catch(error => {
                        console.log("插入失败", error);
                        // 处理错误
                    });
            } else {
                ElMessage({
                    message: '不能为空',
                    type: 'success',
                })
            }
        },
        // 查询单个商品信息
        oneProduct(userId) {
            let gid = userId
            console.log('点击的商品ID:', gid);
            axios.get(`/api/products/${gid}`)
                .then((response) => {
                    this.ProductList = response.data
                    console.log(this.ProductList);
                })
        },
        // 修改商品
        updateProduct(id) {
            console.log(id);
            axios.put(`/api/update/product/${id}`, this.ProductList)
                .then(response => {
                    console.log(response.data);
                    ElMessage({ message: '修改成功', type: 'success', })
                    this.productList()
                    console.log('商品修改成功');
                })
                .catch(error => {
                    // 处理错误
                    console.error('商品修改失败', error);
                    ElMessage({ message: '修改失败', type: 'success', })
                });
        },
        // 删除商品操作
        handleButtonClick(userId) {
            // this.updateVisible = true
            let gid = userId
            // 在这里处理点击行获取到的 userId
            console.log('点击的商品ID:', gid);
            axios.delete(`/api/delete/product/${gid}`)
                .then(() => {
                    // 删除成功后刷新商品列表
                    this.productList();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        // 查询商品列表
        productList() {
            axios.get('/api/product/list')
                .then(response => {
                    this.tableData = response.data;

                })
                .catch(error => {
                    console.log(error);
                });
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                this.$message.error('上传文件格式只能是 JPG/PNG格式!');
            }
            if (!isLt2M) {

                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return (isJPG || isPNG) && isLt2M;
        },
        handleRemove(file,fileList) {
            const that = this;
            that.fileList = [];
            // 发送删除请求给后端
            axios.delete(`/api/deleteImage?filePath=${that.imageUrl}`)
                .then(response => {
                    // 处理删除成功的情况
                    console.log(response);
                })
                .catch(error => {
                    // 处理删除失败的情况
                    console.error('删除失败', error);
                });
        },
        handleSuccess(response) {
            // 上传成功后的处理
             this.goodsData.coverImage = response.imageName; 
             this.imageUrl = response.imageUrl;
        },
        updateSuccess(response) {
            // 上传成功后的处理
             this.ProductList.coverImage= response.imageName
        }
    }
}

</script>
<style Sass>
.dialog-footer button:first-child {
    margin-right: 10px;
}

.block {
    margin-top: 10px;
}

.el-row {
    margin-bottom: 10px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.demo-image .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    vertical-align: top;
}

.demo-image .block:last-child {
    border-right: none;

}

.demo-image .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>