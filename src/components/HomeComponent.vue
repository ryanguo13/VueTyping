<template>
  <div class="home">
    <h1>Welcome to the Typing Website</h1>
    <router-link to="/typing">Start Typing Test</router-link>

    <h2>Buy me a cup of coffee</h2>
    <button @click="showModal = true">Sponsor</button>
    
    <!-- 模态框 -->
    <transition name="fade">
      <div v-if="showModal" class="modal" @click.self="hideModal">
        <div class="modal-content">
          <img :src="sponsorImageSrc" alt="Sponsor" />
          <button @click="hideModal">Close</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 图片路径
const sponsorImageSrc = 'https://ryan-1257581073.cos.ap-guangzhou.myqcloud.com//IMG_6326.png'; // 替换为实际图片路径

// 控制模态框显示状态
const showModal = ref(false);

// 关闭模态框
function hideModal() {
  showModal.value = false;
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.modal-content img {
  max-width: 100%;
  height: auto;
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>