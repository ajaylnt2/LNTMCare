export default function headerService() {
  'ngInject';
  this.name = '';
  function setHeaderName(navName) {
    this.name = navName;
  }
  function getHeaderName() {
    return this.name;
  }
  return {
    getHeaderName,
    setHeaderName
  };
}
