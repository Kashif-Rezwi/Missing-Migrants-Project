// this function covert coordinates string into a array of 2 values lattitude and longitude
export const coordinates = (value) => {
  value = value.split("");
  let bag = "";
  let flag = false;

  for (let i = 0; i <= value.length - 1; i++) {
    if (flag) {
      if (value[i] === ")") {
        break;
      }
      bag += value[i];
    }
    if (value[i] === "(") flag = true;
  }
  bag = bag.split(" ").map(Number);

  return bag;
};
