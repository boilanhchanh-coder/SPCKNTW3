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


//Danh sách Thể loại
let danhSachTheLoai = ["Hoạt hình", "Phiêu lưu", "Hành động",
                       "Khoa học viễn tưởng", "Gia đình", "Chính kịch",
                       "Giả tưởng", "Kinh dị", "Hài hước", "Lãng mạn"]
//Danh sách Phim có sẵn
function phimCoSan(){
    let phim = getData("danhSachPhim");
    if (phim.length === 0){
        let phimBanDau = [
            {
                tenPhim: "Colony: Bầy xác sống",
                theLoai: ["Hành động", "Kinh dị", "Khoa học viễn tưởng"],
                thoiLuong: 122,
                moTa: "Siêu phẩm zombie đến từ đạo diễn YEON Sang-ho, người từng tạo nên thành công vang dội của Train to Busan. Khi một dịch bệnh bí ẩn bùng phát tại một tòa cao ốc giữa trung tâm Seoul, những người sống sót bị mắc kẹt và buộc phải chiến đấu để tìm đường thoát thân. Đáng sợ hơn, những người nhiễm bệnh không còn là những xác sống vô thức mà đã tiến hóa thành những sinh vật săn mồi theo bầy đàn có tổ chức. Hy vọng cuối cùng của họ phụ thuộc vào một người đàn ông tự nhận đang mang trong mình loại vắc-xin có thể chấm dứt đại dịch.",
                trangThai: "Đang chiếu",
                anh: "colony.jpg",
                id: 1
            },
            {
                tenPhim: "Doraemon: Nobita và lâu đài dưới đáy biển",
                theLoai: ["Hoạt hình", "Phiêu lưu"],
                thoiLuong: 101,
                moTa: "Trong kỳ nghỉ hè, Doraemon cùng Nobita và những người bạn quyết định tổ chức chuyến cắm trại dưới đáy đại dương bằng các bảo bối thần kỳ. Trên hành trình khám phá thế giới biển sâu, cả nhóm gặp El – cư dân của Liên bang Mu bí ẩn. Khi \"Lâu đài Quỷ\" có nguy cơ hồi sinh, Nobita và các bạn phải cùng nhau bước vào cuộc phiêu lưu đầy thử thách để bảo vệ đại dương cũng như tương lai của Trái Đất.",
                trangThai: "Đang chiếu",
                anh: "doraemon.jpg",
                id: 2
            },
            {
                tenPhim: "Tạm Biệt Gohan",
                theLoai: ["Gia đình", "Chính kịch", "Lãng mạn", "Phiêu lưu"],
                thoiLuong: 140,
                moTa: "Suốt mười năm lang thang, chú chó hoang mang tên Gohan đã trải qua nhiều cuộc gặp gỡ và chia ly cùng những người chủ khác nhau. Mỗi chặng đường đều để lại trong Gohan những ký ức không thể phai mờ về tình yêu thương, lòng trung thành và sự gắn kết giữa con người với động vật. Bộ phim mang đến câu chuyện cảm động về thời gian, gia đình và giá trị của những cuộc hội ngộ.",
                trangThai: "Đang chiếu",
                anh: "gohan.jpg",
                id: 3
            },
            {
                tenPhim: "Your Name",
                theLoai: ["Hoạt hình", "Lãng mạn", "Giả tưởng"],
                thoiLuong: 106,
                moTa: "Mitsuha, một nữ sinh sống tại vùng quê, và Taki, một nam sinh ở Tokyo, bất ngờ hoán đổi cơ thể với nhau qua những giấc mơ kỳ lạ. Khi dần quen với cuộc sống của đối phương, cả hai hình thành một mối liên kết đặc biệt. Tuy nhiên, một bí mật liên quan đến thời gian và thảm họa thiên nhiên đã khiến họ phải vượt qua mọi khoảng cách để tìm thấy nhau và thay đổi số phận.",
                trangThai: "Đang chiếu",
                anh: "yourname.jpg",
                id: 4
            },
            {
                tenPhim: "Chú thuật hồi chiến",
                theLoai: ["Hoạt hình", "Hành động", "Giả tưởng"],
                thoiLuong: 88,
                moTa: "Sau bao ngày chờ đợi, Đại Chiến Shibuya cuối cùng cũng xuất hiện trên màn ảnh rộng, tái hiện những khoảnh khắc căng thẳng và bi tráng nhất của bộ truyện. Không chỉ khắc họa toàn bộ biến cố tại Shibuya, bộ phim còn mở ra chương truyện mới mang tên \"Tử Diệt Hồi Du\" - trò chơi sinh tử đầy khốc liệt, nơi số phận của các chú thuật sư trẻ tuổi sẽ tiếp tục bị thử thách.",
                trangThai: "Đang chiếu",
                anh: "hoaingoc.jpg",
                id: 5
            },
        ];
        saveData("danhSachPhim", phimBanDau);
    }
}
phimCoSan();
//Giá vé phòng
let bangGiaVe = {
    "Thường": 60000,
    "VIP": 90000,
};
//Danh sách phòng có sẵn
function phongCoSan(){
    let phong = getData("danhSachPhong");
    if (phong.length == 0){
        let phongBanDau = [
            {
                tenPhong: "1",
                soHang: 8,
                soGheMoiHang: 10,
                loaiVe: "Thường",
                id: 1
            },
            {
                tenPhong: "2",
                soHang: 6,
                soGheMoiHang: 8,
                loaiVe: "VIP",
                id: 2
            },
            {
                tenPhong: "3",
                soHang: 10,
                soGheMoiHang: 12,
                loaiVe: "Thường",
                id: 3
            }
        ]
        phongBanDau.forEach(p => {
            p.giaVe = bangGiaVe[p.loaiVe];
        })
        saveData("danhSachPhong", phongBanDau);
    }
}
phongCoSan();
//Đóng mở modal Thêm phim
function openModal(id){
    let ok = document.getElementById(id);
    ok.style.display = "flex";
};
function closeModal(id){
    let ok = document.getElementById(id);
    ok.style.display = "none";
}
//Hàm tạo ID
function taoIdMoi(danhSachPhim){
    let idLonNhat = Math.max(...danhSachPhim.map(p => p.id));
    return idLonNhat + 1;
}