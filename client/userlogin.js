document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Login successful:', data);
                getUserid(username);
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    });
});

async function getUserid(username) {
    try {
        const response = await fetch(`http://localhost:3000/user/getUserID/${username}`);
        const data = await response.json();
        
        if (data.success) {
            console.log(data);
            const userId = data.userId; 
            window.location.href = `/client/user.html?userId=${userId}`;
        } else {
            console.log('Error:', data.message);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}
