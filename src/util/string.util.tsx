function randomString(length: number): string {
  let res = "";
  for (let i = 0; i < length; i++) {
    let x = Math.floor(Math.random() * (10 + 26 + 26));
    if (x < 10) {
      // add number 0-9
      res += x;
    } else if (x < 10 + 26) {
      // add upper case letter A-Z
      res += String.fromCharCode(x + 55);
    } else {
      // add lower case letter a-z
      res += String.fromCharCode(x - 26 + 87);
    }
  }
  return res;
}

export { randomString };
