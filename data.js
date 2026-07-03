document.querySelectorAll('.select-button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.select-button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});
//Lệnh
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
//Tài khoản ADMIN, CUSTOMER
function tkAdminCoSan(){
    let accounts = getData("accounts");
    let adminExists = accounts.some(acc => acc.username === "admin");
    if (!adminExists){
        accounts.push({
            username: "admin",
            password: "1",
            role: "Admin",
            created: new Date().toLocaleString()
        });
        saveData("accounts", accounts)
    }
}
tkAdminCoSan();
function tkCustomer(){
    let accounts = getData("accounts");
}
//Đăng nhập
function login(){
    let loginUser = document.getElementById("taikhoan").value;
    let loginPass = document.getElementById("matkhau").value;
    let accounts = getData("accounts");
    let acc = accounts.find(a.username === loginUser && a.password === loginPass);
    
}