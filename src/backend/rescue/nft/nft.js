function initNftRescueStorage() {
  try {
    if (!localStorage.getItem("nftRescue")) {
      const data = {};
      localStorage.setItem("nftRescue", JSON.stringify(data));
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
}

function getNftRescue() {
  return JSON.parse(localStorage.getItem("nftRescue")) || {};
}

function setNftRescueValue(key, value) {
  const data = getNftRescue();
  data[key] = value;
  localStorage.setItem("nftRescue", JSON.stringify(data));
}

function deleteNftRescueValue(key) {
  const data = getNftRescue();
  delete data[key];
  localStorage.setItem("nftRescue", JSON.stringify(data));
}

function clearNftRescue() {
  localStorage.setItem("nftRescue", JSON.stringify({}));
}

function getNftRescueValue(key) {
  const data = JSON.parse(localStorage.getItem("nftRescue")) || {};
  return data[key];
}

function pushNftRescueArray(key, value) {
  const data = getNftRescue();

  // Ensure the key holds an array
  if (!Array.isArray(data[key])) {
    data[key] = [];
  }

  // Prevent duplicate value
  if (!data[key].includes(value)) {
    data[key].push(value);
  }

  // Save updated data
  localStorage.setItem("nftRescue", JSON.stringify(data));
}



initNftRescueStorage();

export {
  initNftRescueStorage,
  getNftRescue,
  setNftRescueValue,
  deleteNftRescueValue,
  clearNftRescue,
  getNftRescueValue,
  pushNftRescueArray,
};
