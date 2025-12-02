import { pageHeader } from "../../utils/pageHeader.js";

async function settingsTemplate(data = {}) {

    let settingsHtml = `
    
        <style>
            /* Settings page specific styles */
            .settings-container {
              width: 1000px;
              margin: 0 auto;
            }

            .settings-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
              gap: 24px;
            }

            .settings-card {
              background-color: var(--color-sidebar-bg);
              border: 1px solid var(--color-card-border);
              border-radius: 12px;
              padding: 24px;
              transition: all 0.2s ease;
              cursor: pointer;
              height: 100%;
              display: flex;
              flex-direction: column;
            }

            .settings-card:hover {
              transform: translateY(-4px);
              border-color: var(--color-primary);
            }

            .settings-card-icon {
              width: 48px;
              height: 48px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 16px;
              background: linear-gradient(
                135deg,
                var(--color-primary-gradient-start),
                var(--color-primary-gradient-end)
              );
            }

            .settings-card-icon svg{
              color: var(--white);
            }

            .settings-card-title {
              font-size: 18px;
              font-weight: 600;
              color: var(--white);
              margin-bottom: 8px;
            }

            .settings-card-description {
              color: var(--color-text-light);
              font-size: 14px;
              line-height: 1.5;
              flex-grow: 1;
            }

            .settings-card-footer {
              margin-top: 16px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .settings-card-status {
              font-size: 12px;
              padding: 4px 8px;
              border-radius: 12px;
              background-color: var(--color-text-lighter);
              color: var(--white);
            }

            .settings-card-status.verified {
              background-color: var(--success_bg);
              color: var(--success);
            }

            .settings-card-status.pending {
              background-color: var(--warning_bg);
              color: var(--warning);
            }

            .settings-card-arrow {
              color: var(--color-text-light);
              transition: transform 0.2s ease;
            }

            .settings-card:hover .settings-card-arrow {
              transform: translateX(4px);
              color: var(--color-primary);
            }

            /* Responsive adjustments */
            @media (max-width: 768px) {
              .settings-grid {
                grid-template-columns: 1fr;
              }

            }
          </style>
          <div class="settings-container">

            ${await pageHeader({
              haveBack: false,
              title: "Settings",
              desc: "Manage your account settings and preferences",
            })}

            <div class="settings-grid">

              <!-- Account Card -->
              <div class="settings-card" >
                <div class="settings-card-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 class="settings-card-title">Account</h3>
                <p class="settings-card-description">
                  Manage your personal information, email preferences, and
                  account details.
                </p>
                <div class="settings-card-footer">
                  <span class="settings-card-status verified">Verified</span>
                  <svg
                    class="settings-card-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Security Card -->
              <div class="settings-card">
                <div class="settings-card-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h3 class="settings-card-title">Security</h3>
                <p class="settings-card-description">
                  Update your password, enable two-factor authentication, and
                  manage security settings.
                </p>
                <div class="settings-card-footer">
                  <span class="settings-card-status">2FA</span>
                  <svg
                    class="settings-card-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Preference Card -->
              <div class="settings-card">
                <div class="settings-card-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path
                      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                    ></path>
                  </svg>
                </div>
                <h3 class="settings-card-title">Preference</h3>
                <p class="settings-card-description">
                  Customize your interface, notification settings, and display
                  preferences.
                </p>
                <div class="settings-card-footer">
                  <span class="settings-card-status">Custom</span>
                  <svg
                    class="settings-card-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              <!-- API Card -->
              <div class="settings-card">
                <div class="settings-card-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    ></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 class="settings-card-title">API</h3>
                <p class="settings-card-description">
                  Manage API keys, access tokens, and integration settings for
                  developers.
                </p>
                <div class="settings-card-footer">
                  <span class="settings-card-status">0 Keys Active</span>
                  <svg
                    class="settings-card-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Verification Card -->
              <div class="settings-card">
                <div class="settings-card-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 class="settings-card-title">Verification</h3>
                <p class="settings-card-description">
                  Complete identity verification to access all platform
                  features.
                </p>
                <div class="settings-card-footer">
                  <span class="settings-card-status pending">Pending</span>
                  <svg
                    class="settings-card-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Offers Card -->
              <div class="settings-card">
                <div class="settings-card-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    ></path>
                  </svg>
                </div>
                <h3 class="settings-card-title">Offers</h3>
                <p class="settings-card-description">
                  View and manage special offers, promotions, and referral
                  programs.
                </p>
                <div class="settings-card-footer">
                  <span class="settings-card-status">0 Active</span>
                  <svg
                    class="settings-card-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Wallets Card -->
              <div class="settings-card">
                <div class="settings-card-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4z"></path>
                  </svg>
                </div>
                <h3 class="settings-card-title">Wallets</h3>
                <p class="settings-card-description">
                  Manage connected wallets, view balances, and transaction
                  history.
                </p>
                <div class="settings-card-footer">
                  <span class="settings-card-status">0 Connected</span>
                  <svg
                    class="settings-card-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Rescue Wallets Card -->
              <div class="settings-card" data-controller="site" data-page="rescueWallets">
                <div class="settings-card-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                    ></path>
                  </svg>
                </div>
                <h3 class="settings-card-title">Rescue Wallets</h3>
                <p class="settings-card-description">
                  Recover access to lost or inaccessible wallets with recovery
                  options.
                </p>
                <div class="settings-card-footer">
                  <span class="settings-card-status">Available</span>
                  <svg
                    class="settings-card-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

    `;

    return settingsHtml;

}

export { settingsTemplate };