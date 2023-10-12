<template>
    <!-- 1表单的数据主要参考http://api.jqrjq.cn/doc.html#/jqr/mobile-controller/eRegisterUsingPOST -->
    <!-- 2 数据格式
    {
        "email": "",
        "password": "",
        "userName": ""
    }    

    3.问题  
       图片圆角
       userName,邮箱和密码加上图标
    -->


    <div class="image-preview">
        <el-image style="width: 100px; height: 100px" :src="url" :zoom-rate="1.2" :preview-src-list="srcList"
            :initial-index="4" fit="cover" />
    </div>


    <el-form ref="formRef" :model="loginForm" class="demo-dynamic">
        <el-form-item prop="userName" :rules="[
            {
                required: true,
                message: '请输入你的姓名',
                trigger: 'blur',
            },
        ]">
            <el-input v-model="loginForm.userName" placeholder="请输入你的姓名" autofocus />
        </el-form-item>
        <el-form-item prop="email" :rules="[
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
            <el-input v-model="loginForm.email" placeholder="请输入你的邮箱" />
        </el-form-item>
        <el-form-item prop="password" :rules="{
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
        }">
            <el-input v-model="loginForm.password" placeholder="请输入你的密码" show-password />
        </el-form-item>
        <el-form-item prop="repassword" :rules="{
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur',
        }">
            <el-input v-model="loginForm.password" placeholder="请确认你的密码" show-password />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">用户登录</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script setup>
import { reactive, } from 'vue'
const url =
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const loginForm = reactive({
    password: "",
    repassword: '',
    email: ""
})

const submitForm = (formEl) => {
    console.log(formEl)
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

</script>

<style>
.el-form-item__content {
    justify-content: center;
}

.image-preview {
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
  