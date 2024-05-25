// Load and initialize Pyodide
async function main() {
    const loadingMessage = document.getElementById("loadingMessage");
    const translateButton = document.getElementById("translateButton");
  
    try {
      // Display loading message
      loadingMessage.style.display = "block";
      
      // Load Pyodide
      let pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.0/full/"
      });
  
      // Hide loading message and enable the button
      loadingMessage.style.display = "none";
      translateButton.disabled = false;
  
      // Function to run the Python script
      async function translateEnglish() {
        // Get the input value
        let englishText = document.getElementById("english").value;
  
        // Define the Python code to translate text
        const pythonCode = `
  def translate_english(text):
      # Replace this function with the actual translation logic
      pirate_speak = text.replace("hello", "ahoy").replace("my", "me")
      return pirate_speak
  
  translate_english('${englishText}')
        `;
  
        // Run the Python code
        let result = await pyodide.runPythonAsync(pythonCode);
  
        // Display the result
        document.getElementById("output").innerText = result;
      }
  
      // Add event listener to the button
      translateButton.addEventListener("click", translateEnglish);
  
    } catch (error) {
      // Handle errors in loading Pyodide
      loadingMessage.innerText = "Failed to load Pyodide. Please try again later.";
      console.error(error);
    }
  }
  
  main();
  