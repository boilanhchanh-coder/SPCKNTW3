//Hàm lấy dữ liệu và lưu dữ liệu
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
//Tài khoản ADMIN
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
//Đăng kí
function register(){
    let regUser = document.getElementById('regUser').value;
    let regPass = document.getElementById('regPass').value;
    let confirm = document.getElementById('xac-nhan').value;
    let accounts = getData('accounts');
    if (!accounts.some(a => a.username === regUser) && regPass === confirm){
        accounts.push({
            username: regUser,
            password: regPass,
            role: "User"
        });
        saveData("accounts", accounts);
    }
}
//Đăng nhập
function login(){
    let loginUser = document.getElementById("loginUser").value;
    let loginPass = document.getElementById("loginPass").value;
    let accounts = getData("accounts");
    let acc = accounts.find(a => a.username === loginUser && a.password === loginPass);
    saveData("NguoiDung", loginUser);
    if (acc.role === "Admin") location.href = "admin-phim.html";
    else location.href = "trang-chu.html"
}
//Đăng xuất
function logout(){
    location.href = "index.html";
}
