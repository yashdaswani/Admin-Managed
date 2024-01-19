document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const updateForm = document.querySelector('form');

    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;

        if (username) {
            try {
                const response = await fetch(`http://localhost:3000/user/update/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                });

                const data = await response.json();

                if (data.success) {
                    console.log('Update successful:', data);
                    // You may want to redirect or show a success message
                } else {
                    console.error('Update failed:', data.message);
                    // Display an error message or take appropriate action
                }
            } catch (error) {
                console.error('Error during update:', error);
                // Handle errors, display error messages, etc.
            }
        }
    });

    // Assuming there is only one element with the class 'viewUserButton'
    viewUser(userId)
    const viewUserButton = document.querySelector('.viewUserButton');
    viewUserButton.addEventListener('click', toggleRightBar);
});

function toggleRightBar() {
    const rightBar = document.getElementById('rightBar');
    const rightBarWidth = rightBar.style.width === '30%' ? '0' : '30%';
    rightBar.style.width = rightBarWidth;

    if (rightBarWidth === '30%') {
        // Set content in the right bar (you can fetch this from your form)
       
    }
}


async function viewUser(userId)
{
    try {
        const response = await fetch(`http://localhost:3000/admin/viewUser/${userId}`); // Replace with your server endpoint
        const data = await response.json();
        
        if (data.success) {
            const username = document.getElementById('username').value;
            const userPhoto = document.getElementById('previewImage').src;
    
            document.getElementById('rightBarUsername').textContent = 'Username: ' + data.user.username;
            document.getElementById('rightBarUserPhoto').src = data.userPhoto;
        } else {
          console.error('Failed to fetch user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
}