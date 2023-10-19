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
        <el-image style="width: 100px; height: 100px;border-radius: 25px;" :src="url" :zoom-rate="1.2" :preview-src-list="srcList"
            :initial-index="4" fit="cover" />
    </div>


    <el-form ref="formRef" :model="RegisterForm" class="demo-dynamic">
        <el-form-item prop="userName" :rules="[
            {
                required: true,
                message: '请输入你的姓名',
                trigger: 'blur',
            },
        ]">
            <el-input v-model="RegisterForm.userName" placeholder="请输入你的姓名" autofocus >
                <template #prefix>
                    <el-icon><User /></el-icon>
                </template>
            </el-input>
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
            <el-input v-model="RegisterForm.email" placeholder="请输入你的邮箱" >
                <template #prefix>
                    <el-icon><Message /></el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="{
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
        }">
            <el-input v-model="RegisterForm.password" placeholder="请输入你的密码" show-password >
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="repassword" :rules="{
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur',
        }">
            <el-input v-model="RegisterForm.repassword" placeholder="请确认你的密码" show-password >
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onRegister">注册</el-button>
            <el-button type="primary" @click="onLogin">前往用户登录</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { register } from '@/http/user.js'
const router = useRouter();
const formRef = ref(null)
const url =
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const RegisterForm = reactive({
    userName: "",
    password: "",
    repassword: '',
    email: ""
})

const onRegister = () => {
    if (!formRef.value) return
    formRef.value.validate((valid) => {
        if (valid && RegisterForm.password===RegisterForm.repassword) {
            const data = RegisterForm;
            console.log("1231"+data);
            userRegister(data);
        } else {
            ElMessage.error("输入错误")
            return false
        }
    })
}

const userRegister = (data) => {
    register(data).then(res => {
        if (res.success) {
            router.push("/user")
        } else {
            ElMessage(res.msg)
        }
    }).eatch(err => {
        ElMessage.error(err)
    })
}

const onLogin = () => {
    router.push("/login");
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
  