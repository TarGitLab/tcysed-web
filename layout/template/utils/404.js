async function render404(data) {
  return `
    <style>
        .container-404 {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: var(--color-body-bg);
            padding: 2rem;
        }

        .container-404 .error-code {
            font-size: 6rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--color-primary);
        }

        .container-404 h1 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: var(--white);
        }

        .container-404 p {
            margin-bottom: 2rem;
            color: var(--color-text-lighter);
        }

        .container-404 .home-btn {
            display: inline-block;
            padding: 0.8rem 1.5rem;
            background: var(--color-primary);
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .container-404 .home-btn:hover {
            background: var(--color-primary);
            transform: translateY(-2px);
        }

        .container-404 .animation {
            margin: 2rem auto;
            width: 100px;
            height: 100px;
            position: relative;
        }

        .container-404 .circle {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 3px solid transparent;
            border-top: 3px solid var(--color-primary);
            border-radius: 50%;
            animation: spin 1.5s linear infinite;
        }

        .container-404 .circle:nth-child(2) {
            width: 80%;
            height: 80%;
            top: 10%;
            left: 10%;
            border-top: 3px solid var(--accent-success);
            animation: spin 1s linear infinite reverse;
        }

        @keyframes spin {
            0% {
            transform: rotate(0deg);
            }
            100% {
            transform: rotate(360deg);
            }
        }

        @media (max-width: 480px) {
            .container-404 .error-code {
            font-size: 4rem;
            }

            .container-404 h1 {
            font-size: 1.5rem;
            }
        }
    </style>
    <div class="container-404">
        <div class="animation">
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
        </p>
        <button class="home-btn" id="home_404_btn" style="color:var(--white); data-controller="site" data-page="home"">Return Home</button>
    </div>

  `;
}

export { render404 };
