import { pageHeader } from "../../utils/pageHeader.js";

async function contactPageLayout(data = {}) {
  let contactPageHtml = `

    <style>
        /* Contact Page Styles */
        .contact-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Hero Section */
        .contact-hero {
            text-align: center;
            padding: 40px 20px;
            margin-bottom: 40px;
        }

        .contact-hero-title {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 20px;
            background: linear-gradient(90deg, 
                var(--color-primary-gradient-start), 
                var(--color-primary-gradient-center),
                var(--color-primary-gradient-end));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            position: relative;
            display: inline-block;
        }

        .contact-hero-title::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 6px;
            background: linear-gradient(90deg, 
                var(--color-primary-gradient-start), 
                var(--color-primary-gradient-center),
                var(--color-primary-gradient-end));
            border-radius: 3px;
            filter: blur(2px);
        }

        .contact-hero-subtitle {
            font-size: 1.3rem;
            color: var(--color-text-lighter);
            max-width: 700px;
            margin: 0 auto 30px;
            line-height: 1.7;
        }

        .contact-badges {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
            flex-wrap: wrap;
        }

        .contact-badge {
            display: inline-flex;
            align-items: center;
            padding: 10px 22px;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            gap: 10px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            background-color: rgba(255, 255, 255, 0.03);
        }

        .contact-badge i {
            font-size: 1rem;
        }

        .badge-primary {
            background-color: var(--primary_bg);
            color: var(--color-primary);
        }

        .badge-success {
            background-color: var(--success_bg);
            color: var(--success);
        }

        .badge-warning {
            background-color: var(--warning_bg);
            color: var(--warning);
        }

        /* Main Content Layout */
        .contact-main {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 50px;
            margin-top: 30px;
        }

        @media (max-width: 992px) {
            .contact-main {
                grid-template-columns: 1fr;
                gap: 40px;
            }
        }

        /* Contact Info Sidebar */
        .contact-sidebar {
            background-color: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(15px);
            border-radius: 24px;
            padding: 40px;
            border: 1px solid var(--border-color);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
            position: relative;
            overflow: hidden;
        }

        .contact-sidebar::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 6px;
            background: linear-gradient(90deg, 
                var(--color-primary-gradient-start) 0%, 
                var(--color-primary-gradient-center) 50%,
                var(--color-primary-gradient-end) 100%);
            filter: blur(3px);
        }

        .sidebar-title {
            font-size: 2rem;
            margin-bottom: 30px;
            color: var(--color-text-light);
            position: relative;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .sidebar-title::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--color-primary);
            border-radius: 2px;
        }

        /* Social Cards */
        .social-connect {
            margin-bottom: 40px;
        }

        .social-connect-title {
            font-size: 1.3rem;
            margin-bottom: 25px;
            color: var(--color-text-light);
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .social-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        @media (max-width: 480px) {
            .social-grid {
                grid-template-columns: 1fr;
            }
        }

        .social-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px 20px;
            border-radius: 18px;
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
            cursor: pointer;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .social-card:hover {
            background-color: rgba(255, 255, 255, 0.07);
            border-color: var(--color-primary);
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 119, 255, 0.2);
        }

        .social-icon-wrapper {
            width: 70px;
            height: 70px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            background: linear-gradient(135deg, 
                rgba(0, 119, 255, 0.2), 
                rgba(0, 119, 255, 0.1));
            border: 1px solid rgba(0, 119, 255, 0.3);
        }

        .social-card.twitter .social-icon-wrapper {
            background: linear-gradient(135deg, rgba(29, 161, 242, 0.2), rgba(29, 161, 242, 0.1));
            border-color: rgba(29, 161, 242, 0.3);
        }

        .social-card.telegram .social-icon-wrapper {
            background: linear-gradient(135deg, rgba(0, 136, 204, 0.2), rgba(0, 136, 204, 0.1));
            border-color: rgba(0, 136, 204, 0.3);
        }

        .social-details h3 {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: var(--color-text-light);
        }

        .social-details p {
            color: var(--color-text-lighter);
            font-size: 0.9rem;
            line-height: 1.6;
        }

        /* Response Time Section */
        .response-info {
            padding: 30px;
            border-radius: 18px;
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            position: relative;
            overflow: hidden;
            margin-top: 30px;
        }

        .response-info::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, 
                var(--color-primary-gradient-start), 
                var(--color-primary-gradient-end));
        }

        .response-title {
            font-size: 1.3rem;
            margin-bottom: 15px;
            color: var(--color-text-light);
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .response-description {
            color: var(--color-text-lighter);
            font-size: 1rem;
            line-height: 1.7;
            margin-bottom: 20px;
        }

        .response-time-display {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px 20px;
            border-radius: 14px;
            background-color: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .response-time-value {
            color: var(--warning);
            font-weight: 700;
            font-size: 1.2rem;
        }

        /* Contact Form */
        .contact-form-section {
            background-color: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(15px);
            border-radius: 24px;
            padding: 50px;
            border: 1px solid var(--border-color);
            box-shadow: 
                0 20px 40px rgba(0, 0, 0, 0.6),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
            position: relative;
            overflow: hidden;
        }

        .contact-form-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 6px;
            background: linear-gradient(90deg, 
                var(--success) 0%, 
                var(--color-primary) 50%,
                var(--warning) 100%);
            filter: blur(3px);
        }

        .form-title {
            font-size: 2rem;
            margin-bottom: 40px;
            color: var(--color-text-light);
            position: relative;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .form-title::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--success);
            border-radius: 2px;
        }

        /* Status Messages */
        .status-message {
            padding: 20px;
            border-radius: 16px;
            margin-bottom: 30px;
            display: none;
            align-items: center;
            gap: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid;
        }

        .status-message.success {
            background-color: var(--success_bg);
            color: var(--success);
            border-color: rgba(16, 185, 129, 0.3);
        }

        .status-message.error {
            background-color: var(--danger_bg);
            color: var(--danger);
            border-color: rgba(239, 68, 68, 0.3);
        }

        /* Form Layout */
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-bottom: 25px;
        }

        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
                gap: 0;
                margin-bottom: 0;
            }
        }

        .form-group {
            margin-bottom: 25px;
            position: relative;
        }

        .form-label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            color: var(--color-text-light);
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .required::after {
            content: '*';
            color: var(--danger);
            margin-left: 4px;
        }

        .form-input {
            width: 100%;
            padding: 18px;
            background-color: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-color);
            border-radius: 14px;
            color: var(--color-text-light);
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 4px rgba(0, 119, 255, 0.2);
            background-color: rgba(255, 255, 255, 0.08);
        }

        .form-input:hover {
            background-color: rgba(255, 255, 255, 0.08);
        }

        .form-input.error {
            border-color: var(--danger);
            box-shadow: 0 0 0 4px var(--danger_bg);
        }

        .form-input.success {
            border-color: var(--success);
            box-shadow: 0 0 0 4px var(--success_bg);
        }

        .error-message {
            color: var(--danger);
            font-size: 0.85rem;
            margin-top: 8px;
            display: none;
        }

        textarea.form-input {
            min-height: 180px;
            resize: vertical;
            font-family: inherit;
            line-height: 1.6;
        }

        /* Secret Work Section */
        .secret-work-section {
            margin: 40px 0;
            padding: 30px;
            border-radius: 18px;
            background: linear-gradient(135deg, 
                rgba(0, 0, 0, 0.4), 
                rgba(0, 0, 0, 0.6));
            border: 1px solid var(--border-color);
            position: relative;
            overflow: hidden;
        }

        .secret-work-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                transparent 0%, 
                rgba(0, 119, 255, 0.05) 50%, 
                transparent 100%);
            z-index: 0;
        }

        .secret-work-title {
            font-size: 1.4rem;
            margin-bottom: 20px;
            color: var(--color-text-light);
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
            z-index: 1;
        }

        .secret-work-description {
            color: var(--color-text-lighter);
            margin-bottom: 25px;
            font-size: 1rem;
            line-height: 1.7;
            position: relative;
            z-index: 1;
        }

        .secret-input-container {
            position: relative;
            z-index: 1;
        }

        .secret-input {
            width: 100%;
            padding: 18px;
            padding-right: 60px;
            background-color: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 14px;
            color: var(--color-text-light);
            font-size: 1rem;
            font-family: 'Courier New', monospace;
            letter-spacing: 1px;
        }

        .secret-input:focus {
            outline: none;
            border-color: var(--warning);
            box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2);
        }

        .secret-toggle {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--color-text-lighter);
            cursor: pointer;
            font-size: 1.3rem;
            padding: 5px;
            border-radius: 6px;
            transition: background-color 0.3s;
        }

        .secret-toggle:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .character-counter {
            color: var(--color-text-lighter);
            font-size: 0.85rem;
            text-align: right;
            margin-top: 10px;
        }

        /* Encryption Notice */
        .encryption-notice {
            display: flex;
            align-items: center;
            gap: 15px;
            margin: 30px 0;
            padding: 20px;
            border-radius: 14px;
            background-color: rgba(0, 119, 255, 0.05);
            border: 1px solid rgba(0, 119, 255, 0.1);
        }

        /* Form Footer */
        .form-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;
            flex-wrap: wrap;
            gap: 20px;
        }

        @media (max-width: 768px) {
            .form-footer {
                flex-direction: column;
                align-items: stretch;
            }
        }

        .submit-button {
            padding: 20px 45px;
            background: linear-gradient(90deg, 
                var(--color-primary-gradient-start), 
                var(--color-primary-gradient-center),
                var(--color-primary-gradient-end));
            color: var(--color-text-light);
            border: none;
            border-radius: 16px;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 
                0 10px 25px rgba(0, 119, 255, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
        }

        .submit-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.2), 
                transparent);
            transition: left 0.5s ease;
        }

        .submit-button:hover {
            transform: translateY(-5px);
            box-shadow: 
                0 15px 30px rgba(0, 119, 255, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .submit-button:hover::before {
            left: 100%;
        }

        .submit-button:active {
            transform: translateY(-2px);
        }

        .submit-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }

        .form-note {
            font-size: 0.9rem;
            color: var(--color-text-lighter);
            text-align: right;
        }

        @media (max-width: 768px) {
            .form-note {
                text-align: center;
            }
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
            .contact-hero-title {
                font-size: 2.5rem;
            }
            
            .contact-hero-subtitle {
                font-size: 1.1rem;
            }
            
            .contact-sidebar,
            .contact-form-section {
                padding: 30px 25px;
            }
            
            .form-title,
            .sidebar-title {
                font-size: 1.8rem;
            }
        }

        @media (max-width: 480px) {
            .contact-hero-title {
                font-size: 2rem;
            }
            
            .contact-badges {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>

    ${await pageHeader({
      haveBack: true,
      page: "contactus",
      controller: "site",
      title: "Contact Us",
      desc: "Get in touch with our team for support and inquiries.",
    })}

    <div class="contact-container">
        <!-- Hero Section -->
        <div class="contact-hero">
            <h1 class="contact-hero-title">Secure Contact Portal</h1>
            <p class="contact-hero-subtitle">
                Connect with us through encrypted channels. For sensitive communications, 
                use the secret work field below for additional security.
            </p>
            
            <div class="contact-badges">
                <div class="contact-badge badge-primary">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
                    </svg>
                    End-to-End Encrypted
                </div>
                <div class="contact-badge badge-success">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                    </svg>
                    Verified Contacts
                </div>
                <div class="contact-badge badge-warning">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
                    </svg>
                    24h Response Time
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="contact-main">
            <!-- Sidebar with Contact Info -->
            <div class="contact-sidebar">
                <h2 class="sidebar-title">
                    <svg viewBox="0 0 24 24" width="28" height="28">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                    </svg>
                    Connect Directly
                </h2>
                
                <!-- Social Media Section -->
                <div class="social-connect">
                    <h3 class="social-connect-title">
                        <svg viewBox="0 0 24 24" width="22" height="22">
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" fill="currentColor"/>
                        </svg>
                        Preferred Communication Channels
                    </h3>
                    
                    <div class="social-grid">
                        <div class="social-card twitter" id="twitterContact">
                            <div class="social-icon-wrapper">
                                <svg viewBox="0 0 24 24" width="32" height="32">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" fill="#1DA1F2"/>
                                </svg>
                            </div>
                            <div class="social-details">
                                <h3>Twitter DM</h3>
                                <p>Direct messages for quick queries and support</p>
                            </div>
                        </div>
                        
                        <div class="social-card telegram" id="telegramContact">
                            <div class="social-icon-wrapper">
                                <svg viewBox="0 0 24 24" width="32" height="32">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.4-1.08.39-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" fill="#0088CC"/>
                                </svg>
                            </div>
                            <div class="social-details">
                                <h3>Telegram</h3>
                                <p>Encrypted messaging for secure communications</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Response Time Info -->
                <div class="response-info">
                    <h3 class="response-title">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
                        </svg>
                        Response Time
                    </h3>
                    <p class="response-description">
                        We prioritize all incoming messages and aim to respond within our guaranteed timeframe. 
                        Our team works around the clock to ensure you get timely assistance.
                    </p>
                    
                    <div class="response-time-display">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M13.5 8H12v5l4.28 2.54.72-1.21-3.5-2.08V8M13 3a9 9 0 0 0-9 9H1l3.96 4.03L9 12H6a7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.896 8.896 0 0 0 13 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9" fill="currentColor"/>
                        </svg>
                        <div>
                            <div style="font-size: 0.9rem; color: var(--color-text-lighter); margin-bottom: 5px;">
                                Average response time
                            </div>
                            <div class="response-time-value">24 hours or less</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Contact Form Section -->
            <div class="contact-form-section">
                <h2 class="form-title">
                    <svg viewBox="0 0 24 24" width="28" height="28">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                    </svg>
                    Send Secure Message
                </h2>
                
                <!-- Status Messages -->
                <div class="status-message success" id="successMessage">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                    </svg>
                    <span>Your encrypted message has been sent successfully!</span>
                </div>
                
                <div class="status-message error" id="errorMessage">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
                    </svg>
                    <span>Please fill in all required fields correctly.</span>
                </div>
                
                <!-- Contact Form -->
                <form id="contactForm">
                    <!-- Name Fields -->
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label required" for="firstName">
                                <svg viewBox="0 0 24 24" width="18" height="18">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                                </svg>
                                First Name
                            </label>
                            <input type="text" id="firstName" class="form-input" placeholder="Enter your first name">
                            <div class="error-message" id="firstNameError">Valid first name required</div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label required" for="lastName">
                                <svg viewBox="0 0 24 24" width="18" height="18">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                                </svg>
                                Last Name
                            </label>
                            <input type="text" id="lastName" class="form-input" placeholder="Enter your last name">
                            <div class="error-message" id="lastNameError">Valid last name required</div>
                        </div>
                    </div>
                    
                    <!-- Email Field -->
                    <div class="form-group">
                        <label class="form-label required" for="email">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                            </svg>
                            Email Address
                        </label>
                        <input type="email" id="email" class="form-input" placeholder="your.email@example.com">
                        <div class="error-message" id="emailError">Valid email address required</div>
                    </div>
                    
                    <!-- Subject Field -->
                    <div class="form-group">
                        <label class="form-label required" for="subject">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="currentColor"/>
                            </svg>
                            Subject
                        </label>
                        <input type="text" id="subject" class="form-input" placeholder="Brief description of your inquiry">
                        <div class="error-message" id="subjectError">Subject required</div>
                    </div>
                    
                    <!-- Message Field -->
                    <div class="form-group">
                        <label class="form-label required" for="message">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zM6 12h8v2H6zm0-3h12v2H6zm0-3h12v2H6z" fill="currentColor"/>
                            </svg>
                            Message
                        </label>
                        <textarea id="message" class="form-input" placeholder="Please provide detailed information about your inquiry..."></textarea>
                        <div class="character-counter"><span id="charCount">0</span>/500 characters</div>
                        <div class="error-message" id="messageError">Message must be between 10-500 characters</div>
                    </div>
                    
                    <!-- Secret Work Section -->
                    <div class="secret-work-section">
                        <h3 class="secret-work-title">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
                            </svg>
                            Secret Work Communication
                        </h3>
                        <p class="secret-work-description">
                            For sensitive or confidential communications, use this field. 
                            Your message will be encrypted with an additional security layer.
                            This field is optional but recommended for sensitive information.
                        </p>
                        
                        <div class="secret-input-container">
                            <input type="password" id="secretWork" class="secret-input" placeholder="Enter secret communication here...">
                            <button type="button" class="secret-toggle" id="toggleSecret">
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                                </svg>
                            </button>
                        </div>
                        <div class="character-counter"><span id="secretCharCount">0</span>/200 characters</div>
                    </div>
                    
                    <!-- Encryption Notice -->
                    <div class="encryption-notice">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
                        </svg>
                        <span>This form uses end-to-end encryption. Your data is secure and protected.</span>
                    </div>
                    
                    <!-- Form Footer -->
                    <div class="form-footer">
                        <button type="submit" class="submit-button" id="submitForm">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
                            </svg>
                            Send Encrypted Message
                        </button>
                        
                        <div class="form-note">
                            <span>Fields marked with <span style="color: var(--danger)">*</span> are required</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

  `;

  return contactPageHtml;
}

export { contactPageLayout };
