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
