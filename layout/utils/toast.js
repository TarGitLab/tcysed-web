class ToastManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Create toast container if it doesn't exist
    if (!document.getElementById("toast-container")) {
      this.container = document.createElement("div");
      this.container.id = "toast-container";
      this.container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
            `;
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById("toast-container");
    }
  }

  showToast({ message, type = "1", duration = 3 }) {
    const toast = document.createElement("div");
    const config = this.getToastConfig(type);

    toast.style.cssText = `
            position: relative;
            padding: 16px 20px;
            border-radius: 8px;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: 300px;
            max-width: 400px;
            background: ${config.background};
            border-left: 4px solid ${config.borderColor};
            display: flex;
            align-items: center;
            gap: 12px;
        `;

    // Add icon
    const icon = document.createElement("div");
    icon.innerHTML = config.icon;
    icon.style.cssText = `
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        `;

    // Add message
    const messageEl = document.createElement("div");
    messageEl.textContent = message;
    messageEl.style.flex = "1";
    messageEl.style.cssText = `
      white-space: normal;
      word-wrap: break-word;
      overflow-wrap: anywhere;
    `;

    // Add close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "×";
    closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.7;
            transition: opacity 0.2s;
            border-radius: 50%;
        `;
    closeBtn.onmouseover = () => (closeBtn.style.opacity = "1");
    closeBtn.onmouseout = () => (closeBtn.style.opacity = "0.7");
    closeBtn.onclick = () => this.removeToast(toast);

    toast.appendChild(icon);
    toast.appendChild(messageEl);
    toast.appendChild(closeBtn);
    this.container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = "translateX(0)";
      toast.style.opacity = "1";
    });

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(toast);
      }, duration * 1000);
    }

    return toast;
  }

  getToastConfig(type) {
    const configs = {
      1: {
        // Success
        background: "linear-gradient(135deg, #10b981, #059669)",
        borderColor: "#047857",
        icon: `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                `,
      },
      2: {
        // Warning
        background: "linear-gradient(135deg, #f59e0b, #d97706)",
        borderColor: "#b45309",
        icon: `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                `,
      },
      3: {
        // Danger
        background: "linear-gradient(135deg, #ef4444, #dc2626)",
        borderColor: "#b91c1c",
        icon: `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                `,
      },
    };

    return configs[type] || configs["1"];
  }

  removeToast(toast) {
    toast.style.transform = "translateX(400px)";
    toast.style.opacity = "0";

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}

// Create global instance
const toastManager = new ToastManager();

// Global function
function showToast({ message, type = "1", duration = 3 }) {
  return toastManager.showToast({ message, type, duration });
}

export { showToast };
