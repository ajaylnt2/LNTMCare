export default function myService() {
  'ngInject';

  this.alarmList = '';

  function setAlarm(annualName) {
    this.alarmList = annualName;
  }
  function getAlarm() {
    return this.alarmList;
  }
  return {
    setAlarm,
    getAlarm,

  };
}
