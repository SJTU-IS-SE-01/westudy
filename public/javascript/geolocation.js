class Geolocation {
  constructor() {
    this.latitude = 0;
    this.longitude = 0;
  }

  async tryToGet() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((data) => {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
        resolve(true);
      }, (error) => {
        console.log(error);
        resolve(false);
      });
    });
  }

  inLibrary() {
    console.log(this);
    const dlat = 31.032331 - this.latitude;
    const dlon = 121.444041 - this.longitude;
    const d = dlat * dlat + dlon * dlon;
    return d < 0.00015;
  }
}
window.Geolocation = Geolocation;
