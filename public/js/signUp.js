document.addEventListener('DOMContentLoaded', async () => {
    signUp();
})
function signUp() {
    document.getElementById('signUpForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const body = {};
            const username = document.getElementById('usernameInput').value;
            const email = document.getElementById('emailInput').value;
            const password = document.getElementById('passwordInput').value;
            const role = 'member';
            body.username = username;
            body.email = email;
            body.password = password;
            body.role = role;
            const response = await fetch(`http://localhost:3001/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) throw new Error(response.status);
            window.location.href = '/';
        }
        catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    })
}