// 引入 moment 时间插件
import moment from 'moment'
// 获取今日/昨日/本周/上周/本月/上月 时间
export default {
  // 获取今日的开始结束时间
  getToday() {
    const obj = {
      starttime: '',
      endtime: ''
    }
    obj.starttime = moment(moment().startOf('day').valueOf()).format('YYYY-MM-DD HH:mm:ss')
    obj.endtime = moment(moment().valueOf()).format('YYYY-MM-DD HH:mm:ss')
    return obj
  },
  // 获取昨日的开始结束时间
  getYesterday() {
    const obj = {
      starttime: '',
      endtime: ''
    }
    obj.starttime = moment(moment().add(-1, 'days').startOf('day').valueOf()).format('YYYY-MM-DD HH:mm:ss')
    obj.endtime = moment(moment().add(-1, 'days').endOf('day').valueOf()).format('YYYY-MM-DD HH:mm:ss')
    return obj
  },
  // 获取当前周的开始结束时间
  getCurrWeekDays() {
    const obj = {
      starttime: '',
      endtime: ''
    }
    obj.starttime = moment(moment().week(moment().week()).startOf('week').add(1, 'days').valueOf()).format('YYYY-MM-DD HH:mm:ss')
    obj.endtime = moment(moment().week(moment().week()).endOf('week').add(1, 'days').valueOf()).format('YYYY-MM-DD HH:mm:ss')
    return obj
  },
  // 获取上一周的开始结束时间
  getLastWeekDays() {
    const obj = {
      starttime: '',
      endtime: ''
    }
    obj.starttime = moment(moment().week(moment().week() - 1).startOf('week').add(1, 'days').valueOf()).format('YYYY-MM-DD HH:mm:ss')
    obj.endtime = moment(moment().week(moment().week() - 1).endOf('week').add(1, 'days').valueOf()).format('YYYY-MM-DD HH:mm:ss')
    return obj
  },
  // 获取当前月的开始结束时间
  getCurrMonthDays() {
    const obj = {
      starttime: '',
      endtime: ''
    }
    obj.starttime = moment(moment().month(moment().month()).startOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss')
    obj.endtime = moment(moment().month(moment().month()).endOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss')
    return obj
  },
  // 获取上一个月的开始结束时间
  getLastMonthDays() {
    const obj = {
      starttime: '',
      endtime: ''
    }
    obj.starttime = moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss')
    obj.endtime = moment(moment().month(moment().month() - 1).endOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss')
    return obj
  },
  // 获取当前年开始和结束时间
  getCurrentYearDays() {
    const obj = {
      starttime: '',
      endtime: ''
    }
    obj.starttime = moment().startOf('year').format('YYYY-MM-DD HH:mm:ss')
    obj.endtime = moment().endOf('year').format('YYYY-MM-DD HH:mm:ss')
    return obj
  }

}
