<template>
    <div class="user-profile">
        <h1>个人中心</h1>
        <div class="user-info">
            <div class="user-avatar">
                <img :src="url" alt="用户头像" />
            </div>
            <div class="user-details">
                <p>{{ user.username }}</p>
                <p class="user-details_email">{{ user.email }}</p>
            </div>
        </div>
        <div class="user-btn">
            <el-button type="primary" @click="exitBtn">退出登陆</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from "vue-router";
const router = useRouter();
const url =
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const formRef = ref(null)
const userStore = useUserStore()
const user = ref({
    username: userStore.user.userName,
    email: userStore.user.email
})
const exitBtn = () => {
    router.push("/login")
}


</script>

<style scoped>
.user-profile {
    text-align: center;
}

.user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
}

.user-avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
}
.user-details_email{
    color:#a1a5a8;
    font: 10px;
}
</style>
