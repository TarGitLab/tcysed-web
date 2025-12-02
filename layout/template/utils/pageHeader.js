async function pageHeader(data){

    let previousController = data.controller || "";
    let previousPage = data.page || "";
    let haveBackBtn = data.haveBack || false;
    
    let pageTitle = data.title || "";
    let pageDesc = data.desc || "";

    let backBtnDisplayStyle = "none";
    if(haveBackBtn){
       backBtnDisplayStyle = "block";
    }

    let pageHeaderHtml = `
        <style>

        .page-header {
            margin-bottom: 32px;
            display: flex;
            gap: 1rem;
            align-items: center;

            background: var(--black);
            padding: 1rem 1.5rem;
            border-radius: 1rem;
        }

        .page-header-title {
            font-size: 28px;
            font-weight: 700;
            color: var(--white);
            margin-bottom: 8px;
        }
        /* Back Button Styles */
        .back-button-container {
            margin-right: 16px;
        }

        .page-header-subtitle {
            color: var(--color-text-light);
            font-size: 16px;
        }

        .back-btn {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 5px 10px;
            background-color: transparent;
            border: 1px solid var(--color-card-border);
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            color: var(--color-text-light);
            transition: all 0.2s ease;
        }

        .back-btn:hover {
            background-color: var(--color-hover-light);
            color: var(--color-text);
            border-color: var(--color-primary);
        }

        .back-btn svg {
            width: 16px;
            height: 16px;
        }

        /* Responsive adjustments for back button */
        @media (max-width: 768px) {
            .back-button-container {
            margin-right: 12px;
            }

            .back-btn span {
            display: none;
            }

            .back-btn {
            padding: 8px 12px;
            }
        }

        @media (max-width: 768px) {

            .page-header-title {
                font-size: 24px;
            }
        }
        </style>


        <div class="page-header">

            <div class="back-button-container" style="display:${backBtnDisplayStyle};">
                <button class="back-btn"  id="pageBackBtn" data-controller="${previousController}" data-page="${previousPage}">
                    <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    >
                    <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    <span>Back</span>
                </button>
            </div>

            <div>
            <h1 class="page-header-title">${pageTitle}</h1>
            <p class="page-header-subtitle">
                ${pageDesc}
            </p>
            </div>
        </div>

    `;

    return pageHeaderHtml;
}


export { pageHeader };