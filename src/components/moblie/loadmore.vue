<template lang="html">
  <div class="loadmore">
  <slot name="navv"></slot>
  <div class="yo-scroll"
  :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
  @touchstart.preventDefault="touchStart($event)"
  @touchmove.preventDefault="touchMove($event)"
  @touchend.preventDefault="touchEnd($event)"
  @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
    <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <header class="pull-refresh">
        <slot name="pull-refresh">
           <!-- <span class="down-tip">下拉更新</span> -->
           <span class="up-tip">松开更新</span>
           <span class="refresh-tip">
           </span>
        </slot>
      </header>
      <slot></slot>
      <footer class="load-more">
        <slot name="load-more">
        <nav>  
         <svg  class="loading"
                  v-if="!loaded"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 50 50"
                  style="enable-background:new 0 0 50 50"
                  xml:space="preserve"
                >
          <path
                    fill="#0ce5b2"
              d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
              transform="rotate(275.098 25 25)"
            >
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
            </path>
          </svg></nav>
              <span v-if="loaded">完成</span>     
        </slot>
      </footer>
    </section>
  </div>
  </div>

</template>
 
<script>
export default {
  props: {
    offset: {
      type: Number,
      default: 30
    },
    enableInfinite: {
      type: Boolean,
      default: true
    },
    enableRefresh: {
      type: Boolean,
      default: true
    },
    loaded: {
      type: Boolean,
      default: false
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    }
  },
  data() {
    return {
      top: 0,
      state: 0,
      startY: 0,
      touching: false,
      infiniteLoading: false
    };
  },
  //  mounted() {
  //   window.addEventListener("scroll", alert(123));
  // },
  methods: {
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
      this.startScroll = this.$el.scrollTop || 0;
      this.touching = true;
    },
    touchMove(e) {
      //  console.log(this.state);
      if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
        return;
      }
      // console.log(e.targetTouches[0].pageY, this.startY);

      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
      // console.log(this.startScroll);

      if (diff > 0 && e.cancelable) e.preventDefault();
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0);

      if (this.state === 2) {
        // in refreshing
        return;
      }

      if (this.top >= this.offset) {
        this.state = 1;
      } else {
        this.state = 0;
      }
    },
    touchEnd(e) {
      // console.log(this.state);
      if (!this.enableRefresh) return;
      this.touching = false;
      if (this.state === 2) {
        // in refreshing
        this.state = 2;
        this.top = this.offset;

        return;
      }

      if (this.top >= this.offset) {
        // console.log(this.top);

        this.refresh();
      } else {
        // console.log(this.top);
        this.state = 0;
        this.top = 0;
      }
    },
    refresh() {
      this.state = 2;
      this.top = this.offset;
      this.onRefresh(this.refreshDone);
    },
    refreshDone() {
      //  console.log( this.top);
      this.state = 0;
      this.top = 0;
    },

    infinite() {
      this.infiniteLoading = true;
      this.onInfinite(this.infiniteDone);
    },

    infiniteDone() {
      this.infiniteLoading = false;
    },

    onScroll(e) {
      if (!this.enableInfinite || this.infiniteLoading) {
        return;
      }
      let outerHeight = this.$el.clientHeight;
      let innerHeight = this.$el.querySelector(".inner").clientHeight;
      let scrollTop = this.$el.scrollTop;
      let ptrHeight = this.onRefresh
        ? this.$el.querySelector(".pull-refresh").clientHeight
        : 0;
      let infiniteHeight = this.$el.querySelector(".load-more").clientHeight;
      let bottom = innerHeight - outerHeight - scrollTop - ptrHeight;
      // console.log(this.loaded);
      if (bottom < infiniteHeight) this.infinite();
    }
  }
};
</script>
<style lang='scss'>
.loadmore {
  overflow: auto;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.yo-scroll {
  // position: absolute;
  // top: vw(210);
  // right: 0;
  // bottom: 0;
  // left: 0;
  position: relative;
  font-size: vw(26);
  color: #4f3dad;
  font-weight: bold;
  z-index: 8;
  -webkit-overflow-scrolling: touch;
  // touch-action: none;

  .loading {
    width: vw(80);
    height: vw(80);
  }
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // touch-action: none;
}
.yo-scroll .inner {
  position: absolute;
  top: vw(-100);
  width: 100%;
  transition-duration: 300ms;
}

.yo-scroll .pull-refresh {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  // background: #000;
  height: vw(100);
  display: flex;
  align-items: center;
  justify-content: center;
}
.yo-scroll.touch .inner {
  transition-duration: 0ms;
}
.yo-scroll.down .down-tip {
  display: block;
}
.yo-scroll.up .up-tip {
  display: block;
}
.yo-scroll.refresh .refresh-tip {
  display: block;
}
.yo-scroll .down-tip,
.yo-scroll .refresh-tip,
.yo-scroll .up-tip {
  display: none;
}
.yo-scroll .load-more {
  height: vw(100);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>