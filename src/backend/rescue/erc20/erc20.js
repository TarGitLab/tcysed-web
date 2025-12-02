function initErc20RescueStorage() {
  try {
    if (!localStorage.getItem("erc20Rescue")) {
      const data = {};
      localStorage.setItem("erc20Rescue", JSON.stringify(data));
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
}

function getErc20Rescue() {
  return JSON.parse(localStorage.getItem("erc20Rescue")) || {};
}

function setErc20RescueValue(key, value) {
  const data = getErc20Rescue();
  data[key] = value;
  localStorage.setItem("erc20Rescue", JSON.stringify(data));
}

function deleteErc20RescueValue(key) {
  const data = getErc20Rescue();
  delete data[key];
  localStorage.setItem("erc20Rescue", JSON.stringify(data));
}

function clearErcRescue() {
  localStorage.setItem("erc20Rescue", JSON.stringify({}));
}

function getErc20RescueValue(key) {
  const data = JSON.parse(localStorage.getItem("erc20Rescue")) || {};
  return data[key];
}

function pushErc20RescueArray(key, value) {
  const data = getErc20Rescue();

  // Ensure the key holds an array
  if (!Array.isArray(data[key])) {
    data[key] = [];
  }

  // Prevent duplicate value
  if (!data[key].includes(value)) {
    data[key].push(value);
  }

  // Save updated data
  localStorage.setItem("erc20Rescue", JSON.stringify(data));
}



initErc20RescueStorage();

export {
  initErc20RescueStorage,
  getErc20Rescue,
  setErc20RescueValue,
  deleteErc20RescueValue,
  clearErcRescue,
  getErc20RescueValue,
  pushErc20RescueArray,
};
