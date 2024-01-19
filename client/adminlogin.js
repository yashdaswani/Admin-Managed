// In your HTML file, inside a <script> tag or a separate script file
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('http://localhost:3000/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          console.log('Login successful:', data);
          window.location.href = '/client/createUser.html';
        } else {
          console.error('Login failed:', data.message);
          // Display an error message or take appropriate action
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Handle errors, display error messages, etc.
      }
    });
  });
  