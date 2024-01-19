document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const updateForm = document.querySelector('form');

    viewUser(userId);

    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const photoInput = document.getElementById('photoInput');
        const formData = new FormData();

        formData.append('username', username);

        try {
            const response = await fetch(`http://localhost:3000/user/update/${userId}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                console.log('Update successful:', data);
                viewUser(userId);
            } else {
                console.error('Update failed:', data.message);
            }
        } catch (error) {
            console.error('Error during update:', error);
        }
    });

    const viewUserButton = document.querySelector('.viewUserButton');
    viewUserButton.addEventListener('click', toggleRightBar);
});

function toggleRightBar() {
    const rightBar = document.getElementById('rightBar');
    const rightBarWidth = rightBar.style.width === '30%' ? '0' : '30%';
    rightBar.style.width = rightBarWidth;

    if (rightBarWidth === '30%') {
    }
}

async function viewUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/admin/viewUser/${userId}`);
        const data = await response.json();

        if (data.success) {
            document.getElementById('rightBarUsername').textContent = 'Username: ' + data.user.username;
            document.getElementById('rightBarUserPhoto').src = data.user.profileImage;
        } else {
            console.error('Failed to fetch user data:', data.message);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}
