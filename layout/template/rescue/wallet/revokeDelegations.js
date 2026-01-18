import { pageHeader } from "../../utils/pageHeader.js";

async function revokeDelegationPageLayout(data = {}) {
  let revokeDelegationPageHtml = `
  

      <style>

          /* Modal Styles */
            .revoke-delegation-container .terms-modal-overlay {
                position: fixed;
                inset: 0;
                backdrop-filter: blur(6px);
                background: rgba(0,0,0,0.65);
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                visibility: hidden;
                transition: .3s ease;
                z-index: 2000;
            }

            .revoke-delegation-container .terms-modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            .revoke-delegation-container .terms-modal {
                width: 90%;
                max-width: 650px;
                max-height: 80vh;
                background: var(--black);
                border-radius: 20px;
                padding: 28px;
                border: 1px solid var(--border-color);
                box-shadow: 0 0 40px rgba(0,0,0,0.4);
                transform: translateY(-20px);
                transition: 0.3s ease;
                overflow-y: auto;
            }
            .revoke-delegation-container .terms-modal-overlay.active .terms-modal {
                transform: translateY(0);
            }

            /* ---------- Header ---------- */
            .revoke-delegation-container .terms-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 12px;
                margin-bottom: 20px;
                border-bottom: 1px solid var(--border-color);
            }
            .revoke-delegation-container .terms-title {
                font-size: 22px;
                font-weight: 700;
                color: var(--white);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .revoke-delegation-container .terms-close {
                background: none;
                border: none;
                color: var(--color-text-muted);
                cursor: pointer;
            }

            /* ---------- Advanced Accordion ---------- */
            .revoke-delegation-container .terms-accordion {
                display: flex;
                flex-direction: column;
                gap: 18px;
            }

            /* Group Container */
            .revoke-delegation-container .terms-group {
                background: var(--color-body-bg);
                border-radius: 16px;
                border: 1px solid var(--border-color);
                box-shadow: 0 0 12px rgba(0,0,0,0.3);
                overflow: hidden;
            }

            /* Group Header */
            .revoke-delegation-container .terms-group-header {
                padding: 18px;
                background: var(--black);
                border-bottom: 1px solid var(--border-color);
                font-size: 16px;
                font-weight: 700;
                color: var(--white);
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .revoke-delegation-container .terms-group-header svg {
                transition: 0.3s ease;
            }

            .revoke-delegation-container .terms-group.open .terms-group-header svg {
                transform: rotate(180deg);
            }

            /* Group Items Wrapper */
            .revoke-delegation-container .terms-group-body {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.35s ease-in-out;
                padding: 0 18px;
            }

            /* Individual Term */
            .revoke-delegation-container .terms-item {
                padding: 14px 0;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                gap: 12px;
            }
            .revoke-delegation-container .terms-item:last-child {
                border-bottom: none;
            }

            /* Icons */
            .revoke-delegation-container .terms-item-icon {
                width: 28px;
                height: 28px;
                background: var(--color-primary);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                flex-shrink: 0;
            }

            /* Titles & Messages */
            .revoke-delegation-container .terms-item-title {
                font-size: 15px;
                font-weight: 700;
                color: var(--white);
            }
            .revoke-delegation-container .terms-item-message {
                margin-top: 4px;
                font-size: 14px;
                color: var(--mid-white);
            }

        // revoke body css

        .revoke-delegation-container {
            width: 100%;
        }

        .revoke-delegation-container .preRequ_div {
            background-color: var(--black);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            border: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .supportLink {
           color: var(--white);
        }

        .revoke-delegation-container .card {
            background-color: var(--black);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            border: 1px solid var(--border-color);
        }

        .revoke-delegation-container .card.active {
            display: block;
            animation: revoke-delegation-container-fadeIn 0.5s ease;
        }

        @keyframes revoke-delegation-container-fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .revoke-delegation-container .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .revoke-delegation-container .card-title {
            font-size: 20px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            color:var(--white);
        }

        .revoke-delegation-container .card-title i {
            color: var(--color-primary);
        }

        .revoke-delegation-container .wallet-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .revoke-delegation-container .wallet-card {
            background-color: var(--color-body-bg);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid var(--border-color);
            transition: all 0.3s;
        }

        .revoke-delegation-container .wallet-card:hover {
            transform: translateY(-5px);
        }

        .revoke-delegation-container .wallet-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .revoke-delegation-container .wallet-title {
            font-size: 16px;
            font-weight: 600;
            color: var(--mid-white);
        }

        .revoke-delegation-container .wallet-address {
            font-family: monospace;
            font-size: 14px;
            color: var(--color-text-muted);
            margin-bottom: 15px;
            word-break: break-all;
            background-color: var(--black);
            padding: 7px 10px;
            border-radius: 5px;
        }

        .revoke-delegation-container .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
            font-size: 14px;
        }

        .revoke-delegation-container .btn-primary {
            background-color: var(--color-primary);
            color: white;
        }

        .revoke-delegation-container .btn-primary:hover {
            background-color: var(--color-primary);
        }
 
        .revoke-delegation-container .btn-secondary {
            background-color: var(--border-color);
            color: var(--white);
        }

        .revoke-delegation-container .btn-secondary:hover {
            background-color: var(----color-text-lighter);
        }

        .revoke-delegation-container .btn-success {
            background-color: var(--success);
            color: white;
        }

        .revoke-delegation-container .btn-success:hover {
            background-color: var(--success);
        }

        .revoke-delegation-container .btn-danger {
            background-color: var(--danger);
            color: white;
        }

        .revoke-delegation-container .btn-danger:hover {
            background-color: var(--danger);
        }

        .revoke-delegation-container .action-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }

        @media (max-width: 768px) {
            .revoke-delegation-container .wallet-grid {
                grid-template-columns: 1fr;
            }
        }

        .revoke-delegation-container .form-group {
            margin-bottom: 20px;
        }

        .revoke-delegation-container .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--mid-white);
        }

        .revoke-delegation-container .form-control {
            width: 100%;
            padding: 12px 16px;
            background-color: var(--color-body-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            color: var(--white);
            font-size: 16px;
            transition: all 0.3s;
        }

        .revoke-delegation-container .form-control:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px var(--border-color);
        }

        .revoke-delegation-container .input-group {
            display: flex;
            gap: 10px;
        }

        .revoke-delegation-container .input-group .form-control {
            flex: 1;
        }

        .revoke-delegation-container .chain-id {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background-color: var(--success_bg);
            color: var(--color-primary);
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            margin-top: 10px;
        }

        .revoke-delegation-container .hidden{
            display: none !important;
        }

        .revoke-delegation-container .delegation-list {
            margin-top: 20px;
        }

        .revoke-delegation-container .delegation-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background-color: var(--color-body-bg);
            border-radius: 12px;
            border: 1px solid var(--border-color);
            margin-bottom: 10px;
        }

        .revoke-delegation-container .delegation-info {
            display: flex;
            align-items: center;
            gap: 20px;
            flex: 1;
        }

        .revoke-delegation-container .chain-id-badge {
            font-family: monospace;
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 6px;
            background-color: var(--border-color);
            color: var(--color-text-muted);
            min-width: 60px;
            text-align: center;
        }

        .revoke-delegation-container .delegation-address {
            font-family: monospace;
            font-size: 14px;
            color: var(--color-text-muted);
            word-break: break-all;
        }

        .revoke-delegation-container .delegation-actions {
            display: flex;
            gap: 10px;
        }

        .revoke-delegation-container .no-delegations {
            text-align: center;
            padding: 40px 20px;
            color: var(--color-text-muted);
        }

        .revoke-delegation-container .scan-section {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        .revoke-delegation-container .transaction-status {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px;
            border-radius: 12px;
            margin-top: 20px;
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: anywhere;
        }

        .revoke-delegation-container .status-pending {
            background-color: var(--warning_bg);
            color: var(--warning);
        }

        .revoke-delegation-container .status-success {
            background-color: var(--success_bg);
            color: var(--success);
        }

        .revoke-delegation-container .status-failed {
            background-color: var(--danger_bg);
            color: var(--danger);
        }

        @media (max-width: 768px) {
            .revoke-delegation-container .nav-links {
                display: none;
            }
            
            .revoke-delegation-container .input-group {
                flex-direction: column;
            }

            .revoke-delegation-container .delegation-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }

            .revoke-delegation-container .delegation-info {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
                width: 100%;
            }

            .revoke-delegation-container .delegation-actions {
                width: 100%;
                justify-content: flex-end;
            }
        }


        /* Add to your existing CSS */
.revoke-delegation-container .delegation-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--color-body-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.revoke-delegation-container .delegation-row:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.revoke-delegation-container .delegation-info {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.revoke-delegation-container .chain-id-badge {
  font-family: monospace;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  background-color: var(--border-color);
  color: var(--color-text-muted);
  min-width: 80px;
  text-align: center;
}

.revoke-delegation-container .delegation-address {
  font-family: monospace;
  font-size: 14px;
  color: var(--white);
  word-break: break-all;
}

.revoke-delegation-container .delegation-actions {
  display: flex;
  gap: 10px;
}

.revoke-delegation-container .no-delegations {
  text-align: center;
  padding: 40px 20px;
  color: var(--color-text-muted);
  font-style: italic;
}

/* Responsive design */
@media (max-width: 768px) {
  .revoke-delegation-container .delegation-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .revoke-delegation-container .delegation-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
  }
  
  .revoke-delegation-container .chain-id-badge {
    align-self: flex-start;
  }
  
  .revoke-delegation-container .delegation-actions {
    width: 100%;
    justify-content: flex-end;
  }
}


    </style>

    ${await pageHeader({
      haveBack: true,
      page: "home",
      controller: "site",
      title: "Revoke Delegations",
      desc: "Revoke wallet delegations and approvals to enhance security.",
    })}

    <div class="revoke-delegation-container">

        <!-- Section 1: Guide Support Section -->
        <div class="preRequ_div"> 
           <h2 class="card-title">Delegation Terms and Conditions</h2>
           <div>
              <button class="btn-primary btn" id="readPrerequisites">Read</button>
              &nbsp;
              <button class="btn-success btn" id="">
               <a class="supportLink" target="_blank" href="${
                 data.ownerTgContact
               }" >Support</a>
              </button>
           </div>
        </div>

        <!-- Terms Modal -->
        <div class="terms-modal-overlay" id="termsModal">
            <div class="terms-modal">

                <div class="terms-header">
                    <h2 class="terms-title">
                        <svg width="22" height="22" viewBox="0 0 24 24">
                            <path d="M12 2A10 10 0 1 0 12 22A10 10 0 0 0 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                        </svg>
                        Terms & Service
                    </h2>

                    <button class="terms-close" id="closeTermsModal">
                       <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"> <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/> </svg>
                    </button>
                </div>

                <!-- Dynamic Content -->
                <div id="termsContent" class="terms-accordion"></div>

                <button id="acceptTermsBtn" class="btn btn-primary" style="width:100%; margin-top:25px;">
                    I Understand
                </button>
            </div>
        </div>

        <!-- Section 2: Wallet Configuration -->
        <section class="card active" id="walletSection">
            <div class="card-header">
                <h2 class="card-title">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 25px; height: 25px;">
                        <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
                    </svg>
                    Wallet Configuration
                </h2>
            </div>
            
            <div class="wallet-grid">

                <div class="wallet-card hidden">
                    <div class="wallet-header">
                        <span class="wallet-title">Safe Wallet</span>
                    </div>
                    <div class="wallet-address" id="safeAddress">Not Configured</div>
                    <button class="btn btn-primary walletConfigureBtns">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 21V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M4 10V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M12 21V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M12 8V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M20 21V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M20 12V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M1 14H7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M9 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M17 16H23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        Configure
                    </button>
                </div>

                <div class="wallet-card">
                    <div class="wallet-header">
                        <span class="wallet-title">Compromised Wallet</span>
                    </div>
                    <div class="wallet-address" id="compromisedAddress">Not Configured</div>
                    <button class="btn btn-primary walletConfigureBtns" data-wallet="compromised">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 21V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M4 10V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M12 21V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M12 8V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M20 21V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M20 12V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M1 14H7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M9 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M17 16H23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        Configure
                    </button>
                </div>
                
                <div class="wallet-card">
                    <div class="wallet-header">
                        <span class="wallet-title">Sponsor Wallet</span>
                    </div>
                    <div class="wallet-address" id="sponsorAddress">Not Configured</div>
                    <button class="btn btn-primary walletConfigureBtns" data-wallet="sponsor">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 21V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M4 10V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M12 21V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M12 8V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M20 21V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M20 12V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M1 14H7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M9 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M17 16H23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        Configure
                    </button>
                </div>
            </div>

              <div class="action-buttons">
                <div></div> <!-- Empty div for spacing -->
                <button class="btn btn-primary next-step" data-next="2" id="verifyWalletsBtn">
                    Verify
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            
        </section>

        <!-- Section 3: RPC URL Configuration -->
        <section class="card active" id="rpcSection">
            <div class="card-header">
                <h2 class="card-title">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 25px; height: 25px;">
                        <path d="M9 3L5 6.99H8V14H10V6.99H13L9 3ZM16 17.01V10H14V17.01H11L15 21L19 17.01H16Z" fill="currentColor"/>
                    </svg>
                    Network Configuration
                </h2>
            </div>
            
            <div class="form-group">
                <label class="form-label">RPC URL</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="rpcUrlInputTag" placeholder="https://mainnet.infura.io/v3/your-api-key" value="">
                    <button class="btn btn-primary" id="verifyRpc">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/>
                          <path d="M13 13L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        Verify
                    </button>
                </div>
                <div class="chain-id hidden" id="chainIdDisplay" >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                        <path d="M13.828 10.172C13.0779 9.42187 12.0609 9 11 9C9.93913 9 8.92215 9.42187 8.172 10.172L5.172 13.172C4.42186 13.9221 4 14.9391 4 16C4 17.0609 4.42186 18.0779 5.172 18.828C5.92215 19.5781 6.93913 20 8 20C9.06087 20 10.0779 19.5781 10.828 18.828L12 17.656M10.172 13.828C10.9221 14.5781 11.9391 15 13 15C14.0609 15 15.0779 14.5781 15.828 13.828L18.828 10.828C19.5781 10.0779 20 9.06087 20 8C20 6.93913 19.5781 5.92215 18.828 5.172C18.0779 4.42187 17.0609 4 16 4C14.9391 4 13.9221 4.42187 13.172 5.172L12 6.343" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Chain ID: <span id="chainIdValue">Network details</span>
                </div>
            </div>
        </section>

        <!-- Section 4: Delegation Results -->
        <section class="card active" id="delegationSection">
            <div class="card-header">
                <h2 class="card-title">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 25px; height: 25px;">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor"/>
                    </svg>
                    Delegation Results
                </h2>
            </div>
            
            <div class="scan-section">
                <button class="btn btn-primary" id="scanDelegations">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 12.79C21 13.24 20.46 13.5 20.1 13.22L19.84 13.05C19.94 12.7 20 12.36 20 12C20 8.69 17.31 6 14 6H11V4H14C18.42 4 22 7.58 22 12C22 12.24 21.97 12.47 21.93 12.71L21 12.79Z" fill="currentColor"/>
                        <path d="M14 18H11V20H14C18.42 20 22 16.42 22 12C22 11.76 21.97 11.53 21.93 11.29L21 11.21C21 10.76 20.46 10.5 20.1 10.78L19.84 10.95C19.94 11.3 20 11.64 20 12C20 15.31 17.31 18 14 18Z" fill="currentColor"/>
                        <path d="M4 12C4 15.31 6.69 18 10 18H13V20H10C5.58 20 2 16.42 2 12C2 11.76 2.03 11.53 2.07 11.29L3 11.21C3 10.76 3.54 10.5 3.9 10.78L4.16 10.95C4.06 11.3 4 11.64 4 12Z" fill="currentColor"/>
                        <path d="M10 6H13V4H10C5.58 4 2 7.58 2 12C2 12.24 2.03 12.47 2.07 12.71L3 12.79C3 13.24 3.54 13.5 3.9 13.22L4.16 13.05C4.06 12.7 4 12.36 4 12C4 8.69 6.69 6 10 6Z" fill="currentColor"/>
                    </svg>
                    Scan Delegations
                </button>
            </div>
            
            <div class="delegation-list" id="delegationList">
                <!-- Delegations will be populated here dynamically -->
                <div id="listCon"></div>
                <div class="no-delegations" id="noDelegateList">
                    Configure wallets and RPC, then click "Scan Delegations"
                </div>
            </div>

            <div class="transaction-status status-pending hidden" id="transactionStatus">
            </div>

        </section>
  
    </div>


  `;

  return revokeDelegationPageHtml;
}

export { revokeDelegationPageLayout };
