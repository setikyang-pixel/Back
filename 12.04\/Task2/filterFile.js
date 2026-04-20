let address = require("node:path");
exports.filter = function(arr,ext) {
  for (let i = 0; i < arr.length; i++) {
    if (address.extname(arr[i]) == ext[2]) {
        console.log(address.resolve(__dirname,arr[i]));
    }
  }
}
