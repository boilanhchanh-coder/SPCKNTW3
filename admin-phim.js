function openModal(){
    let ok = document.querySelector(".modal");
    ok.style.display = "flex";
};
function closeModal(){
    let ok = document.querySelector(".modal");
    ok.style.display = "none";
}
//Số lượng Phim
function soLuongPhim(){
    let tongPhim = document.querySelector(".so-luong-phim");
    let danhSachPhim = getData("danhSachPhim");
    tongPhim.textContent = danhSachPhim.length;
}
soLuongPhim();
//Thêm phim
function themPhim(){
    let tenPhim = document.getElementById("ten-phim").value;
    let theLoai = document.getElementById("the-loai").value;
    let thoiLuong = document.getElementById("thoi-luong").value;
    let moTa = document.getElementById("mo-ta").value;
    let trangThai = "Sắp chiếu";
    
}
//Hiển thị danh sách Phim
function renderDanhSachPhim(mangHienThi){
    let danhSachPhim = getData("danhSachPhim");
    let mang = mangHienThi || danhSachPhim;
    let bangHienThi = document.querySelector(".hien-thi-phim");
    bangHienThi.innerHTML = "";
    mang.forEach(phim => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="ten-phim">${phim.tenPhim}</td>
            <td>${phim.theLoai.join(", ")}</td>
            <td>${phim.thoiLuong} phút</td>
            <td>
                <select onchange="doiTrangThai(${phim.id}, this.value)" id="status" class="${phim.trangThai.replaceAll(" ", "")}">
                    <option value="Sắp chiếu" ${phim.trangThai === "Sắp chiếu" ? "selected" : ""}>Sắp chiếu</option>
                    <option value="Đang chiếu" ${phim.trangThai === "Đang chiếu" ? "selected" : ""}>Đang chiếu</option>
                    <option value="Ngừng chiếu" ${phim.trangThai === "Ngừng chiếu" ? "selected" : ""}>Ngừng chiếu</option>
                </select>
            </td>
            <td>
                <button class="btn-suat-chieu">Suất chiếu</button>
                <button class="btn-xoa-phim">Xóa</button>
            </td>
        `;
        bangHienThi.appendChild(row);
    });
}
renderDanhSachPhim();
//Đổi trạng thái phim
function doiTrangThai(id, trangThaiMoi){
    let danhSachPhim = getData("danhSachPhim");
    let phim = danhSachPhim.find(p => p.id == id);
    let select = document.getElementById("status");
    select.classList.remove("Đangchiếu", "Sắpchiếu", "Ngừngchiếu");
    select.classList.add(select.value.replaceAll(" ", ""));
    phim.trangThai = trangThaiMoi;
    saveData("danhSachPhim", danhSachPhim);
    renderDanhSachPhim();
}