export function CapitalizeService() {
  this.capitalize = function (string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
