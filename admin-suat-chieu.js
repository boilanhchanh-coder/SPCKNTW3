//Drop-down list chọn phim, chọn phòng
function dropListPhimPhong(){
    let danhSachPhim = getData("danhSachPhim");
    let danhSachPhong = getData("danhSachPhong");
    let listPhim = document.getElementById("chon-phim");
    let listPhong = document.getElementById("chon-phong");
    listPhim.innerHTML = "";
    listPhong.innerHTML = "";
    danhSachPhim.forEach(p => {
        let option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.tenPhim;
        listPhim.appendChild(option);
    });
    danhSachPhong.forEach(p => {
        let option = document.createElement("option");
        option.value = p.id;
        option.textContent = "Phòng " + p.tenPhong;
        listPhong.appendChild(option);
    });
}
//Check trùng giờ chiêu
function checkTrungGio(phongID, ngay, gio, thoiLuongMoi){
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let danhSachPhim = getData("danhSachPhim");

    let batDauMoi = new Date(ngay + "T" + gio);
    let ketThucMoi = new Date(batDauMoi.getTime() + thoiLuongMoi * 60000);

    return danhSachSuatChieu.some(s => {
        if (s.phongID != phongID || s.ngay !== ngay) return false;

        let phimCu = danhSachPhim.find(p => p.id == s.phimID);
        let thoiLuongCu = phimCu ? phimCu.thoiLuong : 120;

        let batDauCu = new Date(s.ngay + "T" + s.gio);
        let ketThucCu = new Date(batDauCu.getTime() + thoiLuongCu * 60000);

        return batDauMoi < ketThucCu && ketThucMoi > batDauCu;
    });
}
//Thêm suất chiếu
function themSuatChieu(){
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let phimID = document.getElementById("chon-phim").value;
    let phongID = document.getElementById("chon-phong").value;
    let ngay = document.getElementById("ngay-chieu").value;
    let gio = document.getElementById("gio-chieu").value;
    if (!phimID || !phongID || !ngay || !gio){
        alert("Vui lòng chọn đầy đủ phim, phòng, ngày và giờ chiếu.");
        return;
    }
    let suatChieu = {
        phimID: phimID,
        phongID: phongID,
        ngay: ngay,
        gio: gio,
        id: taoIdMoi(danhSachSuatChieu),
        trangThai: "Sắp chiếu"
    };
    danhSachSuatChieu.push(suatChieu);
    saveData("danhSachSuatChieu", danhSachSuatChieu);
    renderDanhSachSuatChieu();
}
function dinhDangNgay(ngayISO){
    let date = new Date(ngayISO);
    return date.toLocaleDateString("vi-VN");
}
//Số lượng ghế từng phòng
function soLuongGhe(phong){
    return phong.soHang*phong.soGheMoiHang;    
}
//Xóa suất chiếu
function xoaSuatChieu(id){
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let viTri = danhSachSuatChieu.findIndex(sc => sc.id == id);
    danhSachSuatChieu.splice(viTri, 1);
    saveData("danhSachSuatChieu", danhSachSuatChieu);
    renderDanhSachSuatChieu();
}
//Hiển thị danh sách suất chiếu
function renderDanhSachSuatChieu(){
    let danhSachPhim = getData("danhSachPhim");
    let danhSachPhong = getData("danhSachPhong");
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let bangHienThi = document.querySelector(".hien-thi-suat-chieu");
    bangHienThi.innerHTML = "";
    danhSachSuatChieu.forEach(s => {
        let phim = danhSachPhim.find(p => p.id == s.phimID);
        let phong = danhSachPhong.find(p => p.id == s.phongID);
        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="ten-phim">${phim ? phim.tenPhim : "<span style='color:red;'>(Đã xóa)</span>"}</td>
            <td>${phong ? phong.tenPhong : "<span style='color:red;'>(Đã xóa)</span>"}</td>
            <td>${dinhDangNgay(s.ngay)} - ${s.gio}</td>
            <td>${phong ? phong.giaVe.toLocaleString("vi-VN") + " đ" : "-"}</td>
            <td>${phong ? soLuongGhe(phong) : "-"}</td> 
            <td>
                ${phong ? `<button onclick="openModal('modalSoDo'); taoSoDoGhe('${phong.id}')" class="btn-so-do">Sơ đồ</button>` : ""}
                <button onclick="xoaSuatChieu(${s.id})" class="btn-xoa-suat-chieu">Xóa</button>
            </td>
        `;
        bangHienThi.appendChild(row);
    })
}
renderDanhSachSuatChieu();