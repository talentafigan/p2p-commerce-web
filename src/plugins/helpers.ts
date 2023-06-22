export default class Helpers {
  async shortSetTimeOut(duration: any = 1000) {
    return new Promise(async (resolve, reject) => {
      setTimeout(() => {
        resolve("");
      }, duration);
    });
  }
}
