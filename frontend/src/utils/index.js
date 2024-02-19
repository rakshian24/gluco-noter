export const getSvgWidth = (width) => {
  //Mobile screens
  if (width <= 500) {
    return "100%";
  }
  //Tablet screens
  else if (width >= 501 && width <= 1023) {
    return "600px";
  }
  //Laptops and above screens
  else {
    return "900px";
  }
};

export const textInputRegex =
  /^(?!\s+$)[~!\s@#$%^&*()_+=[\]{}|;':",./<>?a-zA-Z0-9-]+$/;

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValueValid = (value) =>
  value !== null && value !== undefined && value !== "" && value !== 0;

export const showConsumedFoodsTagBox = (selectedValue) => {
  return ["AB", "AL", "AD"].includes(selectedValue);
};

export const mealTypeKeyVsMealTypeDescrMap = {
  AB: "breakfast",
  AL: "lunch",
  AD: "dinner",
};

export const isRunningStandalone = () => {
  return window.matchMedia("(display-mode: standalone)").matches;
};

export const isAppRunningOnIos16 = () => {
  return window.navigator.userAgent.match("iPhone OS 16")?.length > 0;
};

export const isStandAloneAndRunningOnIos16 = () =>
  isRunningStandalone() && isAppRunningOnIos16();

export const isWebAppRunningOnIphone = navigator.platform === "iPhone";

export const getInitials = (str) => {
  if (!str) return "RS";

  const initials = str
    .split(" ")
    .map(
      (name, index, arr) => (index === 0 || index === arr.length - 1) && name[0]
    )
    .filter((initial) => initial)
    .join("");

  return initials || "RS";
};
