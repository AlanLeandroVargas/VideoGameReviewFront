document.addEventListener('DOMContentLoaded', () =>{
    login();
})
function login(){
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        try{
            const body = {};
            const username = document.getElementById('usernameInput').value;
            const password = document.getElementById('passwordInput').value;
            body.username = username;
            body.password = password;
            const response = await fetch('http://localhost:3001/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if(!response.ok) throw new Error(response.status);
            const userData = await response.json();
            document.cookie = `token=${userData.token}; path=/;`;
            window.location.href = '/';
        }
        catch(error){
            console.error(error);
        }
    })
}