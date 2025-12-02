import { showToast } from "../../../utils/toast.js";
import {
  initWalletStorage as iniRescueWalletsStorage,
  getWallets as getRescueWallets,
  addWallet as addRescueWallet,
  editWallet as editRescueWallet,
  deleteWallet as deleteRescueWallet,
  setSelectedRescueWallet,
} from "../../../../src/backend/site/settings/rescueWalletsStorage.js";

async function iniRescueWalletsPage(data) {

  await iniRescueWalletsStorage();

  let wallets = {};
  async function getAllRescueWallet() {
    try {
      wallets = await getRescueWallets();
    } catch (error) {
      showToast({
        message: "Failed to load wallets: " + error.message,
        type: 3,
      });
    }
  }
  await getAllRescueWallet();

  // Data storage

  // DOM Elements
  const safeWalletsList = document.getElementById("safeWalletsList");
  const compromisedWalletsList = document.getElementById("compromisedWalletsList");
  const sponsorWalletsList = document.getElementById("sponsorWalletsList");
  const walletModal = document.getElementById("walletModal");
  const walletForm = document.getElementById("walletForm");
  const closeModal = document.getElementById("closeModal");
  const cancelBtn = document.getElementById("cancelBtn");
  const modalTitle = document.getElementById("modalTitle");
  const walletId = document.getElementById("walletId");
  const walletType = document.getElementById("walletType");
  const walletAddress = document.getElementById("walletAddress");
  const walletPrivateKey = document.getElementById("walletPrivateKey");
  const walletName = document.getElementById("walletName");
  const privateKeyGroup = document.getElementById("privateKeyGroup");
  const addressLabel = document.getElementById("addressLabel");
  const privateKeyLabel = document.getElementById("privateKeyLabel");

  // Event Listeners
  document.getElementById("addSafeWallet")?.addEventListener("click", () => openModal("safe"));
  document.getElementById("addCompromisedWallet")?.addEventListener("click", () => openModal("compromised"));
  document.getElementById("addSponsorWallet")?.addEventListener("click", () => openModal("sponsor"));

  closeModal?.addEventListener("click", closeWalletModal);
  cancelBtn?.addEventListener("click", closeWalletModal);
  walletForm?.addEventListener("submit", saveWallet);

  // Initialize the wallet lists
  updateWalletCounts();
  renderWallets();

  // Functions
  function openModal(type, id = null) {
    walletType.value = type;
    walletId.value = id || "";

    // Reset form
    walletForm.reset();

    // Configure modal based on wallet type
    if (type === "safe") {
      modalTitle.textContent = id ? "Edit Safe Wallet" : "Add Safe Wallet";
      addressLabel.textContent = "Wallet Address";
      privateKeyGroup.style.display = "none";
      walletAddress.style.display = "block";
      addressLabel.style.display = "block";
    } else if (type === "compromised") {
      modalTitle.textContent = id
        ? "Edit Compromised Wallet"
        : "Add Compromised Wallet";
      addressLabel.textContent = "Wallet Address";
      privateKeyLabel.textContent = "Private Key";
      privateKeyGroup.style.display = "block";
      walletAddress.style.display = "none";
      addressLabel.style.display = "none";
    } else if (type === "sponsor") {
      modalTitle.textContent = id
        ? "Edit Sponsor Wallet"
        : "Add Sponsor Wallet";
      addressLabel.textContent = "Wallet Address";
      privateKeyLabel.textContent = "Private Key";
      privateKeyGroup.style.display = "block";
      walletAddress.style.display = "none";
      addressLabel.style.display = "none";
    }

    // If editing, populate form with existing data
    if (id) {
      const wallet = wallets[type].find((w) => w.id === id);
      if (wallet) {
        walletAddress.value = wallet.address;
        walletName.value = wallet.name || "";
        if (wallet.privateKey) {
          walletPrivateKey.value = wallet.privateKey;
        }
      }
    }

    walletModal.style.display = "flex";
  }

  function closeWalletModal() {
    walletModal.style.display = "none";
  }

  async function saveWallet(e) {
    e.preventDefault();

    const type = walletType.value;
    const id = walletId.value || generateId();
    const address = walletAddress.value.trim();
    const privateKey = walletPrivateKey.value.trim();
    const name = walletName.value.trim();

    if (type === "safe" && !address) {
      alert("Please enter a wallet address");
      return;
    }

    if ((type === "compromised" || type === "sponsor") && !privateKey) {
      alert("Please enter a private key");
      return;
    }

    if (!name) {
      alert("Please enter a wallet name");
      return;
    }

    const walletData = {
      id,
      address,
      name,
      dateAdded: new Date().toISOString().split("T")[0],
    };

    if (type === "compromised" || type === "sponsor") {
      walletData.privateKey = privateKey;
    }

    // Check if we're editing an existing wallet
    if (walletId.value) {
      const index = wallets[type].findIndex((w) => w.id === walletId.value);
      if (index >= 0) {
        let editWalletResult = await editRescueWallet(
          type,
          walletData.id,
          walletData
        );
        if (editWalletResult.status) {
          showToast({ message: "Wallet saved successfully", type: 1 });
        } else {
          showToast({
            message: "Failed to save wallet" + editWalletResult.message,
            type: 3,
          });
          return;
        }
      }
    } else {
      // Add new wallet
      let addWalletResult = await addRescueWallet(type, walletData);
      if (addWalletResult.status) {
        showToast({ message: "Wallet added successfully", type: 1 });
      } else {
        showToast({
          message: "Failed to add wallet: " + addWalletResult.message,
          type: 3,
        });
        return;
      }
    }

    updateWalletCounts();
    renderWallets();
    closeWalletModal();
    await updateRescueSelectionDropdowns();
  }

  async function deleteWallet(type, id) {
    if (confirm("Are you sure you want to delete this wallet?")) {
      let deleteWalletResult = await deleteRescueWallet(type, id);

      if (deleteWalletResult.status) {
        showToast({ message: "Wallet deleted successfully", type: 1 });
      } else {
        showToast({
          message: "Failed to delete wallet: " + deleteWalletResult.message,
          type: 3,
        });
      }

      updateWalletCounts();
      renderWallets();
      await updateRescueSelectionDropdowns();
    }
  }

  function togglePrivateKey(element) {
    let beforePrivatekey = element.parentElement.nextElementSibling;
    const privateKeyElement = beforePrivatekey;
    const isMasked = privateKeyElement.classList.contains("private-key-mask");

    if (isMasked) {
      privateKeyElement.classList.remove("private-key-mask");
      element.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                </svg>
                Hide
            `;
    } else {
      privateKeyElement.classList.add("private-key-mask");
      element.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"/>
                </svg>
                Show
            `;
    }
  }

  async function updateWalletCounts() {
    await getAllRescueWallet();

    const safeCount = document.getElementById("safeCount");
    const compromisedCount = document.getElementById("compromisedCount");
    const sponsorCount = document.getElementById("sponsorCount");

    if (safeCount) safeCount.textContent = wallets.safe.length;
    if (compromisedCount)
      compromisedCount.textContent = wallets.compromised.length;
    if (sponsorCount) sponsorCount.textContent = wallets.sponsor.length;
  }

  async function renderWallets() {
    await getAllRescueWallet();

    // Safe wallets
    renderWalletList(safeWalletsList, "safe");

    // Compromised wallets
    renderWalletList(compromisedWalletsList, "compromised");

    // Sponsor wallets
    renderWalletList(sponsorWalletsList, "sponsor");
  }

  function renderWalletList(container, type) {
    if (!container) return;

    const walletsList = wallets[type];

    if (walletsList.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        ${
                          type === "safe"
                            ? '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1ZM12,7C13.1,7 14,7.9 14,9C14,10.1 13.1,11 12,11C10.9,11 10,10.1 10,9C10,7.9 10.9,7 12,7ZM18,13.5C16.53,14.12 15.28,15.09 14.31,16.31L13.43,15.43C13.82,14.27 14.85,13.39 16.08,13.14C16.05,13.09 16.03,13.04 16,13C15.42,12.25 14.75,11.58 14,11C14,10.96 13.95,10.95 13.91,10.93C13.73,9.92 13.01,9.11 12,9.11C10.99,9.11 10.27,9.92 10.09,10.93C10.05,10.95 10,10.96 10,11C9.25,11.58 8.58,12.25 8,13C7.97,13.04 7.95,13.09 7.92,13.14C9.15,13.39 10.18,14.27 10.57,15.43L9.69,16.31C8.72,15.09 7.47,14.12 6,13.5V6.3L12,3.19L18,6.3V13.5Z"/></svg>'
                            : type === "compromised"
                            ? '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1ZM10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/></svg>'
                            : '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2ZM12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20ZM11,16H13V18H11V16ZM13,10H11V14H13V10Z"/></svg>'
                        }
                    </div>
                    <p>No ${type} wallets added yet</p>
                    <button class="btn btn-${
                      type === "safe"
                        ? "success"
                        : type === "compromised"
                        ? "danger"
                        : "primary"
                    } btn-sm" style="margin-top: 15px;" onclick="window.rescueWallets?.openModal('${type}')">
                        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                        </svg>
                        <span>Add ${
                          type.charAt(0).toUpperCase() + type.slice(1)
                        } Wallet</span>
                    </button>
                </div>
            `;
      return;
    }

    container.innerHTML = "";

    walletsList.forEach((wallet) => {
      const walletItem = document.createElement("div");
      walletItem.className = "wallet-item";

      let content = `
                <div class="wallet-header">
                    <div class="wallet-name">${wallet.name}</div>
                    <div class="wallet-actions">
                        <button class="btn-icon" onclick="window.rescueWallets?.openModal('${type}', '${wallet.id}')">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="window.rescueWallets?.deleteWallet('${type}', '${wallet.id}')">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="wallet_address_label">Wallet Address: </div>
                <div class="wallet-address">${wallet.address}</div>
            `;

      if (wallet.privateKey) {
        content += `
                    <div class="wallet-privatekey-header_div">
                      <div class="wallet-privatekey_label">Wallet Privatekey: </div>
                      <button class="toggle-private-key" onclick="window.rescueWallets?.togglePrivateKey(this)">
                          <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                          </svg>
                          Show
                      </button>
                    </div>
                    <div class="wallet-private-key private-key-mask">
                        ${wallet.privateKey}
                    </div>
                `;
      }

      content += `
                <div class="wallet-meta">
                    <span>Added: ${wallet.dateAdded}</span>
                    <span>${
                      type === "safe"
                        ? "Secure"
                        : type === "compromised"
                        ? "Compromised"
                        : "Sponsor"
                    }</span>
                </div>
            `;

      walletItem.innerHTML = content;
      container.appendChild(walletItem);
    });
  }

  function generateId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  // Make functions available globally for onclick handlers
  window.rescueWallets = {
    openModal,
    deleteWallet,
    togglePrivateKey,
  };


  // selected rescue wallet managment

  await updateRescueSelectionDropdowns();
  initRescueSelectionEvents();

  // =======================================================================================
  // ======================= selected rescue wallet managment ==============================
  // =======================================================================================


   // ---- Update Rescue Selection Dropdowns ----
    async function updateRescueSelectionDropdowns() {
      try {
        const wallets = await getRescueWallets();
        const selectedWallets = wallets.selectedRescueWallets || {
          safe: null,
          compromised: null,
          sponsor: null
        };

        // Update Safe Wallets dropdown
        const safeSelect = document.getElementById('selectedSafeWallet');
        if (safeSelect) {
          safeSelect.innerHTML = '<option value="">Select a safe wallet...</option>';
          wallets.safe.forEach(wallet => {
            const option = document.createElement('option');
            option.value = wallet.id;
            option.textContent = `${wallet.name} (${wallet.address.slice(0, 8)}...)`;
            option.selected = selectedWallets.safe === wallet.id;
            safeSelect.appendChild(option);
          });
        }

        // Update Compromised Wallets dropdown
        const compromisedSelect = document.getElementById('selectedCompromisedWallet');
        if (compromisedSelect) {
          compromisedSelect.innerHTML = '<option value="">Select a compromised wallet...</option>';
          wallets.compromised.forEach(wallet => {
            const option = document.createElement('option');
            option.value = wallet.id;
            option.textContent = `${wallet.name} (${wallet.address.slice(0, 8)}...)`;
            option.selected = selectedWallets.compromised === wallet.id;
            compromisedSelect.appendChild(option);
          });
        }

        // Update Sponsor Wallets dropdown
        const sponsorSelect = document.getElementById('selectedSponsorWallet');
        if (sponsorSelect) {
          sponsorSelect.innerHTML = '<option value="">Select a sponsor wallet...</option>';
          wallets.sponsor.forEach(wallet => {
            const option = document.createElement('option');
            option.value = wallet.id;
            option.textContent = `${wallet.name} (${wallet.address.slice(0, 8)}...)`;
            option.selected = selectedWallets.sponsor === wallet.id;
            sponsorSelect.appendChild(option);
          });
        }

        // Enable/disable save buttons based on selection
        updateSaveButtonsState();

      } catch (error) {
        console.error('Failed to update rescue selection dropdowns:', error);
      }
    }

    // ---- Update Save Buttons State ----
    function updateSaveButtonsState() {
      const safeSelect = document.getElementById('selectedSafeWallet');
      const compromisedSelect = document.getElementById('selectedCompromisedWallet');
      const sponsorSelect = document.getElementById('selectedSponsorWallet');
      
      const saveSafeBtn = document.getElementById('saveSafeSelection');
      const saveCompromisedBtn = document.getElementById('saveCompromisedSelection');
      const saveSponsorBtn = document.getElementById('saveSponsorSelection');

      // Enable buttons only when a valid selection is made
      if (saveSafeBtn) {
        saveSafeBtn.disabled = !safeSelect || safeSelect.value === '';
      }
      
      if (saveCompromisedBtn) {
        saveCompromisedBtn.disabled = !compromisedSelect || compromisedSelect.value === '';
      }
      
      if (saveSponsorBtn) {
        saveSponsorBtn.disabled = !sponsorSelect || sponsorSelect.value === '';
      }
    }

    // ---- Initialize Rescue Selection Events ----
    function initRescueSelectionEvents() {
      // Add event listeners for selection changes
      const safeSelect = document.getElementById('selectedSafeWallet');
      const compromisedSelect = document.getElementById('selectedCompromisedWallet');
      const sponsorSelect = document.getElementById('selectedSponsorWallet');
      
      const saveSafeBtn = document.getElementById('saveSafeSelection');
      const saveCompromisedBtn = document.getElementById('saveCompromisedSelection');
      const saveSponsorBtn = document.getElementById('saveSponsorSelection');

      // Update button states when selections change
      if (safeSelect) {
        safeSelect.addEventListener('change', updateSaveButtonsState);
      }
      if (compromisedSelect) {
        compromisedSelect.addEventListener('change', updateSaveButtonsState);
      }
      if (sponsorSelect) {
        sponsorSelect.addEventListener('change', updateSaveButtonsState);
      }

      // Add event listeners for save buttons
      if (saveSafeBtn) {
        saveSafeBtn.addEventListener('click', () => saveRescueSelection('safe'));
      }
      if (saveCompromisedBtn) {
        saveCompromisedBtn.addEventListener('click', () => saveRescueSelection('compromised'));
      }
      if (saveSponsorBtn) {
        saveSponsorBtn.addEventListener('click', () => saveRescueSelection('sponsor'));
      }
    }

    // ---- Save Rescue Selection ----
    async function saveRescueSelection(type) {
      try {
        const selectElement = document.getElementById(`selected${type.charAt(0).toUpperCase() + type.slice(1)}Wallet`);
        const saveButton = document.getElementById(`save${type.charAt(0).toUpperCase() + type.slice(1)}Selection`);
        
        if (!selectElement || !saveButton) {
          throw new Error(`Selection elements for ${type} not found`);
        }

        const selectedWalletId = selectElement.value;
        
        if (!selectedWalletId) {
          showToast({ message: `Please select a ${type} wallet`, type: 3 });
          return;
        }

        // Save the selection
        const result = await setSelectedRescueWallet(type, selectedWalletId);
        
        if (result.status) {
          showToast({ message: result.message, type: 1 });
          
          // Update button to show saved state
          saveButton.classList.add('saved');
          saveButton.innerHTML = `
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
            </svg>
            <span>Saved</span>
          `;
          
          // Reset button after 2 seconds
          setTimeout(() => {
            saveButton.classList.remove('saved');
            saveButton.innerHTML = `
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,3H5C3.89,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V7L17,3M19,19H5V5H16.17L19,7.83V19M12,12C10.34,12 9,13.34 9,15C9,16.66 10.34,18 12,18C13.66,18 15,16.66 15,15C15,13.34 13.66,12 12,12M6,6H15V10H6V6Z"/>
              </svg>
              <span>Save</span>
            `;
          }, 2000);
        } else {
          showToast({ message: result.message, type: 3 });
        }
      } catch (error) {
        showToast({ message: `Failed to save ${type} selection: ${error.message}`, type: 3 });
      }
    }

}

export { iniRescueWalletsPage };
