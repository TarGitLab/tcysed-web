import { pageHeader } from "../../utils/pageHeader.js";

async function rescueWalletsTemplate(data) {
  let rescueWalletsHtml = `

        <style>
            .rescue-wallets-page-container .rescue-wallets-container {
                width: 100%;
                margin: 0 auto;
            }

            .rescue-wallets-page-container .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 14px;
            }

            .rescue-wallets-page-container .btn-primary {
                background: var(--color-primary);
                color: var(--white);
            }

            .rescue-wallets-page-container .btn-primary:hover {
                transform: translateY(-2px);
                opacity: 0.9;
            }

            .rescue-wallets-page-container .btn-outline {
                background: transparent;
                color: var(--color-sidebar-border);
                border: 1px solid var(--border-color);
            }

            .rescue-wallets-page-container .btn-outline:hover {
                background: var(--color-body-bg);
            }

            .rescue-wallets-page-container .btn-danger {
                background: var(--accent-danger);
                color: var(--white);
            }

            .rescue-wallets-page-container .btn-danger:hover {
                opacity: 0.9;
                transform: translateY(-2px);
            }

            .rescue-wallets-page-container .btn-success {
                background: var(--accent-success);
                color: var(--white);
            }

            .rescue-wallets-page-container .btn-success:hover {
                opacity: 0.9;
                transform: translateY(-2px);
            }

            .rescue-wallets-page-container .rescue-wallets-main-content {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 25px;
            }

            @media (max-width: 1200px) {
                .rescue-wallets-page-container .rescue-wallets-main-content {
                    grid-template-columns: 1fr 1fr;
                }
            }

            @media (max-width: 768px) {
                .rescue-wallets-page-container .rescue-wallets-main-content {
                    grid-template-columns: 1fr;
                }
            }

            .rescue-wallets-page-container .section {
                background: var(--black);
                border-radius: 16px;
                overflow: hidden;
                border: 1px solid var(--border-color);
            }

            .rescue-wallets-page-container .section-header {
                padding: 20px;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .rescue-wallets-page-container .section-title {
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 18px;
                font-weight: 600;
                color: var(--white);
            }

            .rescue-wallets-page-container .section-icon {
                width: 36px;
                height: 36px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .rescue-wallets-page-container .safe .section-icon {
                background: var(--success_bg);
                color: var(--accent-success);
            }

            .rescue-wallets-page-container .compromised .section-icon {
                background: var(--danger_bg);
                color: var(--accent-danger);
            }

            .rescue-wallets-page-container .sponsor .section-icon {
                background: var(--primary_bg);
                color: var(--color-primary);
            }

            .rescue-wallets-page-container .section-body {
                padding: 20px;
            }

            .rescue-wallets-page-container .wallet-list {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .rescue-wallets-page-container .wallet-item {
                background: var(--color-body-bg);
                border-radius: 12px;
                padding: 18px;
                border: 1px solid var(--border-color);
                transition: all 0.3s;
             }

            .rescue-wallets-page-container .wallet-item:hover {
                transform: translateY(-2px);
                border-color: var(--color-primary);
            }

            .rescue-wallets-page-container .wallet-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }

            .rescue-wallets-page-container .wallet-name {
                font-weight: 600;
                font-size: 16px;
                color: var(--white);
            }

            .rescue-wallets-page-container .wallet-actions {
                display: flex;
                gap: 8px;
            }

            .rescue-wallets-page-container .wallet-address {
                font-family: monospace;
                font-size: 14px;
                color: var(--color-sidebar-border);
                word-break: break-all;
                margin-bottom: 10px;
                padding: 10px;
                border-radius: 6px;
                border: 1px dashed var(--border-color);
             }

            .rescue-wallets-page-container .wallet-private-key {
                font-family: monospace;
                font-size: 14px;
                color: var(--color-sidebar-border);
                word-break: break-all;
                margin-bottom: 10px;
                padding: 10px;
                border-radius: 6px;
                border: 1px dashed var(--border-color);
                position: relative;
            }

            .rescue-wallets-page-container .private-key-mask {
                filter: blur(5px);
                user-select: none;
            }

            .rescue-wallets-page-container .toggle-private-key {
                border: none;
                color: var(--color-sidebar-border);
                cursor: pointer;
                border-radius: 4px;
                padding: 4px 8px;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 4px;
                background: var(--black);
            }

            .rescue-wallets-page-container .wallet-privatekey-header_div{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .rescue-wallets-page-container .wallet-meta {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: var(--color-text-lighter);
            }

            .rescue-wallets-page-container .empty-state {
                text-align: center;
                padding: 40px 20px;
                color: var(--color-text-lighter);
            }

            .rescue-wallets-page-container .empty-icon {
                font-size: 48px;
                margin-bottom: 15px;
                opacity: 0.5;
            }

            .rescue-wallets-page-container .empty-icon svg{
                color: var(--white);
            }

            .rescue-wallets-page-container .security-notice {
                background: var(--danger_bg);
                border-left: 4px solid var(--accent-danger);
                padding: 15px;
                margin: 20px 0;
                border-radius: 0 8px 8px 0;
                color: var(--white);
            }

            .rescue-wallets-page-container .info-notice {
                background: var(--primary_bg);
                border-left: 4px solid var(--color-primary);
                padding: 15px;
                margin: 20px 0;
                color: var(--white);
                border-radius: 0 8px 8px 0;
            }

            .rescue-wallets-page-container .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(5px);
            }

            .rescue-wallets-page-container .modal-content {
                background: var(--black);
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                padding: 25px;
                border: 1px solid var(--border-color);
            }

            .rescue-wallets-page-container .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid var(--border-color);
            }

            .rescue-wallets-page-container .modal-title {
                font-size: 20px;
                font-weight: 600;
                color: var(--white);
            }

            .rescue-wallets-page-container .close-btn {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--color-sidebar-border);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .rescue-wallets-page-container .form-group {
                margin-bottom: 20px;
            }

            .rescue-wallets-page-container label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: var(--color-sidebar-border);
            }

            .rescue-wallets-page-container input,
            .rescue-wallets-page-container textarea {
                width: 100%;
                padding: 12px 15px;
                background: var(--color-body-bg);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                font-size: 14px;
                transition: all 0.3s;
                color: var(--white);
            }

            .rescue-wallets-page-container input:focus,
            .rescue-wallets-page-container textarea:focus {
                outline: none;
                border-color: var(--color-primary);
                box-shadow: 0 0 0 3px var(--primary_bg);
            }

            .rescue-wallets-page-container textarea {
                min-height: 100px;
                resize: vertical;
                font-family: monospace;
            }

            .rescue-wallets-page-container .action-buttons {
                display: flex;
                gap: 10px;
                margin-top: 25px;
             }

            .rescue-wallets-page-container footer {
                text-align: center;
                margin-top: 40px;
                padding: 20px;
                color: var(--color-text-lighter);
                font-size: 14px;
                border-top: 1px solid var(--border-color);
             }

            .rescue-wallets-page-container .status-indicator {
                display: flex;
                align-items: center;
                gap: 8px;
                background: var(--success_bg);
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 14px;
                color: var(--accent-success);
                border: 1px solid var(--success_bg);
            }

            .rescue-wallets-page-container .status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: var(--accent-success);
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }

            .rescue-wallets-page-container .wallet-count {
                background: var(--color-body-bg);
                color: var(--color-sidebar-border);
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
            }

            .rescue-wallets-page-container .btn-icon {
                padding: 8px;
                border-radius: 6px;
                background: transparent;
                border: none;
                color: var(--color-sidebar-border);
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .rescue-wallets-page-container .btn-icon:hover {
                background: var(--color-body-bg);
                color: var(--white);
            }

            .rescue-wallets-page-container .btn-sm {
                padding: 6px 12px;
                font-size: 12px;
            }

            .rescue-wallets-page-container .icon {
                width: 16px;
                height: 16px;
            }
            .rescue-wallets-page-container .wallet_address_label{
               color: var(--color-text-lighter);   
               margin: 10px 00px; 
               font-size: 0.9rem;
            }
            .rescue-wallets-page-container .wallet-privatekey_label{
               color: var(--color-text-lighter);    
               margin: 10px 00px;
               font-size: 0.9rem;
            }

             /* Rescue Selection Styles */
            .rescue-wallets-page-container .rescue-selection {
                background: var(--color-body-bg);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
                border: 1px solid var(--border-color);
            }

            .rescue-wallets-page-container .rescue-selection-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }

            .rescue-wallets-page-container .rescue-selection-title {
                font-size: 16px;
                font-weight: 600;
                color: var(--white);
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .rescue-wallets-page-container .rescue-selection-icon {
                width: 20px;
                height: 20px;
                color: var(--color-primary);
            }

            .rescue-wallets-page-container .rescue-selection-content {
                display: flex;
                gap: 12px;
                align-items: center;
            }

            .rescue-wallets-page-container .rescue-select {
                flex: 1;
                padding: 12px 15px;
                background: var(--black);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                color: var(--white);
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s;
            }

            .rescue-wallets-page-container .rescue-select:focus {
                outline: none;
                border-color: var(--color-primary);
                box-shadow: 0 0 0 3px var(--primary_bg);
            }

            .rescue-wallets-page-container .rescue-select option {
                background: var(--black);
                color: var(--white);
                padding: 10px;
            }

            .rescue-wallets-page-container .rescue-save-btn {
                padding: 12px 20px;
                background: var(--color-primary);
                color: var(--white);
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
            }

            .rescue-wallets-page-container .rescue-save-btn:hover {
                transform: translateY(-2px);
                opacity: 0.9;
            }

            .rescue-wallets-page-container .rescue-save-btn:disabled {
                cursor: not-allowed;
                transform: none;
                opacity: 0.6;
            }

            .rescue-wallets-page-container .rescue-save-btn.saved {
                background: var(--accent-success);
            }

        </style>

        <div class="rescue-wallets-page-container">

            ${await pageHeader({
              haveBack: true,
              controller: "site",
              page: "settings",
              title: "Rescue Wallets Settings",
              desc: "Manage your safe, compromised, and sponsor wallet addresses.",
            })}
            
            <div class="rescue-wallets-container">
                <div class="rescue-wallets-main-content">
                    <!-- Safe Wallets Section -->
                    <div class="section safe">
                    <div class="section-header">
                        <div class="section-title">
                        <div class="section-icon">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1ZM12,7C13.1,7 14,7.9 14,9C14,10.1 13.1,11 12,11C10.9,11 10,10.1 10,9C10,7.9 10.9,7 12,7ZM18,13.5C16.53,14.12 15.28,15.09 14.31,16.31L13.43,15.43C13.82,14.27 14.85,13.39 16.08,13.14C16.05,13.09 16.03,13.04 16,13C15.42,12.25 14.75,11.58 14,11C14,10.96 13.95,10.95 13.91,10.93C13.73,9.92 13.01,9.11 12,9.11C10.99,9.11 10.27,9.92 10.09,10.93C10.05,10.95 10,10.96 10,11C9.25,11.58 8.58,12.25 8,13C7.97,13.04 7.95,13.09 7.92,13.14C9.15,13.39 10.18,14.27 10.57,15.43L9.69,16.31C8.72,15.09 7.47,14.12 6,13.5V6.3L12,3.19L18,6.3V13.5Z"
                            />
                            </svg>
                        </div>
                        <span>Safe Wallets</span>
                        <div class="wallet-count" id="safeCount">2</div>
                        </div>
                        <button class="btn btn-success btn-sm" id="addSafeWallet">
                        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                        <span>Add</span>
                        </button>
                    </div>
                    <div class="section-body">

                        <div class="rescue-selection">  
                            <div class="rescue-selection-header">
                                <div class="rescue-selection-title">
                                    <svg class="rescue-selection-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                                    </svg>
                                    <span>Destination for Rescued Funds</span>
                                </div>
                            </div>
                            
                            <div class="rescue-selection-content">
                                <select class="rescue-select" id="selectedSafeWallet">
                                    <option value="">Select a safe wallet...</option>
                                    <!-- Safe wallets will be populated here -->
                                </select>
                                <button class="rescue-save-btn" id="saveSafeSelection" disabled>
                                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17,3H5C3.89,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V7L17,3M19,19H5V5H16.17L19,7.83V19M12,12C10.34,12 9,13.34 9,15C9,16.66 10.34,18 12,18C13.66,18 15,16.66 15,15C15,13.34 13.66,12 12,12M6,6H15V10H6V6Z" />
                                    </svg>
                                    <span>Save</span>
                                </button>
                            </div>

                        </div>

                        <div class="info-notice">
                        <p>
                            These are your secure wallet addresses where rescued funds will
                            be transferred.
                        </p>
                        </div>
                        <div class="wallet-list" id="safeWalletsList">
                        <!-- Safe wallets will be dynamically added here -->
                        </div>
                    </div>
                    </div>

                    <!-- Compromised Wallets Section -->
                    <div class="section compromised">
                    <div class="section-header">
                        <div class="section-title">
                        <div class="section-icon">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1ZM10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"
                            />
                            </svg>
                        </div>
                        <span>Compromised Wallets</span>
                        <div class="wallet-count" id="compromisedCount">1</div>
                        </div>
                        <button class="btn btn-danger btn-sm" id="addCompromisedWallet">
                        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                        <span>Add</span>
                        </button>
                    </div>
                    <div class="section-body">

                            <div class="rescue-selection">
                                <div class="rescue-selection-header">
                                    <div class="rescue-selection-title">
                                        <svg class="rescue-selection-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V11H3V9H5V4C5,2.89 5.89,2 7,2H17C18.1,2 19,2.9 19,4V9H21Z" />
                                        </svg>
                                        <span>Source of Funds to Rescue</span>
                                    </div>
                                </div>
                                <div class="rescue-selection-content">
                                    <select class="rescue-select" id="selectedCompromisedWallet">
                                        <option value="">Select a compromised wallet...</option>
                                        <!-- Compromised wallets will be populated here -->
                                    </select>
                                    <button class="rescue-save-btn" id="saveCompromisedSelection" disabled>
                                        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17,3H5C3.89,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V7L17,3M19,19H5V5H16.17L19,7.83V19M12,12C10.34,12 9,13.34 9,15C9,16.66 10.34,18 12,18C13.66,18 15,16.66 15,15C15,13.34 13.66,12 12,12M6,6H15V10H6V6Z" />
                                        </svg>
                                        <span>Save</span>
                                    </button>
                                </div>
                            </div>

                        <div class="security-notice">
                        <p>
                            <strong>Security Alert:</strong> These wallets have been
                            compromised by sweeper bots. Handle with extreme caution.
                        </p>
                        </div>
                        <div class="wallet-list" id="compromisedWalletsList">
                        <!-- Compromised wallets will be dynamically added here -->
                        </div>
                    </div>
                    </div>

                    <!-- Sponsor Wallets Section -->
                    <div class="section sponsor">
                    <div class="section-header">
                        <div class="section-title">
                        <div class="section-icon">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2ZM12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20ZM11,16H13V18H11V16ZM13,10H11V14H13V10Z"
                            />
                            </svg>
                        </div>
                        <span>Sponsor Wallets</span>
                        <div class="wallet-count" id="sponsorCount">1</div>
                        </div>
                        <button class="btn btn-primary btn-sm" id="addSponsorWallet">
                        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                        <span>Add</span>
                        </button>
                    </div>
                    <div class="section-body">

                            <div class="rescue-selection">
                                <div class="rescue-selection-header">
                                    <div class="rescue-selection-title">
                                        <svg class="rescue-selection-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                                        </svg>
                                        <span>Gas Fee Provider</span>
                                    </div>
                                </div>
                                <div class="rescue-selection-content">
                                    <select class="rescue-select" id="selectedSponsorWallet">
                                        <option value="">Select a sponsor wallet...</option>
                                        <!-- Sponsor wallets will be populated here -->
                                    </select>
                                    <button class="rescue-save-btn" id="saveSponsorSelection" disabled>
                                        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17,3H5C3.89,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V7L17,3M19,19H5V5H16.17L19,7.83V19M12,12C10.34,12 9,13.34 9,15C9,16.66 10.34,18 12,18C13.66,18 15,16.66 15,15C15,13.34 13.66,12 12,12M6,6H15V10H6V6Z" />
                                        </svg>
                                        <span>Save</span>
                                    </button>
                                </div>
                            </div>

                        <div class="info-notice">
                        <p>
                            These wallets provide ETH for gas fees to execute rescue
                            transactions from compromised wallets.
                        </p>
                        </div>
                        <div class="wallet-list" id="sponsorWalletsList">
                        <!-- Sponsor wallets will be dynamically added here -->
                        </div>
                    </div>
                    </div>
                </div>

                <footer>
                    <p>
                    All data processed locally | We do not store
                    any private keys
                    </p>
                </footer>
                </div>

                <!-- Modal for Adding/Editing Wallets -->
                <div class="modal" id="walletModal">
                <div class="modal-content">
                    <div class="modal-header">
                    <div class="modal-title" id="modalTitle">Add Wallet</div>
                    <button class="close-btn" id="closeModal">
                        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                        />
                        </svg>
                    </button>
                    </div>
                    <form id="walletForm">
                    <input type="hidden" id="walletId" />
                    <input type="hidden" id="walletType" />

                    <div class="form-group">
                        <label for="walletAddress" id="addressLabel">Wallet Address</label>
                        <input
                        type="text"
                        id="walletAddress"
                        placeholder="0x000000000000000000000000000000000000000000"
                        />
                    </div>

                    <div class="form-group" id="privateKeyGroup" style="display: none">
                        <label for="walletPrivateKey" id="privateKeyLabel"
                        >Private Key</label
                        >
                        <textarea
                        id="walletPrivateKey"
                        placeholder="Enter private key"
                        ></textarea>
                    </div>

                    <div class="form-group">
                        <label for="walletName">Wallet Name</label>
                        <input
                        type="text"
                        id="walletName"
                        placeholder="My Wallet"
                        required
                        />
                    </div>

                    <div class="action-buttons">
                        <button type="button" class="btn btn-outline" id="cancelBtn">
                        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                            <path
                            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                            />
                        </svg>
                        <span>Cancel</span>
                        </button>
                        <button type="submit" class="btn btn-primary" id="saveBtn">
                        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                            <path
                            d="M17,3H5C3.89,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V7L17,3M19,19H5V5H16.17L19,7.83V19M12,12C10.34,12 9,13.34 9,15C9,16.66 10.34,18 12,18C13.66,18 15,16.66 15,15C15,13.34 13.66,12 12,12M6,6H15V10H6V6Z"
                            />
                        </svg>
                        <span>Save Wallet</span>
                        </button>
                    </div>
                    </form>
                </div>
            </div> 

        </div>
   
    `;

    return rescueWalletsHtml;
}

export { rescueWalletsTemplate };
