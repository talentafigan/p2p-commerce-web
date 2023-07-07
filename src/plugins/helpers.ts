import moment from "moment";
moment.locale('ID');
export default class Helpers {
  dateShortFormat(date: string) {
    return moment(date).format("YYYY-MM-DD");
  }
  fullDate(date: string) {
    return moment(date).format("dddd, D MMMM YYYY, HH:mm");
  }
  generateUUID = () => {
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  };
  async shortSetTimeOut(duration: any = 1000) {
    return new Promise(async (resolve, reject) => {
      setTimeout(() => {
        resolve("");
      }, duration);
    });
  }
  intialString(val: any) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
    let initials = [...val.matchAll(rgx)] || [];
    initials = (
      (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
    ).toUpperCase();
    return initials;
  }
  datePassed(date: string, pass: number, type: any) {
    var dateNow = moment(new Date());
    if (moment(date).diff(dateNow, type) > pass) return true;
    return false;
  }
  currencyFormat(val: number) {
    if (!val) return 0;
    let formatter = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      currencyDisplay: "code",
      minimumFractionDigits: 0,
      maximumFractionDigits: 20,
    })
      .format(val)
      .replace("JPY", "")
      .trim();
    return formatter;
  }
}
