<template>
  <div class="home-page">
    <h1 class="title">键盘校验</h1>
    <div class="keyboard">
      <div
        class="key s2 esc"
        data-key="`"
      >~</div>
      <div
        class="key"
        on-shift="!"
        data-key="1"
      >1</div>
      <div
        class="key"
        on-shift="@"
        data-key="2"
      >2</div>
      <div
        class="key"
        on-shift="#"
        data-key="3"
      >3</div>
      <div
        class="key"
        on-shift="$"
        data-key="4"
      >4</div>
      <div
        class="key"
        on-shift="%"
        data-key="5"
      >5</div>
      <div
        class="key"
        on-shift="^"
        data-key="6"
      >6</div>
      <div
        class="key"
        on-shift="&amp;"
        data-key="7"
      >7</div>
      <div
        class="key"
        on-shift="*"
        data-key="8"
      >8</div>
      <div
        class="key"
        on-shift="("
        data-key="9"
      >9</div>
      <div
        class="key"
        on-shift=")"
        data-key="0"
      >0</div>
      <div
        class="key sub"
        on-shift="_"
        data-key="-"
      >-</div>
      <div
        class="key add"
        on-shift="+"
        data-key="="
      >=</div>
      <div
        class="key s4 back"
        data-key="Backspace"
      >←</div>
      <div
        class="key s3 tab"
        data-key="Tab"
      >Tab</div>
      <div
        class="key"
        data-key="Q"
      >Q</div>
      <div
        class="key"
        data-key="W"
      >W</div>
      <div
        class="key"
        data-key="E"
      >E</div>
      <div
        class="key"
        data-key="R"
      >R</div>
      <div
        class="key"
        data-key="T"
      >T</div>
      <div
        class="key"
        data-key="Y"
      >Y</div>
      <div
        class="key"
        data-key="U"
      >U</div>
      <div
        class="key"
        data-key="I"
      >I</div>
      <div
        class="key"
        data-key="O"
      >O</div>
      <div
        class="key"
        data-key="P"
      >P</div>
      <div
        class="key openbracket"
        on-shift="{"
        data-key="["
      >[</div>
      <div
        class="key closebracket"
        on-shift="}"
        data-key="]"
      >]</div>
      <div
        class="key s3 pipe"
        on-shift="|"
        data-key="|"
      >\</div>
      <div
        ref="capRef"
        class="key s4 cap"
        data-key="CapsLock"
      >🔓</div>
      <div
        class="key"
        data-key="A"
      >A</div>
      <div
        class="key"
        data-key="S"
      >S</div>
      <div
        class="key"
        data-key="D"
      >D</div>
      <div
        class="key dotted"
        data-key="F"
      >F</div>
      <div
        class="key"
        data-key="G"
      >G</div>
      <div
        class="key"
        data-key="H"
      >H</div>
      <div
        class="key dotted"
        data-key="J"
      >J</div>
      <div
        class="key"
        data-key="K"
      >K</div>
      <div
        class="key"
        data-key="L"
      >L</div>
      <div
        class="key semi"
        on-shift=":"
        data-key=";"
      >;</div>
      <div
        class="key comma"
        on-shift="&quot;"
        data-key=","
      >,</div>
      <div
        class="key s4 enter"
        data-key="Enter"
      >Enter</div>
      <div
        class="key s5 shift"
        data-key="💪"
      >Shift</div>
      <div
        class="key"
        data-key="Z"
      >Z</div>
      <div
        class="key"
        data-key="X"
      >X</div>
      <div
        class="key"
        data-key="C"
      >C</div>
      <div
        class="key"
        data-key="V"
      >V</div>
      <div
        class="key"
        data-key="B"
      >B</div>
      <div
        class="key"
        data-key="N"
      >N</div>
      <div
        class="key"
        data-key="M"
      >M</div>
      <div
        class="key openangular"
        on-shift="&lt;"
        data-key=","
      >,</div>
      <div
        class="key closeangular"
        on-shift="&gt;"
        data-key="."
      >.</div>
      <div
        class="key slash"
        on-shift="?"
        data-key="/"
      >/</div>
      <div
        class="key s5 shift up"
        data-key="Shift"
      >Shift</div>
      <div
        class="key s3 control"
        data-key="Ctrl"
      >Ctrl</div>
      <div
        class="key s3 win"
        data-key="win"
      >❤</div>
      <div
        class="key s3 alt"
        data-key="Alt"
      >Alt</div>
      <div
        class="key s12 space"
        data-key="Space"
      ></div>
      <div
        class="key s3 alt"
        data-key="Alt"
      >Alt</div>
      <div
        class="key s2 fn left"
        data-key="win"
      >♥</div>
      <div
        class="key s2 fn down"
        data-key="Ctrl"
      >Ctrl</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  const keys = document.querySelectorAll('.key')
  keys.forEach((k) => k.addEventListener('transitionend', unPress))
})

function unPress(e) {
  if (e.propertyName === 'transform') this.classList.remove('pressed')
}

// 接收消息
window.$electron.onMessage('keydown', (event, arg) => {
  handleKeyDown(arg, 'keydown')
})
window.$electron.onMessage('keyup', (event, arg) => {
  handleKeyDown(arg, 'keyup')
})

const capRef = ref(null)

const handleKeyDown = (e, type) => {
  const handler = type === 'keydown' ? 'add' : 'remove'
  const target = `.key[data-key="${e.keyName}"]`
  const key = document.querySelector(target)
  key && key.classList[handler]('pressed')
}

</script>

<style lang="scss" scoped>
.keyboard {
  --keyboard-key-color: #8a94a4;

  display: grid;
  grid-template-columns: repeat(30, 2.7%);
  grid-template-rows: repeat(5, 4.75vw);
  grid-gap: 0.9vw 0.65%;
  padding: 20px;
  background-color: transparent;
  .key {
    border-radius: 0.76vw;
    grid-column: auto/span 2;
    width: 100%;
    height: 100%;
    padding: 0.475vw;
    font-size: 1.9vw;
    display: grid;
    align-items: center;
    color: var(--keyboard-key-color);
    justify-content: center;
    cursor: pointer;
    background: #d8dee8;
    transition: all 100ms cubic-bezier(0.09, 0.32, 0.34, 2);
    user-select: none;
    &:hover, &.pressed {
      transform: perspective(300px) scale(0.97);
      box-shadow: inset -0.316666666666667vw -0.316666666666667vw 0.95vw -0.158333333333333vw #f6f8fa, inset 0.316666666666667vw 0.316666666666667vw 0.633333333333333vw #c2ccdb;
      color: #fff;
      text-shadow: 0 0 10px #f7f9fa, 0 0 15px #f7f9fa, 0 0 20px #f7f9fa;
    }
    &.dotted {
      position: relative;
      &::before {
        content: '_';
        font-weight: bold;
        color: #b5c0d2;
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &.esc {
      background: #ed4c67;
      color: #fbdbe1;
      &:hover, &.pressed {
        transform: perspective(300px) scale(0.97);
        box-shadow: inset -0.316666666666667vw -0.316666666666667vw 0.95vw -0.158333333333333vw #f38e9f, inset 0.316666666666667vw 0.316666666666667vw 0.633333333333333vw #c71432;
        color: #fff;
        text-shadow: 0 0 10px #f59eac, 0 0 15px #f59eac, 0 0 20px #f59eac;
      }
    }

    &.back {
      background: #d63031;
      color: #f7d6d6;
      &:hover, &.pressed {
        transform: perspective(300px) scale(0.97);
        box-shadow: inset -0.316666666666667vw -0.316666666666667vw 0.95vw -0.158333333333333vw #e57c7d, inset 0.316666666666667vw 0.316666666666667vw 0.633333333333333vw #991e1f;
        color: #fff;
        text-shadow: 0 0 10px #e88f90, 0 0 15px #e88f90, 0 0 20px #e88f90;
      }
    }

    &.shift {
      background: #1e90ff;
      color: #d2e9ff;
      &:hover, &.pressed {
        transform: perspective(300px) scale(0.97);
        box-shadow: inset -0.316666666666667vw -0.316666666666667vw 0.95vw -0.158333333333333vw #71b9ff, inset 0.316666666666667vw 0.316666666666667vw 0.633333333333333vw #0065c8;
        color: #fff;
        text-shadow: 0 0 10px #85c3ff, 0 0 15px #85c3ff, 0 0 20px #85c3ff;
      }
    }

    &.control {
      background: #be2edd;
      color: #f2d5f8;
      &:hover, &.pressed {
        transform: perspective(300px) scale(0.97);
        box-shadow: inset -0.316666666666667vw -0.316666666666667vw 0.95vw -0.158333333333333vw #d57be9, inset 0.316666666666667vw 0.316666666666667vw 0.633333333333333vw #891aa1;
        color: #fff;
        text-shadow: 0 0 10px #db8eec, 0 0 15px #db8eec, 0 0 20px #db8eec;
      }
    }

    &.win {
      background: #f7b731;
      color: #fdf1d6;
      &:hover, &.pressed {
        transform: perspective(300px) scale(0.97);
        box-shadow: inset -0.316666666666667vw -0.316666666666667vw 0.95vw -0.158333333333333vw #fad17d, inset 0.316666666666667vw 0.316666666666667vw 0.633333333333333vw #c78908;
        color: #fff;
        text-shadow: 0 0 10px #fad890, 0 0 15px #fad890, 0 0 20px #fad890;
      }
    }

    &.alt {
      background: #5352ed;
      color: #dddcfb;
      &:hover, &.pressed {
        transform: perspective(300px) scale(0.97);
        box-shadow: inset -0.316666666666667vw -0.316666666666667vw 0.95vw -0.158333333333333vw #9291f3, inset 0.316666666666667vw 0.316666666666667vw 0.633333333333333vw #1615ca;
        color: #fff;
        text-shadow: 0 0 10px #a2a1f5, 0 0 15px #a2a1f5, 0 0 20px #a2a1f5;
      }
    }

    &.fn {
      background: #26de81;
      color: #d4f8e6;
      &:hover, &.pressed {
        transform: perspective(300px) scale(0.97);
        box-shadow: inset -0.316666666666667vw -0.316666666666667vw 0.95vw -0.158333333333333vw #76eaaf, inset 0.316666666666667vw 0.316666666666667vw 0.633333333333333vw #189e5a;
        color: #fff;
        text-shadow: 0 0 10px #8aedbb, 0 0 15px #8aedbb, 0 0 20px #8aedbb;
      }
    }

    &.cap {
      background: #ee5a24;
      color: #fcded3;
      position: relative;
      &:hover, &.pressed {
        transform: perspective(300px) scale(0.97);
        box-shadow: inset -0.316666666666667vw -0.316666666666667vw 0.95vw -0.158333333333333vw #f49675, inset 0.316666666666667vw 0.316666666666667vw 0.633333333333333vw #b23a0e;
        color: #fff;
        text-shadow: 0 0 10px #f6a588, 0 0 15px #f6a588, 0 0 20px #f6a588;
      }
      &::before {
        content: '';
        position: absolute;
        width: 0.5vw;
        height: 0.5vw;
        background: #f6ac91;
        top: 1vw;
        right: 1vw;
        border-radius: 50%;
      }
      &.on::before {
        background: #fbded3;
        box-shadow: 0 0 0.5vw 0.2vw rgba(255,255,255,0.8);
      }
    }

    &.tab {
      background: #12cbc4;
      color: #cafaf8;
      &:hover, &.pressed {
        transform: perspective(300px) scale(0.97);
        box-shadow: inset -0.316666666666667vw -0.316666666666667vw 0.95vw -0.158333333333333vw #5aede7, inset 0.316666666666667vw 0.316666666666667vw 0.633333333333333vw #0d8e89;
        color: #fff;
        text-shadow: 0 0 10px #72f0eb, 0 0 15px #72f0eb, 0 0 20px #72f0eb;
      }
    }

    &.enter {
      background: #fdcb6e;
      color: #fff5e2;
      &:hover, &.pressed {
        transform: perspective(300px) scale(0.97);
        box-shadow: inset -0.316666666666667vw -0.316666666666667vw 0.95vw -0.158333333333333vw #fddea3, inset 0.316666666666667vw 0.316666666666667vw 0.633333333333333vw #fba403;
        color: #fff;
        text-shadow: 0 0 10px #fde2b0, 0 0 15px #fde2b0, 0 0 20px #fde2b0;
      }
    }

    &.s2 {
      font-size: 1.727272727272727vw;
      grid-column: auto/span 2;
    }
    &.s3 {
      font-size: 1.727272727272727vw;
      grid-column: auto/span 3;
    }
    &.s4 {
      font-size: 1.727272727272727vw;
      grid-column: auto/span 4;
    }
    &.s5 {
      font-size: 1.727272727272727vw;
      grid-column: auto/span 5;
    }
    &.s6 {
      font-size: 1.727272727272727vw;
      grid-column: auto/span 6;
    }
    &.s12 {
      font-size: 1.727272727272727vw;
      grid-column: auto/span 12;
    }
    &.down {
      grid-column: auto/span 4;
    }
    &[on-shift] {
      font-size: 1.461538461538461vw;
      justify-items: center;
    }
    &[on-shift]::before {
      content: attr(on-shift);
      align-items: end;
    }
  }
}
</style>