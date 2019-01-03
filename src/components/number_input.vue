<template>
  <div class="number-input-wrap">
    <div class="left" @click="lessNumber">-</div>
    <div class="center">
      <input ref='input' v-if="type=='digit'" :value="value" type="digit"  @change="inputChange" style="display:inline;width:20rpx" />
      <input v-if="type=='number'" type="number" :value="value" @change="inputChange" style="display:inline;width:20rpx"  />
    </div>
    <div class="right" @click="addNumber">+</div>
  </div>
</template>

<script>
  export default {
    props: {
      changeNumber: {
        type: Number,
        value: 100
      },
      type: {
        type: String,
        value: 'digit'
      },
      max: {
        type: Number,
        value: 0,
      },
      min: {
        type: Number,
        value: 0,
      },
      value: {
        type: String,
        value: '0.00',
      },
      precision: {
        type: Number,
        value: 2,
      },
      value:{
        type:String,
        value:0.00,
      }
    },
    model:{
      prop: 'value',
      event: 'input',
    },
    data() {
      return {
        number: 0.00,
      }
    },
    watch: {
      value (val) {
        // this.value = Number(val);
        // const value = Number(val);
        this.$emit('input', val);
      },
      type (val) {
        if (val==='digit') {
          this.value = '0.00'
        }
      }

    },
    methods: {
      lessNumber() {
          this.value = Number(Number(this.value).toFixed(this.precision))
        if (this.value < this.min) {
            this.value = this.min
            this.$emit('error-number',this.value)
        } else {
          this.value -= this.changeNumber;
          this.value = Number(Number(this.value).toFixed(this.precision))
          if (this.value < this.min) {
            this.value = this.min
            this.$emit('error-number',this.value)
          }
        }
        if (this.type === 'digit') {
          if (String(this.value).indexOf('.') == -1) {
             this.value = String(this.value) + '.00'
          } else{
            const arr = String(this.value).split('.');
            if (arr[1].length===1) {
                this.value = String(this.value) + '0'
            }
          }
        }
         this.$emit('input',this.value)
      },
      addNumber() {
        this.value = Number(Number(this.value).toFixed(this.precision))
        if (this.value <= this.max) {
          this.value += this.changeNumber;
          // this.value = Number(Number(this.value).toFixed(this.precision))
          if (this.value > this.max) {
            this.value = this.max;
            this.$emit('error-number',this.value)
          }
        } else {
          this.value = this.max
          this.$emit('error-number',this.value)
        }
        if (this.type === 'digit') {
          if (String(this.value).indexOf('.') == -1) {
             this.value = String(this.value) + '.00'
          } else{
            const arr = String(this.value).split('.');
            if (arr[1].length===1) {
                this.value = String(this.value) + '0'
            }
          }
        }
        this.$emit('input',this.value)
      },
      inputChange(e) {
        let val = Number(Number(e.target.value).toFixed(2))
        if (val > this.max) {
          this.value = this.max;
          this.$emit('error-number',this.value)
        }
        else if (val < this.min) {
          this.value = this.min
          this.$emit('error-number',this.value)
        }
        else {
          this.value = val
        }
        if (this.type === 'digit') {
          if (String(this.value).indexOf('.') == -1) {
             this.value = String(this.value) + '.00'
          } else{
            const arr = String(this.value).split('.');
            if (arr[1].length===1) {
                this.value = String(this.value) + '0'
            }
          }
        }
        this.$emit('input',this.value)
      },
      updateVal(val) {
        const value = Number(val)
      }
    }
  };

</script>

<style lang="scss" scoped>
  .number-input-wrap {
    width: 270rpx;
    height: 92rpx;
    line-height: 92rpx;

    .left {
      float: left;
      width:45rpx;
      text-align: center;
    }

    .center {
      width: 180rpx;
      float: left;
      top: 46rpx;
      line-height: 92rpx;
      height: 92rpx;

      input {
        height: 100%;
        text-align: center;
      }
    }

    .right {
      float: right;
      width:45rpx;
      text-align: center;
    }
  }

</style>
