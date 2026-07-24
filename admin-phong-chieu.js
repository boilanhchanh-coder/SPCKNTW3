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
    let danhSachPhim = getData("danhSachPhim");
    soGhe.textContent = danhSachPhim.length;
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
            <td class="ten-phong">${phong.tenPhong}</td>
            <td>${phong.soHang}</td>
            <td>${phong.soGheMoiHang}</td>
            <td>${phong.soHang*phong.soGheMoiHang}</td>
            <td>${phong.loaiVe}</td>
            <td>
                <button class="btn-so-do">Sơ đồ</button>
                <button onclick="xoaPhhong(${phong.id})" class="btn-xoa-phim">Xóa</button>
            </td>
        `;
        bangHienThi.appendChild(row);
    });
}
renderDanhSachPhong();