import { pageHeader } from "../../utils/pageHeader.js";

async function nftRescuePageLayout(data = {}) {
  let nftRescuePageHtml = `
  

      <style>

          /* Modal Styles */
            .nft-rescue-container .terms-modal-overlay {
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

            .nft-rescue-container .terms-modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            .nft-rescue-container .terms-modal {
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
            .nft-rescue-container .terms-modal-overlay.active .terms-modal {
                transform: translateY(0);
            }

            /* ---------- Header ---------- */
            .nft-rescue-container .terms-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 12px;
                margin-bottom: 20px;
                border-bottom: 1px solid var(--border-color);
            }
            .nft-rescue-container .terms-title {
                font-size: 22px;
                font-weight: 700;
                color: var(--white);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .nft-rescue-container .terms-close {
                background: none;
                border: none;
                color: var(--color-text-muted);
                cursor: pointer;
            }

            /* ---------- Advanced Accordion ---------- */
            .nft-rescue-container .terms-accordion {
                display: flex;
                flex-direction: column;
                gap: 18px;
            }

            /* Group Container */
            .nft-rescue-container .terms-group {
                background: var(--color-body-bg);
                border-radius: 16px;
                border: 1px solid var(--border-color);
                box-shadow: 0 0 12px rgba(0,0,0,0.3);
                overflow: hidden;
            }

            /* Group Header */
            .nft-rescue-container .terms-group-header {
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

            .nft-rescue-container .terms-group-header svg {
                transition: 0.3s ease;
            }

            .nft-rescue-container .terms-group.open .terms-group-header svg {
                transform: rotate(180deg);
            }

            /* Group Items Wrapper */
            .nft-rescue-container .terms-group-body {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.35s ease-in-out;
                padding: 0 18px;
            }

            /* Individual Term */
            .nft-rescue-container .terms-item {
                padding: 14px 0;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                gap: 12px;
            }
            .nft-rescue-container .terms-item:last-child {
                border-bottom: none;
            }

            /* Icons */
            .nft-rescue-container .terms-item-icon {
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
            .nft-rescue-container .terms-item-title {
                font-size: 15px;
                font-weight: 700;
                color: var(--white);
            }
            .nft-rescue-container .terms-item-message {
                margin-top: 4px;
                font-size: 14px;
                color: var(--mid-white);
            }




        // rescu body css

        .nft-rescue-container {
            width: 100%;
        }

        .nft-rescue-container .preRequ_div {
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

        .nft-rescue-container .card {
            background-color: var(--black);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            border: 1px solid var(--border-color);
        }

        .nft-rescue-container .card.active {
            display: block;
            animation: nft-rescue-container-fadeIn 0.5s ease;
        }

        @keyframes nft-rescue-container-fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .nft-rescue-container .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .nft-rescue-container .card-title {
            font-size: 20px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            color:var(--white);
        }

        .nft-rescue-container .card-title i {
            color: var(--color-primary);
        }

        .nft-rescue-container .wallet-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .nft-rescue-container .wallet-card {
            background-color: var(--color-body-bg);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid var(--border-color);
            transition: all 0.3s;
        }

        .nft-rescue-container .wallet-card:hover {
            transform: translateY(-5px);
        }

        .nft-rescue-container .wallet-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .nft-rescue-container .wallet-title {
            font-size: 16px;
            font-weight: 600;
            color: var(--mid-white);
        }

        .nft-rescue-container .wallet-address {
            font-family: monospace;
            font-size: 14px;
            color: var(--color-text-muted);
            margin-bottom: 15px;
            word-break: break-all;
            background-color: var(--black);
            padding: 7px 10px;
            border-radius: 5px;
        }

        .nft-rescue-container .btn {
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

        .nft-rescue-container .btn-primary {
            background-color: var(--color-primary);
            color: white;
        }

        .nft-rescue-container .btn-primary:hover {
            background-color: var(--color-primary);
        }
 
        .nft-rescue-container .btn-secondary {
            background-color: var(--border-color);
            color: var(--white);
        }

        .nft-rescue-container .btn-secondary:hover {
            background-color: var(----color-text-lighter);
        }

        .nft-rescue-container .btn-success {
            background-color: var(--success);
            color: white;
        }

        .nft-rescue-container .btn-success:hover {
            background-color: var(--success);
        }

        .nft-rescue-container .btn-danger {
            background-color: var(--danger);
            color: white;
        }

        .nft-rescue-container .btn-danger:hover {
            background-color: var(--danger);
        }

        .nft-rescue-container .action-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }

        @media (max-width: 768px) {
            .nft-rescue-container .wallet-grid {
                grid-template-columns: 1fr;
            }
        }

        .nft-rescue-container .form-group {
            margin-bottom: 20px;
        }

        .nft-rescue-container .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--mid-white);
        }

        .nft-rescue-container .form-control {
            width: 100%;
            padding: 12px 16px;
            background-color: var(--color-body-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            color: var(--white);
            font-size: 16px;
            transition: all 0.3s;
        }

        .nft-rescue-container .form-control:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px var(--border-color);
        }

        .nft-rescue-container .input-group {
            display: flex;
            gap: 10px;
        }

        .nft-rescue-container .input-group .form-control {
            flex: 1;
        }

        .nft-rescue-container .chain-id {
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

        .hidden{
            display: none;
        }

        .nft-rescue-container .simulation-steps {
            margin-top: 25px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .nft-rescue-container .simulation-step {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            padding: 15px;
            background-color: var(--color-body-bg);
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }

        .nft-rescue-container .step-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            background-color: var(--border-color);
            color: var(--color-text-muted);
        }

        .nft-rescue-container .step-icon.pending {
            background-color: var(--border-color);
            color: var(--color-text-muted);
        }

        .nft-rescue-container .step-icon.success {
            background-color: var(--success_bg);
            color: var(--success);
        }

        .nft-rescue-container .step-icon.error {
            background-color: var(--danger_bg);
            color: var(--danger);
        }

        .nft-rescue-container .step-content {
            flex: 1;
        }

        .nft-rescue-container .step-title {
            font-weight: 600;
            margin-bottom: 15px;
            color: var(--mid-white);
        }

        .nft-rescue-container .step-description {
            font-size: 14px;     
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            color: var(--color-text-muted);
        }
        .nft-rescue-container .action-buttons {
            color: var(--color-text-muted);
            margin-bottom: 15px;
        }

        .nft-rescue-container .step-result {
            font-size: 14px;
            padding: 8px 12px;
            border-radius: 12px;
            margin-top: 10px;

            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: anywhere;
        }

        .nft-rescue-container .step-result.success {
            background-color: var(--success_bg);
            color: var(--success);
            border-left: 3px solid var(--success);
            display: block;
        }

        .nft-rescue-container .step-result.error {
            background-color:  var(--danger_bg);
            color: var(--danger);
            border-left: 3px solid var(--danger);
            display: block;
        }

        .nft-rescue-container .simulation-summary {
            background-color:  var(--border-color);
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
        }

        .nft-rescue-container .summary-success {
            border-left: 4px solid var(--success);
            background-color: var(--success_bg);
        }

        .nft-rescue-container .summary-error {
            border-left: 4px solid var(--danger);
            background-color: var(--danger_bg);
        }

        .nft-rescue-container .summary-title {
            font-weight: 600;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .nft-rescue-container .summary-success .summary-title {
            color: var(--success);
        }

        .nft-rescue-container .summary-error .summary-title {
            color: var(--danger);
        }

        .nft-rescue-container .summary-details {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }

        .nft-rescue-container .summary-item {
            display: flex;
            flex-direction: column;
        }

        .nft-rescue-container .summary-label {
            font-size: 14px;
            color: var(--color-text-muted);
        }

        .nft-rescue-container .summary-value {
            font-weight: 600;
            margin-top: 5px;
        }

        .nft-rescue-container .transaction-status {
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

        .nft-rescue-container .status-pending {
            background-color: var(--warning_bg);
            color: var(--warning);

        }

        .nft-rescue-container .status-success {
            background-color: var(--success_bg);
            color: var(--success);
        }

        .nft-rescue-container .status-failed {
            background-color: var(--danger_bg);
            color: var(--danger);
        }

        .nft-rescue-container .hidden {
            display: none;
    
        }

        .CaNameDisDiv{
           color: var(--success);
           background-color: var(--success_bg);
           margin-top: 10px;
           padding: 5px;
           border-radius: 5px;
           display:inline-block;
           margin-bottom: 1rem;
        }

        @media (max-width: 768px) {

            
            .nft-rescue-container .nav-links {
                display: none;
            }
            
            .nft-rescue-container .input-group {
                flex-direction: column;
            }
        }


    </style>

    ${await pageHeader({
      haveBack: true,
      page: "home",
      controller: "site",
      title: "NFT Rescue",
      desc: "Rescue Nfts from compromsied wallet.",
    })}

    <div class="nft-rescue-container">

        <div class="preRequ_div"> 
           <h2 class="card-title">Rescue Terms and Conditions</h2>
           <div>
              <button class="btn-primary btn" id="readPrerequisites">Read</button>
              &nbsp;
              <button class="btn-success btn" id="readPrerequisites">
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



        <!-- Wallet Configuration Section -->
        <section class="card active" id="step1">
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
                    <div class="wallet-address" id="compromisedAddress">Not configured</div>
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
                        <span class="wallet-title">Sponsor Wallet</span>
                    </div>
                    <div class="wallet-address" id="sponsorAddress">Not Configured</div>
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

        <!-- RPC & NFT Transfer Section -->
        <section class="card active" id="step2">
            <div class="card-header">
                <h2 class="card-title">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  style="width: 25px; height: 25px;">
                        <path d="M9 3L5 6.99H8V14H10V6.99H13L9 3ZM16 17.01V10H14V17.01H11L15 21L19 17.01H16Z" fill="currentColor"/>
                    </svg>
                    Network
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

        <!-- Enhanced Transaction Simulation Section -->
        <section class="card active" id="step3">
            <div class="card-header">
                <h2 class="card-title">
                    Transaction Details
                </h2>
            </div>

            <label class="form-label">NFT Contract Address</label>
            <div class="input-group">
                <input type="text" class="form-control" id="nftContractInputTag" placeholder="Nft contract address." value="">
                <button class="btn btn-primary" id="verifyNftAddress">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M13 13L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    Verify
                </button>
            </div>

            <div class="CaNameDisDiv hidden" id="nftNameDisplay">
                NFT Name: <span id="nftNameValue"></span>
            </div>

            <br>
            
            <div class="form-group">
                <label class="form-label">Transaction Data</label>
                <textarea class="form-control" id="nftTransactionDataTextarea" rows="5" placeholder="Enter transaction data for NFT transaction"></textarea>
            </div>
            
            <button class="btn btn-primary" id="simulateBtn">
                Run Simulation
            </button>
            
            <!-- Simulation Steps -->
            <div class="simulation-steps" id="simulationSteps">
                
                <div class="simulation-step">
                    <div class="step-icon" id="step1Icon">
                        1
                    </div>
                    <div class="step-content">
                        <div class="step-title">Transaction Simulation</div>
                        <div class="step-description">Simulating transaction execution on the blockchain</div>
                        <div class="step-result hidden" id="simulateTxResult">Error</div>
                    </div>
                </div>
                
                <div class="simulation-step">
                    <div class="step-icon" id="step2Icon">
                        2
                    </div>
                    <div class="step-content">
                        <div class="step-title">Gas Fee Estimation</div>
                        <div class="step-description">Calculating gas fees for transaction execution</div>
                        <div class="step-result hidden" id="simulateGasResult">Error</div>
                    </div>
                </div>


                <div class="simulation-step">
                    <div class="step-icon" id="step3Icon">
                        3
                    </div>
                    <div class="step-content">
                        <div class="step-title">Service Fee Calculation</div>
                        <div class="step-description">Check the sponsor wallet’s USDT service-fee balance in the rescue network.</div>
                        <div class="step-result hidden" id="simulateServiceFeeResult">Error</div>
                    </div>
                </div>

            </div>
        
        </section>

        <!-- Send Transaction Section -->
        <section class="card active" id="step4">
            <div class="card-header">
                <h2 class="card-title">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="25" height="25" >
                        <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                    </svg>
                    Send Transaction
                </h2>
            </div>
        
            
            <button class="btn btn-primary" id="sendTransaction">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                </svg>
                Send Transaction
            </button>
            
            <div class="transaction-status status-pending hidden" id="transactionStatus">
                <span>Transaction pending...</span>
            </div>
            
            <div class="action-buttons">
                <div></div>
                <button class="btn btn-primary" id="newTransaction">
                    Make a New Transaction
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </section>
  
    </div>


  `;

  return nftRescuePageHtml;
}

export { nftRescuePageLayout };
