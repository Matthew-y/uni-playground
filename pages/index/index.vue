<template>
  <view class="container" @touchstart="onTouchStart" @touchmove="onTouchMove">
    <u-skeleton
	    rows="3"
	    title
      loading
    ></u-skeleton>
  </view>
</template>
<script>
import { useRouter } from 'uni-mini-router';
const router = useRouter()
export default {
  data() {
    return {
      rotationAngles: [0, 0, 0], // 存储每层的旋转角度
      startAngle: 0, // 触摸开始时的角度
      currentLayer: -1, // 当前触摸的层
      layerRadius: [150, 100, 50] // 每层的半径
    };
  },
  mounted() {
    setTimeout(() => {
      this.$i18n.locale = 'en' 
    }, 2000);
  },
  methods: {
    // 获取触摸点相对圆心的角度
    calculateAngle(touchX, touchY) {
      const centerX = 200;
      const centerY = 200;
      const deltaX = touchX - centerX;
      const deltaY = touchY - centerY;
      return Math.atan2(deltaY, deltaX); // 返回弧度
    },

    onTouchStart(e) {
      const touch = e.touches[0];
      this.startAngle = this.calculateAngle(touch.pageX, touch.pageY);

      // 计算触摸点到圆心的距离
      const distanceFromCenter = Math.sqrt(
        Math.pow(touch.pageX - 200, 2) + Math.pow(touch.pageY - 200, 2)
      );

      // 确定触摸的是哪一层
      let cumulativeRadius = 0;
      this.currentLayer = -1; // 重置当前层
      for (let i = 0; i < this.layerRadius.length; i++) {
        cumulativeRadius += this.layerRadius[i];
        if (distanceFromCenter <= cumulativeRadius) {
          this.currentLayer = i;
          break;
        }
      }
    },

    onTouchMove(e) {
      if (this.currentLayer === -1) return;

      const touch = e.touches[0];
      const moveAngle = this.calculateAngle(touch.pageX, touch.pageY);
      const angleDelta = moveAngle - this.startAngle;

      // 更新旋转角度
      this.rotationAngles[this.currentLayer] += angleDelta;
      this.startAngle = moveAngle; // 更新起始角度
    },
  },
};
</script>

<style scoped>
.container {
  width: 400px;
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  position: absolute;
  border-radius: 50%;
  border: 8px solid transparent;
  box-sizing: border-box;
}

.layer1 {
  width: 300px;
  height: 300px;
  border-color: #FFCDD2;
}

.layer2 {
  width: 200px;
  height: 200px;
  border-color: #E1BEE7;
}

.layer3 {
  width: 100px;
  height: 100px;
  border-color: #BBDEFB;
}
</style>



