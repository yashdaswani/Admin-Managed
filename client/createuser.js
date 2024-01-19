// In your HTML file, inside a <script> tag or a separate script file

async function fetchAndDisplayUsers() {
    try {
      const response = await fetch('http://localhost:3000/admin/dashboard'); // Replace with your server endpoint
      const data = await response.json();
  
      if (data.success) {
        const users = data.users;
        // Assuming you have a function to display users on the admin dashboard
        displayUsers(users);
      } else {
        console.error('Failed to fetch user data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  function displayUsers(users) {
    const user1 = document.getElementById('username1'); 
    const user2 = document.getElementById('username2');
    user1.innerHTML = users[0].username;
    user2.innerHTML = users[1].username;
  
  }

  function viewDashboard() {
    // Redirect to the dashboard page
    window.location.href = '/client/admindashboard.html'; // Replace with your actual dashboard URL
  }


document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayUsers();

    const viewButton = document.querySelector('.viewbutton'); // Assuming you have a button with the class 'viewbutton'
  
  if (viewButton) {
    viewButton.addEventListener('click', () => {
      viewDashboard();
    });
  }


    const loginForm = document.getElementById('createUserform');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('http://localhost:3000/admin/createUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          console.log('User Created:', data);
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
  