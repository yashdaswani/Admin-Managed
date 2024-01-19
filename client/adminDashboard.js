
async function fetchAndDisplayUsers() {
  try {
    const response = await fetch('http://localhost:3000/admin/dashboard'); 
    const data = await response.json();

    if (data.success) {
      const users = data.users;
      displayUsers(users);
    } else {
      console.error('Failed to fetch user data:', data.message);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

function displayUsers(users) {
  const tableBody = document.getElementById('userTableBody'); 

  tableBody.innerHTML = '';

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

async function deleteUser(userId) {
  try {
    const response = await fetch(`http://localhost:3000/admin/deleteUser/${userId}`, {
      method: 'POST', 
    });

    const data = await response.json();

    if (data.success) {
      console.log('User deleted successfully:', data.message);
      fetchAndDisplayUsers();
    } else {
      console.error('Failed to delete user:', data.message);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayUsers();
});
