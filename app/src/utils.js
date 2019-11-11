export const saveData = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a)
  a.style = "display: none"
  return function (blob, fileName) {
      const url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = fileName
      a.click()
      window.URL.revokeObjectURL(url)
  };
})()
