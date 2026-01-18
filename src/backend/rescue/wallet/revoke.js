function initrevokeWalletRescueStorage() {
  try {
    if (!localStorage.getItem("revokeWalletRescue")) {
      const data = {};
      localStorage.setItem("revokeWalletRescue", JSON.stringify(data));
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
}

function getrevokeWalletRescue() {
  return JSON.parse(localStorage.getItem("revokeWalletRescue")) || {};
}

function setrevokeWalletRescueValue(key, value) {
  const data = getrevokeWalletRescue();
  data[key] = value;
  localStorage.setItem("revokeWalletRescue", JSON.stringify(data));
}

function deleterevokeWalletRescueValue(key) {
  const data = getrevokeWalletRescue();
  delete data[key];
  localStorage.setItem("revokeWalletRescue", JSON.stringify(data));
}

function clearrevokeWalletRescue() {
  localStorage.setItem("revokeWalletRescue", JSON.stringify({}));
}

function getrevokeWalletRescueValue(key) {
  const data = JSON.parse(localStorage.getItem("revokeWalletRescue")) || {};
  return data[key];
}

function pushrevokeWalletRescueArray(key, value) {
  const data = getrevokeWalletRescue();

  // Ensure the key holds an array
  if (!Array.isArray(data[key])) {
    data[key] = [];
  }

  // Prevent duplicate value
  if (!data[key].includes(value)) {
    data[key].push(value);
  }

  // Save updated data
  localStorage.setItem("revokeWalletRescue", JSON.stringify(data));
}

initrevokeWalletRescueStorage();

export {
  initrevokeWalletRescueStorage,
  getrevokeWalletRescue,
  setrevokeWalletRescueValue,
  deleterevokeWalletRescueValue,
  clearrevokeWalletRescue,
  getrevokeWalletRescueValue,
  pushrevokeWalletRescueArray,
};
