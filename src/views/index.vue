<template>
  <Layout>
    <transition name="fade" mode="out-in">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </transition>
  </Layout>
</template>

<script setup>
import Layout from '@/layout/TheIndex.vue'

</script>

<style lang="scss" scoped>

</style>