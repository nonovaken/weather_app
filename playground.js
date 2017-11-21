const stamps = [1510732800, 1510932800];

stamps.forEach((val) => {
    let time = new Date(val * 1000);
    console.log(time.getFullYear() + ', ' + time.getUTCMonth() + ', ' + time.getUTCDate());
});