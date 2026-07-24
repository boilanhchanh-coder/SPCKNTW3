//Số lượng phòng chiếu
function soLuongPhong(){
    let soPhong = document.querySelector(".so-luong-phong");
    let danhSachPhong = getData("danhSachPhong");
    soPhong.textContent = danhSachPhong.length;
}
soLuongPhong();
//Số lượng ghế từng phòng
function soLuongGhe(){
    let soGhe = document.querySelector(".tong-so-luong-ghe");
    let danhSachPhim = getData("danhSachPhim");
    soGhe.textContent = danhSachPhim.length;
}
soLuongGhe();
//Tổng số ghế
function tongSoGhe(){
    let soGhe = document.querySelector(".tong-so-luong-ghe");
    let tongGhe = 0;
    let danhSachPhong = getData("danhSachPhong");
    danhSachPhong.forEach(p => {
        tongGhe += p.soHang*p.soGheMoiHang;
    });
    soGhe.textContent = tongGhe;
    
}
tongSoGhe()
//Hiển thị danh sách phòng
function renderDanhSachPhong(){
    let danhSachPhong = getData("danhSachPhong");
    let bangHienThi = document.querySelector(".hien-thi-phong-chieu");
    bangHienThi.innerHTML = "";
    danhSachPhong.forEach(phong => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="ten-phong">Phòng ${phong.tenPhong}</td>
            <td>${phong.soHang}</td>
            <td>${phong.soGheMoiHang}</td>
            <td>${phong.soHang*phong.soGheMoiHang}</td>
            <td>${phong.loaiVe}</td>
            <td>
                <button onclick="openModal('modalSoDoGhe'); taoSoDoGhe(${phong.id})" class="btn-so-do">Sơ đồ</button>
                <button onclick="xoaPhong(${phong.id})" class="btn-xoa-phong">Xóa</button>
            </td>
        `;
        bangHienThi.appendChild(row);
    });
}
renderDanhSachPhong();
//Thêm phòng
function themPhong(){
    let danhSachPhong = getData("danhSachPhong");
    let tenPhong = document.getElementById("ten-phong").value;
    let soHang = document.getElementById("so-hang").value;
    let soGheMoiHang = document.getElementById("so-ghe-moi-hang").value;
    let loaiVe = document.getElementById("loai-ve").value;
    let phong = {
        tenPhong: tenPhong,
        soHang: soHang,
        soGheMoiHang: soGheMoiHang,
        loaiVe: loaiVe,
        id: taoIdMoi(danhSachPhong),
        giaVe: bangGiaVe[loaiVe]
    }
    danhSachPhong.push(phong);
    saveData("danhSachPhong", danhSachPhong);
    renderDanhSachPhong();
    soLuongPhong();
    tongSoGhe();
    document.getElementById("ten-phong").value = "";
    document.getElementById("so-hang").value = "";
    document.getElementById("so-ghe-moi-hang").value = "";
    document.getElementById("loai-ve").value = "Thường";
    closeModal();
}
//Xóa phòng
function xoaPhong(id){
    let danhSachPhong = getData("danhSachPhong");
    let viTri = danhSachPhong.findIndex(p => p.id == id);
    danhSachPhong.splice(viTri, 1);
    saveData("danhSachPhong", danhSachPhong);
    renderDanhSachPhong();
    soLuongPhong();
    tongSoGhe();
}
//Sơ đồ ghế
function taoSoDoGhe(id){
    let danhSachPhong = getData("danhSachPhong");
    let hienThiTen = document.getElementById("htTenPhong");
    let hienThiSoDo = document.getElementById("so-do-ghe");
    let phong = danhSachPhong.find(p => p.id == id);
    hienThiTen.innerHTML = phong.tenPhong;
    hienThiSoDo.innerHTML = "";
    for(let i = 0; i < phong.soHang; i++){
        let maHang = String.fromCharCode(65 + i);
        let divHang = document.createElement("div");
        divHang.className = "hang-ghe";
        for(let j = 1; j <= phong.soGheMoiHang; j++){
            let ghe = document.createElement("button");
            ghe.textContent = maHang + j;
            ghe.className = "ghe";
            divHang.appendChild(ghe);
        }
        hienThiSoDo.appendChild(divHang);
    }
}   