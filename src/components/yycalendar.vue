<template>
    <div>
      <div class='yycalendar_super_view' v-if="show">
          <div class='yycalendar_bg_view'></div>
          <div class='yycalendar_content_view'>
            <div class='yycalendar_top1_view'>
              <i class='yycalendar_top_title_text'>选择预约时间</i>
            </div>
            <div class='yycalendar_top2_view'>
              <div class="yycalendar_changebtn_view" v-if="timeRangeInfo.newtimeStamp <= timeRangeInfo.timeStamp" >前一天</div>
              <div class="yycalendar_changebtn_view_s" @click="_lastDay" v-else>前一天</div>
              <div class='yycalendar_top2_center_view' @click="selectDate">
                <div class='yycalendar_top2_center_title'>{{timeRangeInfo.month}}.{{timeRangeInfo.day}}</div>
                <div class='yycalendar_top2_center_subtitle'>{{timeRangeInfo.week}}</div>
              </div>
              <div class='yycalendar_changebtn_view_s' @click='_nextDay'>后一天</div>
            </div>
            <div class='yycalendar_time_view'>
              <scroll-view scroll-y="true" :scroll-into-view="toView" >
                <div class='scroll_super_view'>
                  <block v-for="(item,index) in timeRangeInfo.list" :key='index'>
                    <div :id="'s' + index" :class="item.isDisabled ? 'time_item_view_disabled' : (item.checked ? 'time_item_view_checked' : 'time_item_view')" v-if="item.isDisabled">{{item.timeStr}}</div>
                    <div :id="'s' + index" :class="item.isDisabled ? 'time_item_view_disabled' : (item.checked ? 'time_item_view_checked' : 'time_item_view')" @click="_checkedClick" :data-idx='index' v-else>{{item.timeStr}}</div>
                  </block>
                </div>
              </scroll-view>
            </div>
            <div class='yycalendar_bottombtn_view' @click='_bottomBtnClick'>确定</div>
          </div>
      </div>
        <div v-if="showDate" class="showDate">
          <Calendar
            :months="months"
            :value="value"
            @next="next"
            @prev="prev"
            lunar
            clean
            @select="select"
            ref="calendar"
            @selectMonth="selectMonth"
            @selectYear="selectYear"
          />
        </div>
    </div>
</template>

<script>
import Calendar from "@/components/mpvue_calendar";

export default {
  components: {
    Calendar
  },
  props: {
    beginTime: {
      type: String,
      value: "09:00"
    },
    endTime: {
      type: String,
      value: "21:00"
    },
    timeGap: {
      type: Number,
      value: 25
    },
    resetGap: {
      type: Number,
      value: 60
    },
    show: {
      type: Boolean,
      value: false
    },
    expertId: {
      type: String,
      value: 0
    }
  },
  data() {
    return {
      timeRangeInfo: [],
      days: 0,
      showDate: false,
      show: false,
      months: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      newDate1: new Date(),
      disabledArray: ["2018-6-27", "2018-6-25"],
      value: [2019, 10, 12],
      begin: [2016, 1, 1],
      end: [2020, 1, 1],
      orderTimes: [],
      toView: "",
      visibleTime: ""
    };
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    this.attached();
    this.value = [
      this.newDate1.getFullYear(),
      this.newDate1.getMonth() + 1,
      this.newDate1.getDate()
    ];
    if (this.visibleTime == "") {
      this._nextDay();
    } else {
      this.getValidTime();
    }
  },
  methods: {
    getTimeRange: function(beginTime, endTime, timeGap, days) {
      let show_day = new Array(
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六"
      );
      var date = new Date();
      date.setHours(date.getHours() + 2);
      var newDate = new Date();
      if (days == undefined || days == "") {
        newDate = date;
      } else {
        newDate.setDate(date.getDate() + days);
      }

      const year = newDate.getFullYear();
      const month = this.formatNumber(newDate.getMonth() + 1);
      const day = this.formatNumber(newDate.getDate());
      const week = show_day[newDate.getDay()];

      var date1 = new Date(year + "/" + month + "/" + day + " " + beginTime);
      var date2 = new Date(year + "/" + month + "/" + day + " " + endTime);
      //var date3 = new Date(year + "/" + month + "/" + day + " " + beginTime);
      var s = date.getTime(),
        news = newDate.getTime(),
        s1 = date1.getTime(),
        s2 = date2.getTime();
      var total = (s2 - s1) / 1000;
      var min = parseInt(total / 60); //计算整数分

      var timeGap = timeGap;
      //var amount = min / (Number(timeGap)+ Number(this.resetGap));
      var amount = min / 60;
      var timeRange = new Array();
      var timeStr =
        this.formatNumber(date1.getHours()) +
        ":" +
        this.formatNumber(date1.getMinutes());

      var date3 = new Date(s1 + 1000 * 60 * this.timeGap);

      var timeStr1 =
        this.formatNumber(date3.getHours()) +
        ":" +
        this.formatNumber(date3.getMinutes());
      var timeInfo = new Object();
      var isDisabled = false;
      if (s1 < s) {
        isDisabled = true;
      }

      timeInfo["timeStamp"] = s1;
      timeInfo["timeStr1"] = timeStr1;
      timeInfo["timeStr"] = timeStr;
      timeInfo["isDisabled"] = isDisabled;
      timeRange.push(timeInfo);

      for (var i = 0; i < amount; i++) {
        var timeInfo = new Object();
        //date1.setMinutes(date1.getMinutes() + timeGap + Number(this.resetGap), date1.getSeconds(), 0);
        date1.setMinutes(date1.getMinutes() + 60, date1.getSeconds(), 0);
        var timeStamp = date1.getTime();
        if (timeStamp > s2) {
          date1 = date2;
          timeStamp = s2;
        }
        var isDisabled = false;

        if (timeStamp < s) {
          isDisabled = true;
        } else {
          if (this.visibleTime == "") {
            this.visibleTime = i;
          }
        }
        var timeStr =
          this.formatNumber(date1.getHours()) +
          ":" +
          this.formatNumber(date1.getMinutes());

        var date3 = new Date(timeStamp + 1000 * 60 * this.timeGap);

        var timeStr1 =
          this.formatNumber(date3.getHours()) +
          ":" +
          this.formatNumber(date3.getMinutes());
        timeInfo["timeStamp"] = timeStamp;
        timeInfo["timeStr1"] = timeStr1;
        timeInfo["timeStr"] = timeStr;
        timeInfo["isDisabled"] = isDisabled;
        timeRange.push(timeInfo);
      }
      if (this.visibleTime != "") {
        this.toView = "s" + this.visibleTime;
      }

      var obj = new Object();
      obj["year"] = year;
      obj["month"] = month;
      obj["day"] = day;
      obj["week"] = week;
      obj["list"] = timeRange;
      obj["timeStamp"] = s;
      obj["newtimeStamp"] = news;
      return obj;
    },
    formatNumber: function(n) {
      return n < 10 ? "0" + n : n;
    },
    _nextDay: function() {
      var days = this.days;
      days += 1;
      var timeRangeInfo = this.getTimeRange(
        this.beginTime,
        this.endTime,
        this.timeGap,
        days
      );
      this.timeRangeInfo = timeRangeInfo;
      this.days = days;
      this.getValidTime();
    },
    _lastDay: function() {
      var days = this.days;
      days -= 1;
      var timeRangeInfo = this.getTimeRange(
        this.beginTime,
        this.endTime,
        this.timeGap,
        days
      );
      this.timeRangeInfo = timeRangeInfo;
      this.days = days;
      this.getValidTime();
    },
    _checkedClick: function(e) {
      var idx = e.currentTarget.dataset.idx;
      var timeRangeInfo = this.timeRangeInfo;
      var list = timeRangeInfo.list;
      var timeStr = list[idx].timeStr;
      var timeStr1 = list[idx].timeStr1;
      for (var i = 0; i < list.length; i++) {
        var info = list[i];
        if (i == idx) {
          info.checked = true;
        } else {
          info.checked = false;
        }
      }
      this.timeRangeInfo = timeRangeInfo;
      var newDate = new Date(timeRangeInfo.newtimeStamp);
      const year = newDate.getFullYear();
      const month = this.formatNumber(newDate.getMonth() + 1);
      const day = this.formatNumber(newDate.getDate());
      var dateStr = year + "/" + month + "/" + day + " " + timeStr;
      var dateStr1 = year + "/" + month + "/" + day + " " + timeStr1;
      var myEventDetail = { beginTime: dateStr, endTime: dateStr1 }; // detail对象，提供给事件监听函数
      this.$emit("yybindchange", myEventDetail);
    },
    initData() {
      var timeRangeInfo = this.timeRangeInfo;
      var list = timeRangeInfo.list;
      for (var i = 0; i < list.length; i++) {
        var info = list[i];
        var o = list[i].timeStr + "-" + list[i].timeStr1;
        if (this.orderTimes.indexOf(o) > -1) {
          list[i]["isDisabled"] = true;
        }
      }
    },
    _bottomBtnClick: function() {
      var timeRangeInfo = this.timeRangeInfo;
      var list = timeRangeInfo.list;
      var timeStr = "";
      var timeStr1 = "";
      for (var i = 0; i < list.length; i++) {
        var info = list[i];
        if (info.checked) {
          timeStr = info.timeStr;
          timeStr1 = info.timeStr1;
          break;
        }
      }
      this.show = false;
      var newDate = new Date(timeRangeInfo.newtimeStamp);
      const year = newDate.getFullYear();
      const month = this.formatNumber(newDate.getMonth() + 1);
      const day = this.formatNumber(newDate.getDate());
      var dateStr = year + "/" + month + "/" + day + " " + timeStr;
      var dateStr1 = year + "/" + month + "/" + day + " " + timeStr1;
      this.$emit("hiddenCalendar", this.show);
    },
    delClick: function() {
      this.show = false;
    },
    attached: function() {
      var timeRangeInfo = this.getTimeRange(
        this.beginTime,
        this.endTime,
        this.timeGap
      );
      this.timeRangeInfo = timeRangeInfo;
    },
    selectDate() {
      this.showDate = true;
    },
    selectMonth(month, year) {},
    prev(month) {},
    next(month) {},
    selectYear(year) {},
    dateInfo() {
      const info = this.$refs.calendar.dateInfo(2018, 8, 23);
    },
    select(val, val2) {
      var tmpDate = new Date(val[0] + "/" + val[1] + "/" + val[2]);
      var tmpDate1 = new Date();
      const a = tmpDate - tmpDate1;
      var iDays = -1;
      iDays = Math.ceil(a / 1000 / 60 / 60 / 24);
      var days = iDays;
      var timeRangeInfo = this.getTimeRange(
        this.beginTime,
        this.endTime,
        this.timeGap,
        days
      );
      this.timeRangeInfo = timeRangeInfo;
      this.days = days;
      this.showDate = false;
      this.getValidTime();
    },
    getValidTime() {
      const url = "/api/orders/date";
      const orderDate =
        this.timeRangeInfo.year +
        "-" +
        this.timeRangeInfo.month +
        "-" +
        this.timeRangeInfo.day;
      const data = {
        expertId: this.expertId,
        orderDate: orderDate
      };
      this.$http
        .get(url, data)
        .then(res => {
          //输出请求数据
          if (res.data.data) {
            this.orderTimes = res.data.data.orderTimes;
            this.initData();
          }
        })
        .catch(err => {
          console.error(err.status, err.message);
        });
    }
  }
};
</script>

<style scoped>
.showDate {
  position: fixed;
  bottom: -10rpx;
  width: 100%;
  left: 0;
}
.yycalendar_super_view {
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.yycalendar_bg_view {
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0rpx;
  left: 0rpx;
}
.yycalendar_content_view {
  position: fixed;
  bottom: 0rpx;
  left: 0rpx;
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.yycalendar_top1_view {
  width: 100%;
  height: 60rpx;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}
.yycalendar_top_title_text {
  font-family: PingFangSC-Regular;
  font-size: 26rpx;
  color: #25272a;
  text-align: center;
}
.yycalendar_top_del_img {
  width: 32rpx;
  height: 32rpx;
  position: absolute;
  right: 40rpx;
}
.yycalendar_top2_view {
  width: 100%;
  height: 108rpx;
  background: white;
  padding: 0rpx 80rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.yycalendar_changebtn_view {
  background: #e7e7e7;
  border-radius: 100rpx;
  width: 148rpx;
  height: 56rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
  font-family: PingFangSC-Semibold;
  font-size: 24rpx;
  color: #2c2b28;
  text-align: center;
}
.yycalendar_changebtn_view_s {
  background: #24D1A3;
  border-radius: 100rpx;
  width: 148rpx;
  height: 56rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Semibold;
  font-size: 24rpx;
  color: #fff;
  text-align: center;
}
.yycalendar_top2_center_view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.yycalendar_top2_center_title {
  font-family: Helvetica-Bold;
  font-size: 36rpx;
  color: #2c2b28;
  text-align: center;
}
.yycalendar_top2_center_subtitle {
  font-family: PingFangSC-Regular;
  font-size: 22rpx;
  color: #9b9b9b;
  text-align: center;
}
.yycalendar_bottombtn_view {
  background: #24D1A3;
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 32rpx;
  color: #fff;
  text-align: center;
}
.yycalendar_time_view {
  width: 100%;
  height: 492rpx;
  background: #f0f2f5;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.scroll-view {
  width: 100%;
  height: 100%;
}
.scroll_super_view {
  width: 100%;
  padding: 30rpx 0rpx 10rpx 22rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.time_item_view {
  background: #ffffff;
  border-radius: 4rpx;
  width: 160rpx;
  height: 68rpx;
  margin-right: 22rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  color: #2c2b28;
  text-align: center;
}
.time_item_view_checked {
  background: #ffffff;
  border-radius: 4rpx;
  border: 2rpx solid #24D1A3;
  width: 156rpx;
  height: 64rpx;
  margin-right: 22rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  color: #2c2b28;
  text-align: center;
}
.time_item_view_disabled {
  background: #e7e7e7;
  border-radius: 4rpx;
  width: 160rpx;
  height: 68rpx;
  margin-right: 22rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
  font-size: 24rpx;
  color: #2c2b28;
  text-align: center;
}
</style>

