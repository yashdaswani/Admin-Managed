// admindashboard.js

// Function to fetch and display user data on the admin dashboard
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

// Function to display users on the admin dashboard
function displayUsers(users) {
  const tableBody = document.getElementById('userTableBody'); // Assuming you have a table body with id 'userTableBody'

  // Clear existing rows
  tableBody.innerHTML = '';

  // Populate the table with user data
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user._id}</td>
      <td>${user.username}</td>
      <td>${user.profileImage}</td>
      <td>
        <button type="button" class="btn btn-outline-primary my-3" onclick="deleteUser('${user._id}')">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Function to delete a user by ID
async function deleteUser(userId) {
  try {
    const response = await fetch(`http://localhost:3000/admin/deleteUser/${userId}`, {
      method: 'POST', // Assuming you use POST for deletion, adjust accordingly
    });

    const data = await response.json();

    if (data.success) {
      console.log('User deleted successfully:', data.message);
      // Refresh the user list after deletion
      fetchAndDisplayUsers();
    } else {
      console.error('Failed to delete user:', data.message);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

// Execute the fetchAndDisplayUsers function when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayUsers();
});
