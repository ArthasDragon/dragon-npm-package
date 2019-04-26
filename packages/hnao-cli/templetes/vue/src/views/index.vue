<template >
  <div>
    <div class="menu"  @click="showDownDiv()">
      <img class="menuIcon" src="../assets/img/index/menu-icon.png" alt="">
      <div class="menuPop">
        <div class="menuPopDown" :class="showDown == true ? 'show' : ''">
          <p class="outP">退出</p>
        </div>
      </div>
    </div>
    <!-- 顶部背景 -->
    <div class="indexTop">
      <img src="../assets/img/index/comLogo.png" alt="">
    </div>
    <!-- 个人信息 -->
    <div class="personalInfo">
      <p>方晓</p>
      <p>15355668888</p>
    </div>
    <!-- 选项 -->
    <div class="indexOption">
      <div class="optionIteam"  @click="to_spot">
        <div class="iteamImg">
          <img src="../assets/img/index/indexIcon1.png" alt="">
        </div>
        <p>现场登记</p>
      </div>
      <div class="optionIteam">
        <div class="iteamImg">
          <img src="../assets/img/index/indexIcon2.png" alt="">
          <P class="surNum">2</P>
        </div>
        <p>预约登记</p>
      </div>
      <div class="optionIteam">
        <div class="iteamImg">
          <img src="../assets/img/index/indexIcon3.png" alt="">
        </div>
        <p>送货登记</p>
      </div>
      <div class="optionIteam">
        <div class="iteamImg">
          <img src="../assets/img/index/indexIcon4.png" alt="">
        </div>
        <p>提货登记</p>
      </div>
      <div class="optionIteam"  @click="to_pass">
        <div class="iteamImg">
          <img src="../assets/img/index/indexIcon5.png" alt="">
        </div>
        <p>我的通行证</p>
      </div>
      <div class="optionIteam" @click="to_visitRecord">
        <div class="iteamImg">
          <img src="../assets/img/index/indexIcon6.png" alt="">
        </div>
        <p>我的拜访记录</p>
      </div>
      <div class="optionIteam">
        <div class="iteamImg">
          <img src="../assets/img/index/indexIcon7.png" alt="">
        </div>
        <p>帮助预约</p>
      </div>
      <div class="optionIteam" @click="to_signOUt">
        <div class="iteamImg">
          <img src="../assets/img/index/indexIcon8.png" alt="">
        </div>
        <p>扫码签退</p>
      </div>
    </div>
    <!-- 退出 -->
    <div class="out"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      showDown: false
    }
  },
  methods: {
    // 跳转现场登记
    to_spot () {
      this.$router.push({ name: 'Spot' })
      console.log(this.$router)
    },
    // 跳转通行证
    to_pass () {
      this.$router.push({ name: 'Pass' })
      console.log(this.$router)
    },
    // 跳转扫码签退
    to_signOUt () {
      this.$router.push({ name: 'SignOut' })
      console.log(this.$router)
    },
    // 跳转拜访记录
    to_visitRecord () {
      this.$router.push({ name: 'VisitRecord' })
      console.log(this.$router)
    },
    // 头部菜单
    showDownDiv () {
      this.showDown = !this.showDown
    }
  }
}
</script>

<style scoped>
  .show{
    display: block
  }
</style>
