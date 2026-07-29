let id = new URLSearchParams(location.search).get("id");
let ngayDangChon = null;
let suatDangChon = null;
let gheDangChon = [];
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
        };
        box.appendChild(btn);
    });
    box.querySelector(".ngay").click();
}
hienThiNgay();
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
            chonSuatChieu(s.id);   // hàm bạn đã có sẵn để hiện sơ đồ ghế
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
}
function datVe(){
    if(gheDangChon.length == 0){
        alert("Vui lòng chọn ghế");
        return;
    }
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let suatChieu = danhSachSuatChieu.find(s => s.id == suatDangChon.id);
    suatChieu.gheDaDat.push(...gheDangChon);
    saveData("danhSachSuatChieu", danhSachSuatChieu);
    alert("Đặt vé thành công");
    gheDangChon = [];
    taoSoDoGheDatVe(suatChieu.phongID);
    suatDangChon = suatChieu;
}
function capNhatThongTin(){
    let danhSachPhong = getData("danhSachPhong")
    let phong = danhSachPhong.find(p => p.id == suatDangChon.phongID);
    let hienThiGhe = document.getElementById("ds-ghe-chon");
    let tongTien = document.getElementById("tong-tien");
    if (gheDangChon.length == 0) {
        hienThiGhe.textContent = "Chưa chọn";
        tongTien.textContent = "0 đ";
    } else {
        hienThiGhe.textContent = gheDangChon.join(", ");
        tongTien.textContent = (gheDangChon.length * phong.giaVe).toLocaleString("vi-VN") + " đ";
    }
}