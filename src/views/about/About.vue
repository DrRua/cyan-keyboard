<template>
  <div class="about-page">
    <h1 class="title">关于</h1>
    <div class="app-info">
      <h3 class="h3-title">
        <div class="logo"></div>
        Mocan
      </h3>
      <h4 class="h4-title">版本号：{{ state.version }}</h4>
      <h4 class="h4-title">版本发布时间：{{ state.date }}</h4>
      <h4 class="h4-title">electron：{{ state.electron }}</h4>
      <h4 class="h4-title">node：{{ state.node }}</h4>
      <h4 class="h4-title">v8：{{ state.v8 }}</h4>
      <h4 class="h4-title">chrome：{{ state.chrome }}</h4>
      <h4 class="h4-title des-title">功能描述</h4>
      <h4 class="h5-title">1、后台监听键盘使用情况，统计使用时间的次数信息；</h4>
      <h4 class="h5-title">2、绑定快捷键自定义输入；</h4>
      <h4 class="h5-title">2、快捷键鼠标自动连续点击，自定义点击间隔时间。</h4>
    </div>
    <div class="container">
      <div class="lamp">
        <div class="lamp-base"></div>
        <div class="lamp-middle"></div>
        <div class="lamp-top"></div>
        <div class="lamp-shade"></div>
        <div class="lamp-light"></div>
      </div>
      <div class="laptop">
        <div class="laptop-top">
          <div class="display">
            <div class="editor-left">
              <div class="code-left"></div>
            </div>
            <div class="editor-right">
              <code class="right"></code>
            </div>
          </div>
        </div>
        <div class="laptop-bottom">
          <div class="laptop-bottom-shadow"></div>
        </div>
      </div>
      <div class="window">
        <div class="window-menu"></div>
        <p class="window-text">莫灿</p>
      </div>
      <div class="mug"></div>
      <div class="lightbulb"></div>
      <div class="cloud">
        <div class="cloud1"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  version: '',
  date: '2022-04-01',
  electron: window.$electron.versions.electron,
  node: window.$electron.versions.node,
  v8: window.$electron.versions.v8,
  chrome: window.$electron.versions.chrome,
})

window.$electron.sendMsg({ handler: 'getVsersion' })
window.$electron.onMessage('getVsersion', (e, arg) => {
  state.version = arg.msg
})

</script>

<style lang="scss" scoped>
.app-info {
  padding: 16px 20px;
  .h3-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 8px;
    color: #7adaff;
    font-family: wanju, KaiTi, sans-serif;
    .logo {
      display: inline-block;
      width: 80px;
      height: 80px;
      margin-right: 8px;
      background-image: url('../../assets/mocan.ico');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  .h4-title {
    color: #7adaff;
    font-family: wanju, KaiTi, sans-serif;
    &.des-title {
      margin-top: 12px;
    }
  }
  .h5-title {
    color: #80b7cc;
    font-family: wanju, KaiTi, sans-serif;
  }
}
.container {
  --background: #e0fbfc;
  --border: #003566;
  --laptop: #e9eff1;
  --laptop-shadow: #d3d6d9;
  --display-left: #fff;
  --display-right: #4f5e69;
  --code-red: #ed1d69;
  --code-green: #9bc53d;
  --code-white: #fff;
  --code-yellow: #f4e285;
  --lamp: #e56b6f;
  --mug: #83c5be;
  --mug-shadow: #59b1a8;

  position: relative;
  height: 400px;
  width: 700px;
  margin: 0 auto;
  border-bottom: 5px solid var(--border);

  .lamp {
    position: absolute;
    left: 10%;
    bottom: 0;
    z-index: 100;
    .lamp-base {
      position: relative;
      width: 90px;
      height: 25px;
      background-color: var(--lamp);
      border: 3px solid var(--border);
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      z-index: 4;

      &::before {
        content: '';
        position: absolute;
        bottom: 19px;
        left: 50%;
        transform: translateX(-50%) skew(30deg);
        transform-origin: bottom left;
        width: 26px;
        height: 100px;
        background-color: var(--lamp);
        border: 3px solid var(--border);
        z-index: 0;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) skew(30deg);
        transform-origin: bottom left;
        height: 90px;
        width: 10px;
        background-color: var(--background);
        border: 2px solid var(--border);
      }
    }

    .lamp-middle {
      position: absolute;
      bottom: 102px;
      left: -26px;
      display: grid;
      place-items: center;
      height: 32px;
      width: 32px;
      background-color: var(--lamp);
      border: 3px solid var(--border);
      border-radius: 50%;
      z-index: 5;

      &::after {
        content: '';
        display: block;
        height: 17px;
        width: 17px;
        border: 2px solid var(--border);
        border-radius: 50%;
      }
    }
    .lamp-top {
      content: '';
      position: absolute;
      bottom: 119px;
      left: -26px;
      transform: skew(-40deg);
      transform-origin: bottom;
      width: 26px;
      height: 100px;
      background-color: var(--lamp);
      border: 3px solid var(--border);
      z-index: 0;
      &::after {
        content: '';
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        transform-origin: bottom left;
        height: 85px;
        width: 10px;
        background-color: var(--background);
        border: 2px solid var(--border);
      }
    }
    .lamp-shade-container {
      position: relative;
      z-index: 1;
    }
    .lamp-shade {
      position: absolute;
      bottom: 170px;
      left: 78px;
      width: 55px;
      height: 70px;
      background-color: var(--lamp);
      border: 3px solid var(--border);
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
      transform: rotate(30deg);
      &::before {
        content: '';
        position: absolute;
        left: -40px;
        bottom: 13px;
        display: block;
        height: 40px;
        width: 45px;
        background-color: var(--lamp);
        border: 2px solid var(--border);
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
      }
    }
    .lamp-light {
      position: absolute;
      bottom: 180px;
      left: 150%;
      height: 5px;
      width: 15px;
      background-color: var(--code-yellow);
      transform: rotate(30deg);
      &::before {
        content: '';
        position: absolute;
        top: 25px;
        display: block;
        height: 5px;
        width: 15px;
        background-color: var(--code-yellow);
        transform: rotate(30deg);
      }
      &::after {
        content: '';
        position: absolute;
        bottom: 25px;
        display: block;
        height: 5px;
        width: 15px;
        background-color: var(--code-yellow);
        transform: rotate(-30deg);
      }
    }
  }
  .laptop {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    .laptop-top {
      height: 130px;
      width: 180px;
      padding: 10px 6px 6px;
      border: 4px solid var(--border);
      border-bottom: 0;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background-color: var(--laptop);
      .display {
        position: relative;
        display: flex;
        height: 100%;
        width: 100%;
        border: 2px solid var(--border);
        border-radius: 5px;
        &::before {
          content: '';
          position: absolute;
          display: block;
          height: 4px;
          width: 4px;
          background-color: var(--border);
          border-radius: 50%;
          left: 50%;
          top: -8px;
        }
        .editor-left {
          height: 100%;
          width: 30%;
          background-color: var(--display-left);
          padding: 6px 5px;
          &::after {
            content: '';
            display: block;
            width: 24px;
            height: 5px;
            background-color: var(--display-right);
            box-shadow: 6px 9px var(--display-right), 6px 18px var(--display-right),
              12px 27px var(--display-right), 6px 38px var(--display-right),
              12px 47px var(--display-right), 12px 56px var(--display-right),
              6px 67px var(--display-right), 12px 76px var(--display-right),
              6px 87px var(--display-right);
          }
        }
        .editor-right {
          height: 100%;
          width: 70%;
          padding: 8px 9px;
          background-color: var(--display-right);
          &::after {
            content: '';
            display: block;
            width: 15px;
            height: 5px;
            background-color: var(--code-red);
            box-shadow: 6px 10px var(--code-white), 15px 10px var(--code-white),
              6px 20px var(--code-red), 25px 20px var(--code-green),
              30px 20px var(--code-green), 49px 20px var(--code-yellow),
              60px 20px var(--code-yellow), 79px 20px var(--code-green),
              12px 30px var(--code-yellow), 27px 30px var(--code-yellow),
              46px 30px var(--code-red), 6px 40px var(--code-white),
              21px 40px var(--code-white), 36px 40px var(--code-white),
              55px 40px var(--code-white), 6px 50px var(--code-red),
              25px 50px var(--code-green), 44px 50px var(--code-yellow),
              59px 50px var(--code-yellow), 78px 50px var(--code-red),
              6px 60px var(--code-white), 21px 60px var(--code-white),
              40px 60px var(--code-white), 55px 60px var(--code-white),
              70px 60px var(--code-white), 6px 70px var(--code-white),
              25px 70px var(--code-white), 40px 70px var(--code-white),
              59px 70px var(--code-white);
          }
        }
      }
    }
    .laptop-bottom {
      content: '';
      display: block;
      position: relative;
      left: -14px;
      height: 20px;
      width: 208px;
      background-color: var(--laptop);
      border: 4px solid var(--border);
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      overflow: hidden;
      &::after {
        content: '';
        display: block;
        position: absolute;
        height: 6px;
        width: 200px;
        bottom: 0;
        background-color: var(--laptop-shadow);
      }
    }
  }
  .window {
    position: absolute;
    bottom: 150px;
    right: 100px;
    height: 90px;
    width: 120px;
    border: 3px solid var(--border);
    border-radius: 5px;
    background-color: #fff;
    z-index: 3;
    .window-menu {
      width: 100%;
      height: 15px;
      background-color: var(--laptop);
      border-bottom: 3px solid var(--border);
      &::before {
        content: '';
        display: block;
        position: relative;
        top: 50%;
        left: 3px;
        transform: translateY(-50%);
        height: 4px;
        width: 4px;
        background-color: var(--border);
        border-radius: 50%;
        box-shadow: 5px 0 var(--border), 10px 0 var(--border);
      }
    }
    .window-text {
      position: relative;
      padding: 10px 5px;
      font-family: 'Lato', sans-serif;
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--border);
      text-align: center;
      &::before {
        content: '<';
        position: absolute;
        left: 15px;
      }
      &::after {
        content: '>';
        position: absolute;
        right: 15px;
      }
    }
  }
  .mug {
    position: absolute;
    bottom: 0;
    right: 150px;
    height: 50px;
    width: 40px;
    background-color: var(--mug);
    border: 2px solid var(--border);
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 3px;
      display: block;
      height: 30px;
      width: 35px;
      border: 3px solid var(--border);
      border-radius: 18px;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      display: block;
      height: 100%;
      width: 23%;
      background-color: var(--mug-shadow);
    }
  }
  .lightbulb {
    position: absolute;
    bottom: 260px;
    right: 260px;
    height: 0px;
    width: 30px;
    border-top: 20px solid var(--code-yellow);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    z-index: 3;
    &::after {
      content: '';
      position: absolute;
      bottom: 13px;
      right: 50%;
      transform: translateX(50%);
      display: block;
      height: 45px;
      width: 45px;
      background-color: var(--code-yellow);
      border-radius: 50%;
    }
    &::before {
      content: '';
      position: absolute;
      display: block;
      height: 15px;
      width: 20px;
      background-color: var(--border);
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .cloud {
    position: absolute;
    bottom: 210px;
    right: 200px;
    width: 160px;
    height: 60px;
    background-color: white;
    border-bottom: 1px solid var(--border);
    &::before {
      content: '';
      position: absolute;
      left: -25px;
      display: block;
      height: 60px;
      width: 60px;
      background-color: white;
      border-left: 1px solid var(--border);
      border-radius: 50%;
    }
    &::after {
      content: '';
      position: absolute;
      right: -25px;
      display: block;
      height: 60px;
      width: 60px;
      background-color: white;
      border-right: 1px solid var(--border);
      border-radius: 50%;
    }
  }
  .cloud1 {
    position: absolute;
    bottom: 30px;
    width: 80px;
    height: 80px;
    background-color: white;
    border-top: 1px solid var(--border);
    border-radius: 50%;
    &::after {
      content: '';
      position: absolute;
      left: 75px;
      bottom: -10px;
      display: block;
      width: 70px;
      height: 70px;
      background-color: white;
      border-top: 1px solid var(--border);
      border-radius: 50%;
    }
  }
}
</style>