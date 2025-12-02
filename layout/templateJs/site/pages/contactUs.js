import { telegramOwnerUsername } from "../../../config/conData.js";

import { controller } from "../../../layoutController/layoutController.js";

import { showToast } from "../../../utils/toast.js";
import { apiRequestUrl, encPassword } from "../../../config/conData.js";
import { encryptData } from "../../utils/static/enc.js";

async function sendContactFormRequest(formData) {

    // Encrypt the form data
    const encryptedRes = encryptData(formData, encPassword);

    if (!encryptedRes.status) {
        showToast({
            message: encryptedRes.message,
            type: 3,
            duration: 5,
        });
        return null;
    }

    const encryptedBody = encryptedRes.data;

    try {
        const response = await fetch(`${apiRequestUrl}/api/site/contact/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                payload: encryptedBody,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            showToast({
                message: result.message || "Server error",
                type: 3,
                duration: 5,
            });
            return {status: false};
        }

        // Success message
        showToast({
            message: result.message || "Message Sent Successfully!",
            type: 1,
            duration: 5,
        });

        return result;

    } catch (err) {
        showToast({
            message: "Network error: " + err.message,
            type: 3,
            duration: 5,
        });
        return {status: false};
    }
}


async function iniContactUsPage(data = {}) {

  const contactForm = document.getElementById("contactForm");
    const messageInput = document.getElementById("message");
    const secretInput = document.getElementById("secretWork");
    const charCount = document.getElementById("charCount");
    const secretCharCount = document.getElementById("secretCharCount");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");
    const toggleSecretBtn = document.getElementById("toggleSecret");
    const submitButton = document.getElementById("submitForm");

    let isSecretVisible = false;

    // Initialize social links
    const twitterCard = document.getElementById("twitterContact");
    const telegramCard = document.getElementById("telegramContact");

    if (twitterCard) {
      twitterCard.addEventListener("click", function () {
        window.open("https://twitter.com", "_blank");
      });
    }

    if (telegramCard) {
      telegramCard.addEventListener("click", function () {
        window.open(`${telegramOwnerUsername}`, "_blank");
      });
    }

    // Toggle secret work visibility
    if (toggleSecretBtn) {
      toggleSecretBtn.addEventListener("click", function () {
        isSecretVisible = !isSecretVisible;
        if (isSecretVisible) {
          secretInput.type = "text";
          toggleSecretBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
                </svg>
            `;
        } else {
          secretInput.type = "password";
          toggleSecretBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                </svg>
            `;
        }
      });
    }

    // Character counter for message textarea
    if (messageInput) {
      messageInput.addEventListener("input", function () {
        const count = messageInput.value.length;
        charCount.textContent = count;

        if (count > 500) {
          charCount.style.color = "var(--danger)";
        } else if (count > 400) {
          charCount.style.color = "var(--warning)";
        } else {
          charCount.style.color = "var(--color-text-lighter)";
        }
      });
    }

    // Character counter for secret work input
    if (secretInput) {
      secretInput.addEventListener("input", function () {
        const count = secretInput.value.length;
        secretCharCount.textContent = count;

        if (count > 200) {
          secretCharCount.style.color = "var(--danger)";
        } else if (count > 150) {
          secretCharCount.style.color = "var(--warning)";
        } else {
          secretCharCount.style.color = "var(--color-text-lighter)";
        }
      });
    }

    // Form validation and submission
    if (submitButton) {
      submitButton.addEventListener("click", async function (e) {
        console.log('ok');
        e.preventDefault();
        let isValid = true;

        // Hide all error messages
        document.querySelectorAll(".error-message").forEach((el) => {
          el.style.display = "none";
        });

        // Hide status messages
        if (successMessage) successMessage.style.display = "none";
        if (errorMessage) errorMessage.style.display = "none";

        // Reset input styles
        document.querySelectorAll(".form-input").forEach((input) => {
          input.classList.remove("error", "success");
        });
        if (secretInput) secretInput.classList.remove("error", "success");

        // Validate first name
        const firstName = document.getElementById("firstName");
        if (!firstName || !firstName.value.trim()) {
          const errorEl = document.getElementById("firstNameError");
          if (errorEl) errorEl.style.display = "block";
          if (firstName) firstName.classList.add("error");
          isValid = false;
        } else if (firstName) {
          firstName.classList.add("success");
        }

        // Validate last name
        const lastName = document.getElementById("lastName");
        if (!lastName || !lastName.value.trim()) {
          const errorEl = document.getElementById("lastNameError");
          if (errorEl) errorEl.style.display = "block";
          if (lastName) lastName.classList.add("error");
          isValid = false;
        } else if (lastName) {
          lastName.classList.add("success");
        }

        // Validate email
        const email = document.getElementById("email");

        if (!email || !email.value.includes("@")) {
          const errorEl = document.getElementById("emailError");
          if (errorEl) errorEl.style.display = "block";
          if (email) email.classList.add("error");
          isValid = false;
        } else {
          email.classList.add("success");
        }

        // Validate subject
        const subject = document.getElementById("subject");
        if (!subject || !subject.value.trim()) {
          const errorEl = document.getElementById("subjectError");
          if (errorEl) errorEl.style.display = "block";
          if (subject) subject.classList.add("error");
          isValid = false;
        } else if (subject) {
          subject.classList.add("success");
        }

        // Validate message
        const message = document.getElementById("message");
        if (
          !message ||
          !message.value.trim() ||
          message.value.trim().length < 10
        ) {
          const errorEl = document.getElementById("messageError");
          if (errorEl) {
            errorEl.textContent = "Message must be at least 10 characters";
            errorEl.style.display = "block";
          }
          if (message) message.classList.add("error");
          isValid = false;
        } else if (message && message.value.length > 500) {
          const errorEl = document.getElementById("messageError");
          if (errorEl) {
            errorEl.textContent = "Message must be less than 500 characters";
            errorEl.style.display = "block";
          }
          if (message) message.classList.add("error");
          isValid = false;
        } else if (message) {
          message.classList.add("success");
        }

        // Validate secret work (optional but with length limit)
        if (secretInput && secretInput.value.length > 200) {
          secretInput.classList.add("error");
          isValid = false;
        } else if (secretInput && secretInput.value.length > 0) {
          secretInput.classList.add("success");
        }

        // If form is valid, submit the form
        if (isValid && submitButton) {
          // Show loading state
          const originalText = submitButton.innerHTML;
          submitButton.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20" class="spinner">
                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" fill="currentColor"/>
                </svg>
                Sending...
            `;
          submitButton.disabled = true;

          let formDataObj = {
            firstName: firstName ? firstName.value : "",
            lastName: lastName ? lastName.value : "",
            email: email ? email.value : "",
            subject: subject ? subject.value : "",
            message: message ? message.value : "",
            secretWork: secretInput
              ? secretInput.value
                ? "*** ENCRYPTED ***"
                : "Not provided"
              : "",
            timestamp: new Date().toISOString(),
          };

          let sendRes = await sendContactFormRequest(formDataObj);
          if (sendRes.status) {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            successMessage.style.display = "flex";
            controller({ controller: "site", page: "home" });
            return;
          }
        } else if (errorMessage) {
          errorMessage.style.display = "flex";
        }
      });
    }

    // Add input event listeners for real-time validation
    document.querySelectorAll(".form-input, .secret-input").forEach((input) => {
      input.addEventListener("input", function () {
        if (this.classList.contains("error")) {
          this.classList.remove("error");
          const errorId = this.id + "Error";
          const errorElement = document.getElementById(errorId);
          if (errorElement) {
            errorElement.style.display = "none";
          }
        }
      });
    });

}

export { iniContactUsPage };
