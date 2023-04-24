const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your API key

const fileInput = document.getElementById('fileInput');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');

submitBtn.addEventListener('click', function() {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  fetch(`https://api.qrserver.com/v1/read-qr-code/?outputformat=json&apiKey=${API_KEY}`, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data[0].symbol[0].error) {
      resultDiv.innerText = `Error: ${data[0].symbol[0].error}`;
    } else {
      resultDiv.innerText = `Content: ${data[0].symbol[0].data}`;
    }
  })
  .catch(error => {
    console.error(error);
    resultDiv.innerText = 'An error occurred while processing the file.';
  });
});
