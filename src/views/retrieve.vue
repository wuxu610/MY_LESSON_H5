<template>
    <div class="image-preview">
        <el-image style="width: 100px; height: 100px; border-radius: 25px;" :src="url" :zoom-rate="1.2"
            :preview-src-list="srcList" :initial-index="4" fit="cover" />
    </div>

    <el-form ref="formRef" :model="resetForm" class="demo-dynamic">
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
            <el-input v-model="resetForm.email" placeholder="请输入你的邮箱" >
                <template #prefix>
                    <el-icon><Message /></el-icon>
                </template>            
            </el-input>
        </el-form-item>
        <el-form-item class="retrieve-from_verification">
                <el-input v-model="resetForm.verification" placeholder="请输入验证码" >
                    <template #prefix>
                        <el-icon><ChatDotSquare /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
        <el-form-item>
            <el-input v-model="resetForm.password" placeholder="请输入你的密码" >
                <template #prefix>
                    <el-icon><Lock /></el-icon>
                </template>   
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="resetPassword">重置密码</el-button>
            <el-button type="primary" @click="onLogin">返回登录</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script setup>
import { reactive } from 'vue';
import { useRouter } from "vue-router";
import { h } from 'vue'
import { ElMessage } from 'element-plus'
const router = useRouter();
const url =
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg';
const resetForm = reactive({
    email: "",
    verification: "",
    password: ""
});

const resetPassword = () => {
    if (resetForm.email === '123@qq.com') {
        ElMessage({
            message: h('p', null, [
                h('span', { style: 'color: red' }, '重置成功'),
            ]),
        })
        router.push('/login')
    } else {
        ElMessage({
            message: h('p', null, [
                h('span', { style: 'color: red' }, '邮箱不存在，请检查您的输入。'),
            ]),
        })
    }
}

const onLogin = () => {
    router.push('/login');
}
</script>

<style>
.el-form-item__content {
    justify-content: center;
}
</style>
