function tongDoanhThu(){
    let danhSachVe = getData("danhSachVe");
    let hienThi = document.querySelector(".doanhthu");
    let tong = 0;
    danhSachVe.forEach(v => {
        tong += v.tongTien;
    });
    hienThi.textContent =tong.toLocaleString("vi-VN") + " đ";
}
tongDoanhThu();
function veDaBan(){
    let danhSachVe = getData("danhSachVe");
    let hienThi = document.querySelector(".veDaBan");
    let tongVe = 0;
    danhSachVe.forEach(v => {
        tongVe += v.soLuongVe;
    });
    hienThi.textContent = tongVe;
}
veDaBan();
function tyLeLapDayTrungBinh(){
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let danhSachPhong = getData("danhSachPhong");
    let hienThi = document.querySelector(".tyLeTB");
    if (danhSachSuatChieu.length === 0) hienThi.textContent = "0%";
    else{
        let tongTyLe = 0;
        danhSachSuatChieu.forEach(s => {
            let phong = danhSachPhong.find(p => p.id = s.phongID);
            if (!phong) return;
            
            let tongGhe = phong.soHang * phong.soGheMoiHang;
            let slGheDaBan = s.gheDaDat.length;
            let tyLeSuat = (slGheDaBan / tongGhe) * 100;
            tongTyLe += tyLeSuat;
        });
        let trungBinh = Math.round(tongTyLe/danhSachSuatChieu.length);
        hienThi.textContent = trungBinh + "%";
    }
}
tyLeLapDayTrungBinh();
function tongSuatChieu(){
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let hienThi = document.querySelector(".suatChieu");
    hienThi.textContent = danhSachSuatChieu.length;
}
tongSuatChieu();
function thongKeLuongNguoiXemTheoPhim(){
    let danhSachVe = getData("danhSachVe");
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let danhSachPhim = getData("danhSachPhim");
    let thongKe = [];
    danhSachVe.forEach(ve => {
        let suat = danhSachSuatChieu.find(s => s.id == ve.suatChieuID);
        if (!suat) return;
        let daCo = thongKe.find(item => item.phimID === suat.phimID);

        if (!daCo){
            let phim = danhSachPhim.find(p => p.id == suat.phimID);
            daCo = {
                phimID: suat.phimID,
                tenPhim: phim ? phim.tenPhim : "(Đã xóa)",
                soGhe: 0
            };
            thongKe.push(daCo);
        }
        daCo.soGhe += ve.soLuongVe;
    });
    thongKe.sort((a,b) => b.soGhe - a.soGhe)
    return thongKe;
}
function renderThongKeLuongNguoiXem(){
    let xepHang = thongKeLuongNguoiXemTheoPhim();
    let top3 = xepHang.slice(0, 3);
    if (top3.length === 0) return;
    let docaonhat = top3[0].soGhe;
    let hienThi = document.getElementById("topphim");
    hienThi.innerHTML = "";
    top3.forEach(top => {
        let phanTram = (top.soGhe / docaonhat) * 100;
        let dong = document.createElement("div");
        dong.className = "dong-top-phim";
        dong.innerHTML = `
            <div class="ten-va-chi-so">
                <span>${top.tenPhim}</span>
                <span class="chi-so">${top.soGhe}</span>
            </div>
            <div class="thanh-nen">
                <div class="thanh-day" style="width: ${phanTram}%;"></div>
            </div>
        `;
        hienThi.appendChild(dong);
    });
}
renderThongKeLuongNguoiXem();
function tyLeLapDayTheoSuatChieu(){
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let danhSachPhong = getData("danhSachPhong");
    let danhSachPhim = getData("danhSachPhim");

    let thongKe = [];

    danhSachSuatChieu.forEach(s => {
        let phong = danhSachPhong.find(p => p.id == s.phongID);
        if (!phong) return;

        let phim = danhSachPhim.find(p => p.id == s.phimID);
        let tongGhe = phong.soHang * phong.soGheMoiHang;
        let gheDaBan = s.gheDaDat.length;
        let phanTram = Math.round((gheDaBan/tongGhe)*100);

        thongKe.push({
            tenPhim: phim.tenPhim,
            phanTram: phanTram,
            tenPhong: phong.tenPhong
        });
    });
    thongKe.sort((a, b) => b.phanTram - a.phanTram);
    return thongKe;
}
function renderTyLeLapDay(){
    let danhSach = tyLeLapDayTheoSuatChieu();
    let top3 = danhSach.slice(0, 3);
    if (top3.length === 0) return;
    let docaonhat = top3[0].soGhe;
    let hienThi = document.getElementById("tyle");
    hienThi.innerHTML = "";
    top3.forEach(top => {
        let dong = document.createElement("div");
        dong.className = "dong-top-phim";
        dong.innerHTML = `
            <div class="ten-va-chi-so">
                <span>${top.tenPhim + " - Phòng " + top.tenPhong}</span>
                <span class="chi-so">${top.phanTram}%</span>
            </div>
            <div class="thanh-nen">
                <div class="thanh-day" style="width: ${top.phanTram}%;"></div>
            </div>
        `;
        hienThi.appendChild(dong);
    });
}
renderTyLeLapDay();