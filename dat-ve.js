let id = new URLSearchParams(location.search).get("id");
let ngayDangChon = null;
let suatDangChon = null;
let gheDangChon = [];
//Hiển thị ngày chiếu
function hienThiNgay(){
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let suatCuaPhim = danhSachSuatChieu.filter(s => s.phimID == id && s.trangThai !== "Đã chiếu");
    let box = document.getElementById("danh-sach-ngay");
    box.innerHTML = "";
    if (suatCuaPhim.length === 0){
        box.innerHTML = "<p>Hiện chưa có suất chiếu nào.</p>";
        return;
    }
    let danhSachNgay = [...new Set(suatCuaPhim.map(s => s.ngay))];
    danhSachNgay.forEach(ngay => {
        let btn = document.createElement("button");
        btn.className = "ngay";
        btn.textContent = dinhDangNgay(ngay);
        btn.onclick = function(){
            document.querySelectorAll(".ngay").forEach(b => b.classList.remove("dang-chon"));
            btn.classList.add("dang-chon");
            hienThiGio(ngay, suatCuaPhim);
            suatDangChon = null;
            gheDangChon = [];
            document.getElementById("so-do-ghe").innerHTML = "";
            capNhatThongTin();
        };
        box.appendChild(btn);
    });
    box.querySelector(".ngay").click();
}
hienThiNgay();
function hienThiGio(ngay, suatCuaPhim){
    let danhSachPhong = getData("danhSachPhong");
    let suatTrongNgay = suatCuaPhim.filter(s => s.ngay === ngay);

    let box = document.getElementById("danh-sach-gio");
    box.innerHTML = "";

    suatTrongNgay.forEach(s => {
        let phong = danhSachPhong.find(p => p.id == s.phongID);
        let btn = document.createElement("button");
        btn.className = "btn-gio";
        btn.textContent = s.gio;
        btn.onclick = function(){
            document.querySelectorAll(".btn-gio").forEach(b => b.classList.remove("dang-chon"));
            btn.classList.add("dang-chon");
            chonSuatChieu(s.id);
        };
        box.appendChild(btn);
    });
}
function chonSuatChieu(suatId){
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let danhSachPhong = getData("danhSachPhong");

    suatDangChon = danhSachSuatChieu.find(s => s.id == suatId);
    let phong = danhSachPhong.find(p => p.id == suatDangChon.phongID);
    gheDangChon = [];
    taoSoDoGheDatVe(phong.id);
    capNhatThongTin();
}
function taoSoDoGheDatVe(id){
    let danhSachPhong = getData("danhSachPhong");
    let hienThiSoDo = document.getElementById("so-do-ghe");
    let phong = danhSachPhong.find(p => p.id == id);
    hienThiSoDo.innerHTML = "";
    for(let i = 0; i < phong.soHang; i++){
        let maHang = String.fromCharCode(65 + i);
        let divHang = document.createElement("div");
        divHang.className = "hang-ghe";
        for(let j = 1; j <= phong.soGheMoiHang; j++){
            let ghe = document.createElement("button");
            let maGhe = maHang + j;
            ghe.textContent = maHang + j;
            ghe.className = "ghe";
            divHang.appendChild(ghe);
            if(suatDangChon.gheDaDat.includes(maGhe)){
                ghe.classList.add("da-dat");
                ghe.disabled = true;
            }
            else{
                ghe.onclick = function(){
                    ghe.classList.toggle("dang-chon");
                    if(ghe.classList.contains("dang-chon")){
                        gheDangChon.push(maGhe);
                    }
                    else{
                        gheDangChon = gheDangChon.filter(g => g != maGhe);
                    }
                    capNhatThongTin();
                }
            }
        }
        hienThiSoDo.appendChild(divHang);
    }
}
function datVe(){
    if(gheDangChon.length == 0){
        alert("Vui lòng chọn ghế");
        return;
    }
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let suatChieu = danhSachSuatChieu.find(s => s.id == suatDangChon.id);
    let danhSachPhong = getData("danhSachPhong");
    let phong = danhSachPhong.find(p => p.id == suatChieu.phongID);
    let donGia = phong.giaVe;
    let tongTien = donGia*gheDangChon.length;
    let danhSachVe = getData("danhSachVe");
    let username = getData("NguoiDung");
    let veMoi = {
        id: taoIdMoi(danhSachVe),
        nguoiDung: username,
        suatChieuID: suatChieu.id,
        danhSachGhe: [...gheDangChon],
        soLuongVe: gheDangChon.length,
        donGia: donGia,
        tongTien: tongTien,
        thoiGianDat: new Date().toISOString()
    };
    danhSachVe.push(veMoi);
    saveData("danhSachVe", danhSachVe);
    suatChieu.gheDaDat.push(...gheDangChon);
    saveData("danhSachSuatChieu", danhSachSuatChieu);
    alert("Đặt vé thành công");
    gheDangChon = [];
    suatDangChon = suatChieu;
    taoSoDoGheDatVe(suatChieu.phongID);
}
function capNhatThongTin(){
    let hienThiGhe = document.getElementById("ds-ghe-chon");
    let tongTien = document.getElementById("tong-tien");
    if (!suatDangChon || gheDangChon.length == 0) {
        hienThiGhe.textContent = "Chưa chọn";
        tongTien.textContent = "0 đ";
        return;
    }
    let danhSachPhong = getData("danhSachPhong")
    let phong = danhSachPhong.find(p => p.id == suatDangChon.phongID);
    if (gheDangChon.length == 0) {
        hienThiGhe.textContent = "Chưa chọn";
        tongTien.textContent = "0 đ";
    } else {
        hienThiGhe.textContent = gheDangChon.join(", ");
        tongTien.textContent = (gheDangChon.length * phong.giaVe).toLocaleString("vi-VN") + " đ";
    }
}
function moPopupVe(){

    if(!suatDangChon){
        alert("Vui lòng chọn suất chiếu");
        return;
    }

    if(gheDangChon.length == 0){
        alert("Vui lòng chọn ghế");
        return;
    }

    let danhSachPhong = getData("danhSachPhong");
    let phong = danhSachPhong.find(p => p.id == suatDangChon.phongID);

    let danhSachPhim = getData("danhSachPhim");
    let phim = danhSachPhim.find(p => p.id == id);

    let tongTien = phong.giaVe * gheDangChon.length;

    document.getElementById("popupTenPhim").textContent = phim.tenPhim;
    document.getElementById("popupNgay").textContent = dinhDangNgay(suatDangChon.ngay);
    document.getElementById("popupGio").textContent = suatDangChon.gio;
    document.getElementById("popupSuat").textContent =  "Phòng " + phong.tenPhong;    
    document.getElementById("popupGhe").textContent = gheDangChon.join(", ");
    document.getElementById("popupTien").textContent =
        tongTien.toLocaleString("vi-VN") + " đ";

    document.getElementById("popupVe").style.display = "flex";
}
function dongPopup(){
    document.getElementById("popupVe").style.display = "none";
}
function xacNhanMuaVe(){

    dongPopup();

    datVe();

}