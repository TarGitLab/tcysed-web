async function homeTemplate(data = {}) {
  
  let homeHtml = `
    
         <style>
            /* Featured Section */
            .featured-section {
              margin-bottom: 48px;
            }

            .featured-card {
              position: relative;
              width: 100%;
              height: 280px;
              border-radius: 24px;
              overflow: hidden;
            }

            .featured-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              position: absolute;
              top: 0;
              left: 0;
              filter: blur(4px);
            }

            .featured-card::after {
              content: "";
              position: absolute;
              inset: 0;
              z-index: 1;
            }

            .featured-overlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;

              display: flex;
              align-items: flex-end;
              padding: 40px;
              z-index: 2;
            }

            .featured-content {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .badge {
              display: inline-block;
              background-color: var(--color-feature-badge-bg);
              color: var(--color-feature-text);
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 0.5px;
              width: fit-content;
              backdrop-filter: blur(8px);
            }

            .featured-title {
              font-size: 32px;
              font-weight: 700;
              color: var(--color-feature-text);
            }

            .featured-description {
              font-size: 16px;
              color: var(--color-text-muted);
            }
          </style>

          <!-- Featured Section -->
          <section class="featured-section">
            <div class="featured-card">
              <div class="featured-overlay">
                <div class="featured-content">
                  <span class="badge">Web3 Insight</span>
                  <h2 class="featured-title">Empowering Your Web3 Journey</h2>
                  <p class="featured-description">
                    Built for the decentralized future.
                  </p>
                </div>
              </div>
              <img
                src="./assets/image/site/banner.jpg"
                alt="Featured event"
                class="featured-image"
              />
            </div>
          </section>

          <style>
            .section-title {
              font-size: 28px;
              font-weight: 600;
              color: var(--white);
              margin-bottom: 24px;
              padding: 0 16px;
            }

            .cards-grid {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 24px;
              padding: 0 16px;
            }

            .card {
              background: var(--white);
              border-radius: 12px;
              overflow: hidden;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              display: flex;
              flex-direction: column;
              height: 100%;
              max-width: calc(3 * 350px + 48px);
              cursor: pointer;
            }

            .card:hover {
              transform: translateY(-4px);
              box-shadow: 0 0px 16px var(--color-card-badge-bg);
            }

            .card-image {
              width: 100%;
              height: 200px;
              position: relative;
              display: flex;
              justify-content: center;
              overflow: hidden;
            }

            .card-icon {
              position: absolute;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: var(--white);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              bottom: 16px;
              left: 16px;
            }
            .card-icon img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }

            .card-image-content {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
            }
            .card-image-content img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .card-content {
              padding: 24px;
              flex-grow: 1;
              display: flex;
              flex-direction: column;
            }

            .card-title {
              font-size: 18px;
              font-weight: 600;
              color: var(--black);
              margin-bottom: 8px;
            }

            .card-description {
              font-size: 14px;
              color: var(--color-text-lighter);
              margin-bottom: 16px;
              line-height: 1.5;
              flex-grow: 1;
            }

            .card-tag {
              display: inline-block;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              border: none;
              background-color: var(--color-card-badge-bg);
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
              width: fit-content;
            }

            @media (max-width: 1024px) {
              .cards-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }

            @media (max-width: 768px) {
              .cards-grid {
                grid-template-columns: 1fr;
              }

              .section-title {
                font-size: 24px;
              }

            }
          </style>

          <section class="recently-launched">
            <h1 class="section-title">Recently Launched</h1>

            <div class="cards-grid">

              <div class="card recentLunchedCard" data-controller="rescue" data-page="nftRescue">
                <div class="card-image">
                  <div class="card-icon">
                    <img src="./assets/image/pages/nft_logo.png" alt="NFT Rescue Logo" />
                  </div>
                  <div class="card-image-content">
                    <img src="./assets/image/pages/nft_bg.png" alt="" />
                  </div>
                </div>
                <div class="card-content">
                  <h2 class="card-title">NFT Rescue</h2>
                  <p class="card-description">If a wallet with NFTs is compromised by a sweeper bot, Rescue your NFTs across all EVM networks.</p>
                  <button class="card-tag">EVM</button>
                </div>
              </div>

              <div class="card recentLunchedCard" data-controller="rescue" data-page="erc20Rescue">
                <div class="card-image">
                  <div class="card-icon">
                    <img src="./assets/image/pages/erc-20-token-logo.png" alt="Erc20 Token Rescue Logo" />
                  </div>
                  <div class="card-image-content">
                    <img src="./assets/image/pages/erc-20-rescue-card-bg.png" alt="" />
                  </div>
                </div>
                <div class="card-content">
                  <h2 class="card-title">ERC-20 Token Rescue</h2>
                  <p class="card-description">If a wallet with erc20 token is compromised by a sweeper bot, Rescue your erc20 tokens across all EVM networks.</p>
                  <button class="card-tag">EVM</button>
                </div>
              </div>

            </div>

          </section>
    `;

    return homeHtml;    
}

export { homeTemplate };
