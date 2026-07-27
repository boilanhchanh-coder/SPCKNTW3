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
    let success = document.getElementById("registerSuccess");
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

    success.innerHTML = "✓ Đăng ký thành công!";
    success.style.color = "#47d764"; 
    success.style.display = "block";
    }
    else if(accounts.some(a => a.username === regUser)){
        success.innerHTML = "Tài khoản đã tồn tại!";
        success.style.color = "#ff4d4d";
        success.style.display = "block";
    }
    else{
        success.innerHTML = "Mật khẩu xác nhận không khớp!";
        success.style.color = "#ff4d4d";
        success.style.display = "block";
    }
}

//Đăng nhập
function login(){
    let loginUser = document.getElementById("loginUser").value;
    let loginPass = document.getElementById("loginPass").value;
    let error = document.getElementById("loginError");
    let accounts = getData("accounts");
    let acc = accounts.find(a => a.username === loginUser && a.password === loginPass);
    saveData("NguoiDung", loginUser);
     if (acc) {
        error.style.display = "none";

        saveData("NguoiDung", loginUser);

        if (acc.role === "Admin")
            location.href = "admin-phim.html";
        else
            location.href = "trang-chu.html";
    } else {
        error.innerHTML = "Sai tài khoản hoặc mật khẩu.";
        error.style.display = "block";
    }
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
            {
                tenPhim: "Đồng dao ma quái",
                theLoai: [ "Hồi hộp • Kinh dị"],
                thoiLuong: 123,
                moTa:"Mỗi lần gieo xúc xắc là mỗi lần quỷ xuất hiện. Trong lúc dọn dẹp một ngôi đền bỏ hoang, một nhóm trẻ vô tình tìm thấy bàn cờ cổ bị phong ấn từ lâu. Sau khi gieo viên xúc xắc bí ẩn và đọc lên những câu đồng dao kỳ lạ, chúng nhận ra mình đã bắt đầu một trò chơi chết chóc. Mỗi lượt chơi đều kéo theo sự xuất hiện của những linh hồn đáng sợ, buộc cả nhóm phải tìm cách phá giải lời nguyền trước khi trời sáng." ,
                trangThai: "Đang chiếu",
                anh: "ddmq.jpg",
                id: 6
            },
            {
                tenPhim: "Thực thể quỷ nguyệt",
                theLoai: ["Kinh dị • Giật gân"],
                thoiLuong: 110,
                moTa: "Phim điện ảnh Backrooms (2026) (do hãng A24 sản xuất) theo chân Clark (Chiwetel Ejiofor), một chủ cửa hàng nội thất, vô tình phát hiện cánh cửa bí ẩn dưới tầng hầm. Bước qua đó, anh bị cuốn vào một chiều không gian vô tận với những căn phòng màu vàng méo mó, liên tục lặp lại. Khi Clark ngày càng lún sâu và ám ảnh, nhà trị liệu tâm lý của anh là Mary (Renate Reinsve) quyết định bước vào không gian đó để tìm và giải cứu anh.",
                trangThai: "Đang chiếu",
                anh: "ttqn.jpg",
                id: 7
            },
            {
                tenPhim: "PHIM ĐIỆN ẢNH – LỚP HỌC ÁM SÁT",
                theLoai: ["Hoạt hình"],
                thoiLuong: 86,
                moTa: "Được sản xuất nhân dịp kỷ niệm 10 năm ra mắt của Lớp Học Ám Sát, bộ phim mang đến những câu chuyện hoàn toàn mới về thầy Koro và tập thể lớp 3-E. Khi một sinh vật sở hữu tốc độ Mach 20 trở thành giáo viên của lớp học bị xem là phế thải, các học sinh không chỉ thực hiện nhiệm vụ ám sát thầy mà còn dần trưởng thành qua những bài học quý giá về tình bạn, lòng dũng cảm và ý chí vượt qua giới hạn bản thân",
                trangThai: "Đang chiếu",
                anh: "lhas.jpg",
                id: 8
            },
            {
                tenPhim: "Hành trình của MOANA",
                theLoai: ["Gia đình","Hài hước"],
                thoiLuong: 116,
                moTa:"Trong Moana, phiên bản live-action tái hiện lại cuộc phiêu lưu hoạt hình được yêu mến và từng được đề cử Oscar® của Disney, Moana (Catherine Lagaʻaia) đáp lại tiếng gọi của đại dương và lần đầu tiên rời xa rạn san hô bao quanh hòn đảo Motunui để lên đường cùng á thần huyền thoại Maui (Dwayne Johnson) trong một hành trình phi thường nhằm khôi phục sự thịnh vượng cho dân tộc mình. Bộ phim được đạo diễn bởi Thomas Kail, người từng giành giải Emmy® và Tony Award® (Hamilton); sản xuất bởi Dwayne Johnson, Dany Garcia, Beau Flynn, Hiram Garcia và Lin-Manuel Miranda; đồng thời được điều hành sản xuất bởi Kail, Scott Sheldon, Charles Newirth và Auliʻi Cravalho – người từng lồng tiếng cho Moana trong hai phần phim hoạt hình Moana và Moana 2. Moana quy tụ các ca khúc gốc do Lin-Manuel Miranda, Opetaia Foaʻi và Mark Mancina sáng tác, cùng phần nhạc nền nguyên bản do Mark Mancina đảm nhiệm. Khán giả sẽ được đắm mình trong những khung hình mãn nhãn, âm thanh sống động và các giai điệu cuốn hút của Moana, độc quyền tại các rạp chiếu phim từ ngày 10 tháng 7 năm 2026" ,
                trangThai: "Đang chiếu",
                anh: "moana.jpg",
                id: 9
            },
            {
                tenPhim: "MINIONS & QUÁI VẬT",
                theLoai: ["Gia đình • Hài hước • Hoạt hình • Phiêu lưu • Giả tưởng"],
                thoiLuong: 90,
                moTa:"Lấy bối cảnh Hollywood vào những năm 1920, bộ phim kể câu chuyện hài hước về hành trình các Minions chinh phục kinh đô điện ảnh để trở thành những ngôi sao màn bạc. Trong quá trình thực hiện bộ phim quái vật của riêng mình, họ vô tình giải phóng những sinh vật kỳ bí, khiến cả thế giới rơi vào hỗn loạn. Với sự đoàn kết và những màn báo hại đặc trưng, các Minions phải tìm cách khắc phục chính những rắc rối do mình gây ra và cứu lấy hành tinh. ",
                trangThai: "Đang chiếu",
                anh: "minion.jpg",
                id: 10
            },
            {
                tenPhim: "ÁM ẢNH (OBSESSION)",
                theLoai: ["Kinh dị • Tâm lý • Lãng mạn"],
                thoiLuong: 108,
                mota:"Bear, một chàng trai cô độc và sống khép kín, đem lòng yêu Nikki nhưng không đủ dũng cảm để bày tỏ tình cảm. Trong tuyệt vọng, anh tìm đến một nghi thức huyền bí mang tên One Wish Willow với hy vọng chinh phục trái tim cô gái mình yêu. Điều ước nhanh chóng trở thành hiện thực, nhưng tình yêu thuần khiết dần biến thành sự ám ảnh và chiếm hữu đầy đáng sợ. Khi ranh giới giữa yêu thương và điên loạn bị xóa nhòa, Bear bị cuốn vào chuỗi bi kịch kinh hoàng do chính mình tạo ra. Bộ phim khai thác mặt tối của tình yêu, sự ám ảnh và những hậu quả khủng khiếp khi con người cố gắng thay đổi cảm xúc của người khác bằng những thế lực siêu nhiên. ", 
                trangThai: "Đang chiếu",
                anh: "amanh.jpg",
                id: 11
            },
            {
                tenPhim: "Mẹ ơi về nhà",
                theLoai: ["Tâm lý • Tình cảm"],
                thoiLuong: 140,
                mota: "Bị bỏ rơi tại Hàn Quốc từ khi còn nhỏ, Huy Hoàng quyết định mang tro cốt của người mẹ nuôi quá cố trở về Việt Nam để tìm lại cội nguồn. Trên hành trình ấy, anh tình cờ gặp Diễm My – một ca sĩ trẻ đang chật vật mưu sinh. Cả hai cùng nhau vượt qua những khó khăn và hiểm nguy do quá khứ mang lại, đồng thời dần chữa lành những tổn thương trong lòng. Bộ phim là câu chuyện cảm động về gia đình, tình yêu, sự tha thứ và hành trình tìm lại bản thân.",
                trangThai: "Đang chiếu",
                anh: "movn.jpg",
                id: 12
            }
            
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
//Danh sách suất chiếu
function suatChieuCoSan(){
    let suat = getData("danhSachSuatChieu");
    if (suat.length === 0){
        saveData("danhSachSuatChieu", []);
    }
}
suatChieuCoSan();
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
function taoIdMoi(danhSach){
    if (danhSach.length === 0) return 1;
    let idLonNhat = Math.max(...danhSach.map(p => p.id));
    return idLonNhat + 1;
}




























































































