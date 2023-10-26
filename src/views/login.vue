<template>
    <!-- 1表单的数据主要参考http://api.jqrjq.cn/doc.html#/jqr/mobile-controller/eLoginUsingPOST -->
    <!-- 2 数据格式
    {
    "email": "",
    "password": ""
    } 
    3.问题  
       图片圆角
       表单邮箱和密码加上图标
    -->
    <div class="image-preview">
        <el-image style="width: 100px; height: 100px;border-radius: 25px;" :src="url" :zoom-rate="1.2" :preview-src-list="srcList"
            :initial-index="4" fit="cover" />
    </div>


    <el-form ref="formRef" :model="loginForm" class="demo-dynamic">
        <el-form-item prop="email"  :rules="[
            {
                required: true,
                message: '请输入你的邮箱',
                trigger: 'blur',
            },
            {
                type: 'email',
                message: '请输入格式正确的邮箱',
                trigger: ['blur', 'change'],
            },
        ]">
        <el-input v-model="loginForm.email" placeholder="请输入你的邮箱"  >
            <template #prefix>
                <el-icon>
                    <Message />
                </el-icon>
            </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="{
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
        }">
            <el-input type="password" v-model="loginForm.password"  placeholder="请输入你的密码" >
                <template #prefix>
                    <el-icon><Lock /></el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">用户登录</el-button>
            <el-button type="primary" @click="onRegister">注册用户</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" @click="onRetrieve">忘记密码</el-button>
        </el-form-item>
    </el-form>
    <!-- 添加 pinia 相关内容 -->
        <!--<pinia-login v-if="isUserLoggedIn" />--> 
</template>
  
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { login } from '@/http/user.js'
import { useUserStore } from '@/store/user'
const formRef = ref(null)
// import { useStore } from 'pinia'; // 导入 Pinia 相关内容
// const store = useStore(); // 获取 Pinia store
const router = useRouter();
// const isUserLoggedIn = computed(() => {
//     // 根据用户是否已登录返回 true 或 false
//     return store.state.isUserLoggedIn;
// });
const userStore = useUserStore();
const url =
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const loginForm = reactive({
    password: "",
    email: ""
})

const submitForm = () => {
    if (!formRef.value) return
    formRef.value.validate((valid) => {
        if (valid) {
            const data = loginForm;
            userLogin(data);
        } else {
            ElMessage.error("输入错误")
            return false
        }
    })
}

const userLogin = (data) => {
    login(data).then(res => {
        if (res.success) {
            userStore.user.token = res.data.userinfo.token;
            userStore.user.email = res.data.userinfo.email;
            userStore.user.userName = res.data.userinfo.userName;
            console.log(res);
            router.push("/user")
        } else {
            ElMessage(res.msg)
        }
    }).catch(err => {
        ElMessage.error(err)
    })
}

const onRegister = () => {
    router.push('/register')
}

const onRetrieve = () => {
    router.push('/retrieve')
}


</script>

<style>

.el-form-item__content{
    justify-content: center;
}
</style>
  