function getSkeleton(structure = 1) {
    let animationCss = `
                
            .skeleton {
                background: linear-gradient(90deg, var(--color-primary-gradient-skeleton-start), var(--color-primary-gradient-skeleton-center), var(--color-primary-gradient-skeleton-end));
                background-size: 200% 100%;
                animation: loading 3s infinite;
                border-radius: 4px;
            }
            
            @keyframes loading {
                0% {
                    background-position: 200% 0;
                }
                100% {
                    background-position: -200% 0;
                }
            }

            .skeleton-container{
                width: 100%;
            }
        
        `;


    let structure_4_card = `
        <div class="card">
            <div class="skeleton-image skeleton"></div>
            <div class="card-content">
                <div class="skeleton-title skeleton"></div>
                <div class="skeleton-text short skeleton"></div>
                <div class="skeleton-text medium skeleton"></div>
                <div class="skeleton-price skeleton"></div>
                <div class="skeleton-button skeleton"></div>
            </div>
        </div>
    `;

    const structures = {
      1: {
        name: "Blog Layout",
        html: `
                <div class="skeleton-container structure-1">
                    <div class="skeleton-header skeleton"></div>
                    <div class="skeleton-meta skeleton"></div>
                    <div class="skeleton-image skeleton"></div>
                    <div class="skeleton-text short skeleton"></div>
                    <div class="skeleton-text medium skeleton"></div>
                    <div class="skeleton-text long skeleton"></div>
                    <div class="skeleton-text short skeleton"></div>
                    <div class="skeleton-text medium skeleton"></div>
                    <div class="skeleton-tags">
                        <div class="skeleton-tag skeleton"></div>
                        <div class="skeleton-tag skeleton"></div>
                        <div class="skeleton-tag skeleton"></div>
                    </div>
                </div>`,
        css: `
                            ${animationCss}
                /* Structure 1: Blog Layout */
                .structure-1 .skeleton-header {
                    height: 40px;
                    width: 60%;
                    margin-bottom: 30px;
                }
                
                .structure-1 .skeleton-meta {
                    height: 20px;
                    width: 30%;
                    margin-bottom: 20px;
                }
                
                .structure-1 .skeleton-image {
                    height: 300px;
                    width: 100%;
                    margin-bottom: 25px;
                    border-radius: 8px;
                }
                
                .structure-1 .skeleton-text {
                    height: 16px;
                    margin-bottom: 12px;
                }
                
                .structure-1 .skeleton-text.short {
                    width: 90%;
                }
                
                .structure-1 .skeleton-text.medium {
                    width: 95%;
                }
                
                .structure-1 .skeleton-text.long {
                    width: 98%;
                }
                
                .structure-1 .skeleton-tags {
                    display: flex;
                    gap: 10px;
                    margin-top: 25px;
                }
                
                .structure-1 .skeleton-tag {
                    height: 30px;
                    width: 80px;
                    border-radius: 15px;
                }`,
      },
      2: {
        name: "Dashboard Layout",
        html: `
                <div class="skeleton-container structure-2">
                    <div class="skeleton-nav skeleton"></div>
                    <div class="skeleton-cards">
                        <div class="skeleton-card skeleton"></div>
                        <div class="skeleton-card skeleton"></div>
                        <div class="skeleton-card skeleton"></div>
                        <div class="skeleton-card skeleton"></div>
                    </div>
                    <div class="skeleton-chart skeleton"></div>
                    <div class="skeleton-table skeleton"></div>
                </div>`,
        css: `
                            ${animationCss}
                /* Structure 2: Dashboard Layout */
                .structure-2 .skeleton-nav {
                    height: 50px;
                    width: 100%;
                    margin-bottom: 30px;
                    border-radius: 8px;
                }
                
                .structure-2 .skeleton-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }
                
                .structure-2 .skeleton-card {
                    height: 150px;
                    border-radius: 8px;
                }
                
                .structure-2 .skeleton-chart {
                    height: 300px;
                    width: 100%;
                    margin-bottom: 30px;
                    border-radius: 8px;
                }
                
                .structure-2 .skeleton-table {
                    height: 200px;
                    width: 100%;
                    border-radius: 8px;
                }`,
      },
      3: {
        name: "E-commerce Layout",
        html: `
                <div class="skeleton-container structure-3">
                    <div class="skeleton-hero skeleton"></div>
                    <div class="skeleton-section-title skeleton"></div>
                    <div class="skeleton-products">
                        <div class="skeleton-product skeleton"></div>
                        <div class="skeleton-product skeleton"></div>
                        <div class="skeleton-product skeleton"></div>
                        <div class="skeleton-product skeleton"></div>
                    </div>
                    <div class="skeleton-section-title skeleton"></div>
                    <div class="skeleton-features">
                        <div class="skeleton-feature skeleton"></div>
                        <div class="skeleton-feature skeleton"></div>
                        <div class="skeleton-feature skeleton"></div>
                        <div class="skeleton-feature skeleton"></div>
                    </div>
                    <div class="skeleton-footer skeleton"></div>
                </div>`,
        css: `
                            ${animationCss}
                /* Structure 3: E-commerce Layout */
                .structure-3 .skeleton-hero {
                    height: 400px;
                    width: 100%;
                    margin-bottom: 40px;
                    border-radius: 10px;
                }
                
                .structure-3 .skeleton-section-title {
                    height: 30px;
                    width: 40%;
                    margin-bottom: 25px;
                }
                
                .structure-3 .skeleton-products {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 25px;
                    margin-bottom: 40px;
                }
                
                .structure-3 .skeleton-product {
                    height: 280px;
                    border-radius: 8px;
                }
                
                .structure-3 .skeleton-features {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 40px;
                }
                
                .structure-3 .skeleton-feature {
                    height: 100px;
                    width: 23%;
                    border-radius: 8px;
                }
                
                .structure-3 .skeleton-footer {
                    height: 200px;
                    width: 100%;
                    border-radius: 8px;
                }`,
      },
      4: {
        name: "Product Card",
        html: `

         <div class="skeleton-container structure-4">
           ${structure_4_card}
           ${structure_4_card}
           ${structure_4_card}
           ${structure_4_card}
           ${structure_4_card}
           ${structure_4_card}
           ${structure_4_card}
           ${structure_4_card}
           ${structure_4_card}
           ${structure_4_card}
         <div>
        `,
        css: `
            ${animationCss}
        /* Structure 1: Product Card */
        .structure-4 {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
        }

        .structure-4 .skeleton-image {
            height: 200px;
            width: 100%;
        }
        
        .structure-4 .card-content {
            padding: 20px;
        }
        
        .structure-4 .skeleton-title {
            height: 24px;
            width: 70%;
            margin-bottom: 15px;
        }
        
        .structure-4 .skeleton-text {
            height: 14px;
            margin-bottom: 10px;
        }
        
        .structure-4 .skeleton-text.short {
            width: 90%;
        }
        
        .structure-4 .skeleton-text.medium {
            width: 80%;
        }
        
        .structure-4 .skeleton-price {
            height: 20px;
            width: 40%;
            margin: 15px 0;
        }
        
        .structure-4 .skeleton-button {
            height: 40px;
            width: 100%;
            border-radius: 5px;
        }`,
      },
    };

    let fullCssAndHtml = `
            <style>
                ${structures[structure].css}
            </style>
            ${structures[structure].html}
        `;
    return fullCssAndHtml;
}

export { getSkeleton };
