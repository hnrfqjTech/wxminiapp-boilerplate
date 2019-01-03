<template>
  <div class="page">
    <div :class="{'pickerMask':isShowMask}" @click="maskClick" catchtouchmove="true"></div>
    <button type="default" @click="showPickerView">多级联动选择</button>
    <div class="weui-picker" :class="{'weui_picker_view_show':pickerShow}">
      <div class="weui-picker__hd">
        <div href="javascript:;" class="weui-picker__action" @click="pickerCancel">取消</div>
        <div href="javascript:;" class="weui-picker__action" @click="pickerConfirm">确定</div>
      </div>
      <picker-view indicator-style="height: 40px;" :value="pickerValue" class="weui_picker_view" @change="pickerChange">
        <picker-view-column>
          <div class="picker-item" v-for="(item,index) in columuOne" :key="index">{{item}}</div>
        </picker-view-column>
        <picker-view-column>
          <div class="picker-item" v-for="(item,index) in columnTwo" :key="index">{{item}}</div>
        </picker-view-column>
      </picker-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerShow: false,
      isShowMask: false,
      pickerValue: [0, 1],
      mulLinkAgeArray: [
        {
          label: "飞机票",
          value: 0,
          children: [
            {
              label: "经济舱",
              value: 1
            },
            {
              label: "商务舱",
              value: 2
            }
          ]
        },
        {
          label: "火车票",
          value: 1,
          children: [
            {
              label: "卧铺",
              value: 1,
              disabled: true // 不可用
            },
            {
              label: "坐票",
              value: 2
            },
            {
              label: "站票",
              value: 3
            }
          ]
        },
        {
          label: "汽车票",
          value: 3,
          children: [
            {
              label: "快班",
              value: 1
            },
            {
              label: "普通",
              value: 2
            }
          ]
        }
      ],
      columuOne: [],
      columnTwo: []
    };
  },
  mounted() {
    this._initPicker();
  },
  methods: {
    pickerChange(e) {
      let _this = this;
      let value = e.mp.detail.value;
      // 如果是第一列滚动
      if (value[0] !== _this.pickerValue[0]) {
        let columnTwoNew = _this.mulLinkAgeArray[value[0]].children;
        _this.columnTwo = [];
        for (let i = 0; i < columnTwoNew.length; i++) {
          _this.columnTwo.push(columnTwoNew[i].label);
        }
        _this.pickerValue = value;
        _this.pickerValue[1] = 0;
      }
      // 如果第二列滚动
      if (value[1] !== this.pickerValue[1]) {
        _this.pickerValue[1] = e.mp.detail.value[1];
      }
    },
    pickerConfirm() {
      this.isShowMask = false;
      this.pickerShow = false;
    },
    pickerCancel() {
      this.isShowMask = false;
      this.pickerShow = false;
    },
    showPickerView() {
      this.isShowMask = true;
      this.pickerShow = true;
    },
    maskClick() {
      this.pickerCancel();
    },
    _initPicker() {
      let _this = this;
      let mulLinkAgeArray = this.mulLinkAgeArray;
      for (let i = 0; i < mulLinkAgeArray.length; i++) {
        _this.columuOne.push(mulLinkAgeArray[i].label);
      }
      // 渲染第二列
      let columnTwoArray = mulLinkAgeArray[_this.pickerValue[0]].children;
      for (let i = 0; i < columnTwoArray.length; i++) {
        _this.columnTwo.push(columnTwoArray[i].label);
      }
    }
  }
};
</script>

<style>
page {
  margin-top: 100px;
  position: relative;
}
.weui-picker {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}
.weui_picker_view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1);
}
.weui-picker__hd {
  display: flex;
  padding: 9px 15px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 17px;
}
.weui-picker__action {
  display: block;
  flex: 1;
  color: #1aad19;
  cursor: pointer;
}
.weui-picker__action:first-child {
  text-align: left;
  color: #888;
}
.weui-picker__action:last-child {
  text-align: right;
}
.weui-picker__hd:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.weui_picker_view_show {
  transform: translateY(0);
}
.picker-item {
  text-align: center;
  line-height: 40px;
}
.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
</style>
