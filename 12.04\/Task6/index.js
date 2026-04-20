exports.ad = (file) => {
  let arr = file.split("");
  let arr2 = [];
  let obj = {}
  while (arr.indexOf("\n") != -1 || arr.length) {
    let size = arr.indexOf("\n");
    let n = size != -1 ? size : arr.length;
    let str1 = "";
    for (let i = 0; i < n; i++) {
      if (arr[i] != "=") {
        str1 += arr[i];
      } else {
        arr2.push(str1);
        str1 = "";
      }
    }
    arr2.push(str1);
    arr = arr.slice(n + 1);
  }
  if (arr2.length % 2 != 0) {
    throw error;
  } else {
    for (let i = 0; i < arr2.length; i += 2) {
      obj[arr2[i]] = arr2[i + 1];
    }
  }
  return obj;
};