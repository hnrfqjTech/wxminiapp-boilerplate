<template>
  <div class="home-page">
    <customer></customer>

    <div style="text-align: center;">
      <navigator
        url="/pages/pkg/list/index">
        点击去列表页
      </navigator>
    </div>
  </div>
</template>

<script>
  import customer from "@/components/customer";
  import { postData } from '@/api';
  export default {
    components: {
      customer
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    onShareAppMessage: function() {
      return {
        title: "给您推荐了wxminiapp-boilerplate",
        path: "pages/home/index",
        success() {}
      };
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .home-page {
  }
</style>
