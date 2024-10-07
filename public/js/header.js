document.addEventListener('DOMContentLoaded', () => {
    search();
})
function search(){
    document.getElementById('search').addEventListener('keydown', (e) => {
        if(e.key == 'Enter'){
            window.location.href = `/search?search=${e.target.value}`
        }
    })
}
