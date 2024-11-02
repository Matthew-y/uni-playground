<template>
  <view class="container" @touchstart="contouch($event)">
    <canvas class="canvas-layer" canvas-id="outer"
      style="width: 400px;height: 400px;"
    ></canvas>
    <canvas class="canvas-layer" canvas-id="inner"
      style="width: 200px;height: 200px;left: 100px;top: 100px;"
    ></canvas>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rotationInner: 0,
      rotationMiddle: 0,
      rotationOuter: 0,
      startAngle: 0,
      currentRotation: 0,
      layerRotation: {
        inner: 0,
        middle: 0,
        outer: 0,
      },
      innerLayerData: ["内层项1", "内层项2", "内层项3"],
      middleLayerData: ["中层项1", "中层项2", "中层项3", "中层项4"],
      outerLayerData: ["外层项1", "外层项2", "外层项3", "外层项4", "外层项5"],
    };
  },
  mounted() {
    this.drawCanvas("inner", this.innerLayerData, 100);
    this.drawCanvas("outer", this.outerLayerData, 200);
  },
  methods: {
    drawCanvas(canvasId, data, radius) {
      const ctx = uni.createCanvasContext(canvasId, this);

      // ctx.beginPath();
      // ctx.moveTo(10, 10);
      // ctx.lineTo(100, 100);
      // ctx.lineTo(100, 0);
      // ctx.closePath();
      ctx.beginPath()
      ctx.arc(radius, radius, radius, 0, 2 * Math.PI)
      ctx.closePath()
      // ctx.fill()
      ctx.stroke()

      ctx.draw();
    },
    contouch(event) {
      const {clientX, clientY} = event.touches[0]
      let width = Math.abs(clientX - 200)
      let height = Math.abs(clientY - 200)
      const distance = Math.sqrt(width * width + height * height)
      if(distance > 200) return
      distance > 100 ? console.log('outer') : console.log('inner')

    },

    onTouchStart(layer, event) {
      const touch = event.touches[0];
      this.startAngle = this.calculateAngle(touch.clientX, touch.clientY);
      this.currentRotation = this.layerRotation[layer];
    },
    onTouchMove(layer, event) {
      const touch = event.touches[0];
      const moveAngle = this.calculateAngle(touch.clientX, touch.clientY);
      const angleDifference = moveAngle - this.startAngle;

      this.layerRotation[layer] = this.currentRotation + angleDifference;
      this.updateRotation(layer, this.layerRotation[layer]);
      this.redrawLayers();
    },
    onTouchEnd(layer) {
      this.currentRotation = this.layerRotation[layer];
    },
    updateRotation(layer, angle) {
      if (layer === 'inner') this.rotationInner = angle;
      if (layer === 'middle') this.rotationMiddle = angle;
      if (layer === 'outer') this.rotationOuter = angle;
    },
    calculateAngle(x, y) {
      const rect = this.$el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rad = Math.atan2(y - centerY, x - centerX);
      return (rad * 180) / Math.PI;
    },
    redrawLayers() {
      this.drawCanvas('canvas-inner', this.innerLayerData, 100, this.rotationInner);
      this.drawCanvas('canvas-middle', this.middleLayerData, 150, this.rotationMiddle);
      this.drawCanvas('canvas-outer', this.outerLayerData, 200, this.rotationOuter);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  // justify-content: center;
  // align-items: center;
  height: 100vh;
  position: relative;
}
.canvas-layer {
  position: absolute;
  width: 400px;
  height: 400px;
  // background-color: beige;
}
</style>
