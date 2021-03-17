import { linkChecker } from "./linkChecker";

async function handleSubmit(event) {
  event.preventDefault();
 
  let formText = document.getElementById("url").value;

   
  if (linkChecker(formText)) {
    try {

      let submitBtn = document.getElementById("submitBtn");
  
      var logger = document.getElementById("logger");

      console.log("::: Form Submitted :::");

      submitBtn.disabled = true;

      logger.innerText = "Working...";

      const apiCall = await fetch(`http://localhost:8080/scan/${formText}`);
      const apiResponse = await apiCall.json();

      document.getElementById("results").innerHTML = `<table>
      <tr><td>Sentiment</td><td>Result</td></tr>
      <tr><td>Agreement:</td><td>${apiResponse.agreement.toLowerCase()}</td></tr>
      <tr><td>Subjectivity:</td><td>${apiResponse.subjectivity.toLowerCase()}</td></tr>
      <tr><td>Confidence:</td><td>${apiResponse.confidence}</td></tr>
      <tr><td>Irony:</td><td>${apiResponse.irony.toLowerCase()}</td></tr>
      </table>`;

      submitBtn.disabled = false;
    } catch (err) {

      submitBtn.disabled = false;

      console.log(err.message);

      logger.innerText = "Error...";
    }
  } else {

    alert("invalid URL.");
    logger.innerText =
      " please insert a valid URL, ex: 'www.linkedin.com' ";
  }
}

export { handleSubmit };
