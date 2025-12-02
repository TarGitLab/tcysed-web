import { ethers } from "../../../libary/ethers@6.5.0.js";

// ---- Initialize Wallet Storage ----
function initWalletStorage() {
  try {
    if (!localStorage.getItem("wallets")) {
      const wallets = {
        safe: [],
        compromised: [],
        sponsor: [],
        selectedRescueWallets: {
          safe: null,
          compromised: null,
          sponsor: null,
        },
      };
      localStorage.setItem("wallets", JSON.stringify(wallets));
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
}

// Run on page load
initWalletStorage();

// ---- Get Wallets Safely ----
function getWallets() {
  try {
    const data = localStorage.getItem("wallets");
    if (!data) throw new Error("No wallet data found");

    return JSON.parse(data);
  } catch (error) {
    return { safe: [], compromised: [], sponsor: [] , selectedRescueWallets: { safe: null, compromised: null, sponsor: null }}; 
  }
}

// ---- Save Wallets Safely ----
function saveWallets(wallets) {
  try {
    localStorage.setItem("wallets", JSON.stringify(wallets));
  } catch (error) {
    console.error("Failed to save data to localStorage:", error);
  }
}

function validateWallets(walletData) {
  try {
    walletData.address = walletData.address;
    walletData.privateKey = walletData.privateKey;

    if (!walletData.address && !walletData.privateKey) {
      throw new Error("Address and Private Key are required");
    }

    if (!walletData.privateKey) {
      if (!ethers.isAddress(walletData.address.trim())) {
        throw new Error("Invalid wallet address");
      } else {
        walletData.address = walletData.address.trim();
        return { status: true, walletData };
      }
    } else {
      let wallet;
      try {
        walletData.privateKey = walletData.privateKey.trim();
        wallet = new ethers.Wallet(walletData.privateKey);
        walletData.address = wallet.address;
        return { status: true, walletData };
      } catch (error) {
        throw new Error("Invalid private key");
      }
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
}

// ---- Add Wallet ----
function addWallet(type, walletData) {
  try {
    let isWalletValid = validateWallets(walletData);
    if (!isWalletValid.status) {
      throw new Error(isWalletValid.message);
    }

    walletData = isWalletValid.walletData;

    const wallets = getWallets();

    if (!wallets[type]) throw new Error(`Invalid wallet type: ${type}`);
    if (!walletData.id) throw new Error("Wallet must have an ID");

    // Check duplicate IDs
    const exists = wallets[type].some((w) => w.id === walletData.id);
    if (exists)
      throw new Error(`Wallet with ID "${walletData.id}" already exists`);

    wallets[type].push(walletData);
    saveWallets(wallets);
    return { status: true };
  } catch (error) {
    return { status: false, message: error.message };
  }
}

// ---- Edit Wallet ----
function editWallet(type, id, updatedData) {
  try {
    let isWalletValid = validateWallets(updatedData);
    if (!isWalletValid.status) {
      throw new Error(isWalletValid.message);
    }

    updatedData = isWalletValid.walletData;

    const wallets = getWallets();

    if (!wallets[type]) throw new Error(`Invalid wallet type: ${type}`);

    const index = wallets[type].findIndex((w) => w.id === id);
    if (index === -1) throw new Error(`Wallet ID "${id}" not found`);

    wallets[type][index] = { ...wallets[type][index], ...updatedData };
    saveWallets(wallets);
    return { status: true };
  } catch (error) {
    return { status: false, message: error.message };
  }
}

// ---- Delete Wallet ----
function deleteWallet(type, id) {
  try {
    const wallets = getWallets();

    if (!wallets[type]) throw new Error(`Invalid wallet type: ${type}`);

    const index = wallets[type].findIndex((w) => w.id === id);
    if (index === -1) throw new Error(`Wallet ID "${id}" not found`);

    // Check if the wallet being deleted is currently selected for rescue
    const selectedWallets = wallets.selectedRescueWallets;
    if (selectedWallets && selectedWallets[type] === id) {
      // Remove the selection if the wallet is being deleted
      selectedWallets[type] = null;
    }

    wallets[type].splice(index, 1);
    saveWallets(wallets);
    return { status: true };
  } catch (error) {
    return { status: false, message: error.message };
  }
}


// =============== selected walelt =======================
function getSelectedRescueWallets() {
  try {
    const wallets = getWallets();
    return {
      status: true,
      data: wallets.selectedRescueWallets || {
        safe: null,
        compromised: null,
        sponsor: null,
      },
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: {
        safe: null,
        compromised: null,
        sponsor: null,
      },
    };
  }
}

function clearAllSelectedRescueWallets() {
  try {
    const wallets = getWallets();

    if (!wallets.selectedRescueWallets) {
      wallets.selectedRescueWallets = {
        safe: null,
        compromised: null,
        sponsor: null,
      };
    }

    wallets.selectedRescueWallets = {
      safe: null,
      compromised: null,
      sponsor: null,
    };

    saveWallets(wallets);
    return { status: true, message: "All rescue wallet selections cleared" };
  } catch (error) {
    return { status: false, message: error.message };
  }
}

function setSelectedRescueWallet(type, walletId) {
  try {
    const wallets = getWallets();

    if (!wallets.selectedRescueWallets) {
      wallets.selectedRescueWallets = {
        safe: null,
        compromised: null,
        sponsor: null
      };
    }

    // Validate wallet type
    const validTypes = ['safe', 'compromised', 'sponsor'];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid wallet type: ${type}. Must be one of: ${validTypes.join(', ')}`);
    }

    // If walletId is provided, validate that the wallet exists
    if (walletId) {
      const walletExists = wallets[type].some(w => w.id === walletId);
      if (!walletExists) {
        throw new Error(`Wallet with ID "${walletId}" not found in ${type} wallets`);
      }
    }

    // Set the selected wallet (can be null to clear selection)
    wallets.selectedRescueWallets[type] = walletId || null;
    saveWallets(wallets);

    return { status: true, message: walletId ? `${type} wallet selected successfully` : `${type} wallet selection cleared`};
  } catch (error) {
    return { status: false, message: error.message };
  }
}

function validateSelectedRescueWallets() {
  try {
    const wallets = getWallets();
    const selected = wallets.selectedRescueWallets;

    if (!selected) {
      throw new Error("No selected rescue wallet data found");
    }

    const types = ["safe", "compromised", "sponsor"];
    const results = {
      allSelected: true,
      allExist: true,
      missingSelections: [],
      missingWallets: [],
      selectedWalletAddress: {
        safe: null,
        compromised: null,
        sponsor: null,
      },
    };

    types.forEach((type) => {
      const selectedId = selected[type];

      // 1. Check if selection is missing
      if (!selectedId) {
        results.allSelected = false;
        results.missingSelections.push(type);
        return;
      }

      // 2. Check if selected wallet exists
      const exists = wallets[type].some((w) => w.id === selectedId);
      if (!exists) {
        results.allExist = false;
        results.missingWallets.push({
          type,
          walletId: selectedId,
        });
      }else{
        results.selectedWalletAddress[type] = wallets[type].find((w) => w.id === selectedId).address;
      }
    });

    return { status: true, ...results };
  } catch (error) {
    console.log(error)
    return { status: false, message: error.message };
  }
}

function getSelectedWalletDetails(type) {
  try {
    const wallets = getWallets();

    // Validate wallet type
    const validTypes = ["safe", "compromised", "sponsor"];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid wallet type: ${type}. Must be one of: ${validTypes.join(", ")}`);
    }

    const selectedId = wallets.selectedRescueWallets?.[type];

    // If no wallet is selected
    if (!selectedId) {
      return {
        status: false,
        message: `${type} wallet is not selected`,
        wallet: null,
      };
    }

    // Find the wallet
    const wallet = wallets[type].find((w) => w.id === selectedId);

    if (!wallet) {
      return {
        status: false,
        message: `Selected ${type} wallet with ID "${selectedId}" does not exist`,
        wallet: null,
      };
    }

    return {
      status: true,
      wallet,
    };

  } catch (error) {
    return {
      status: false,
      message: error.message,
      wallet: null,
    };
  }
}


export {
  initWalletStorage,
  getWallets,
  addWallet,
  editWallet,
  deleteWallet,
  getSelectedRescueWallets,
  setSelectedRescueWallet,
  clearAllSelectedRescueWallets,
  validateSelectedRescueWallets,
  getSelectedWalletDetails,
};
