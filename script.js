      // DOM Elements
      const displayPassword = document.querySelector(".userInput");
      const slider = document.querySelector(".range-slider");
      const sliderValue = document.querySelector(".input-number");
      const lowercase = document.querySelector("#lowercase");
      const uppercase = document.querySelector("#uppercase");
      const number = document.querySelector("#number");
      const symbol = document.querySelector("#symbol");
      const excludeDuplicateChars = document.querySelector("#duplicate-chars");
      const excludeSimilar = document.querySelector("#exclude-similar");
      const copyCode = document.querySelector(".copy-code");
      const reGenerate = document.querySelector(".re-generate");
      const passStrength = document.querySelector("#pass-strength");
      const generateButton = document.querySelector("#generate-btn");
      
      // Character sets
      const lowerChars = "abcdefghijklmnopqrstuvwxyz";
      const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const allNumbers = "0123456789";
      const allSymbols = "~!@#$%^&*";
      const similarChars = "ilI1oO0";
      
      // Sync slider and number input
      slider.addEventListener("input", () => {
        sliderValue.value = slider.value;
      });
      sliderValue.addEventListener("input", () => {
        slider.value = sliderValue.value;
      });
      
      // Generate password
      const generatePassword = () => {
        let genPassword = "";
        let allChars = "";
      
        // Build character pool based on user preferences
        allChars += lowercase.checked ? lowerChars : "";
        allChars += uppercase.checked ? upperChars : "";
        allChars += number.checked ? allNumbers : "";
        allChars += symbol.checked ? allSymbols : "";
      
        // Exclude similar characters if enabled
        if (excludeSimilar.checked) {
          allChars = allChars.split("").filter((char) => !similarChars.includes(char)).join("");
        }
      
        // Generate password of selected length
        while (genPassword.length < slider.value) {
          const char = allChars.charAt(Math.floor(Math.random() * allChars.length));
          if (excludeDuplicateChars.checked && genPassword.includes(char)) continue;
          genPassword += char;
        }
      
        return genPassword;
      };
      
      // Evaluate password strength
      const evaluatePasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length > 12) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[~!@#$%^&*]/.test(password)) score++;
      
        return score <= 3 ? "Weak" : score <= 5 ? "Medium" : "Strong";
      };
      
      // Update password and strength
      const updatePassword = () => {
        const password = generatePassword();
        displayPassword.value = password;
        const passwordStrengthCode = evaluatePasswordStrength(password);
        passStrength.textContent = passwordStrengthCode;
        if(passwordStrengthCode == "Weak"){
          passStrength.style.color = "red";
        }else if(passwordStrengthCode == "Medium"){
          passStrength.style.color = "yellow";
        }else{
          passStrength.style.color = "green";
        }
      };
      
      // Copy password to clipboard
      copyCode.addEventListener("click", () => {
        if (displayPassword.value) {
          navigator.clipboard.writeText(displayPassword.value);
          const notification = document.querySelector(".notifications");
          notification.style.display = "block";
          setTimeout(() => (notification.style.display = "none"), 2000);
        }
      });
      
      // Event Listeners
      generateButton.addEventListener("click", updatePassword);
      reGenerate.addEventListener("click", updatePassword);
      
      // Initialize with a password
      updatePassword();
      