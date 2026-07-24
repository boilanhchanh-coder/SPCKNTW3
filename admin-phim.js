//Số lượng Phim
function soLuongPhim(){
    let tongPhim = document.querySelector(".so-luong-phim");
    let danhSachPhim = getData("danhSachPhim");
    tongPhim.textContent = danhSachPhim.length;
}
soLuongPhim();
//Hiển thị danh sách Phim
function renderDanhSachPhim(){
    let danhSachPhim = getData("danhSachPhim");
    let bangHienThi = document.querySelector(".hien-thi-phim");
    bangHienThi.innerHTML = "";
    danhSachPhim.forEach(phim => {
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
                <button onclick="xoaPhim(${phim.id})" class="btn-xoa-phim">Xóa</button>
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
//Đóng mở modal Thêm phim
function openModal(){
    let ok = document.querySelector(".modal");
    ok.style.display = "flex";
};
function closeModal(){
    let ok = document.querySelector(".modal");
    ok.style.display = "none";
}
//Modal thêm phim
document.getElementById("anh-gallery").addEventListener("click", e => {
    if (!e.target.classList.contains("anh-item")) return;
    document.querySelectorAll(".anh-item").forEach(img => img.classList.remove("selected"));
    e.target.classList.add("selected");

    const src = e.target.dataset.src;
    document.getElementById("anh-phim").value = src;

    const preview = document.getElementById("anh-xem-truoc");
    preview.src = src;
    preview.style.display = "block";
    document.getElementById("anh-placeholder").style.display = "none";
});
function renderTheLoai(){
    let hienthi = document.getElementById("theloai-list");
    hienthi.innerHTML = "";
    danhSachTheLoai.forEach(tl => {
        let label = document.createElement("label");
        label.className = "chip";
        label.innerHTML = `<input type="checkbox" value="${tl}"> ${tl}`;
        hienthi.appendChild(label);
    });
}
renderTheLoai();
//Hàm tạo ID
function taoIdMoi(danhSachPhim){
    let idLonNhat = Math.max(...danhSachPhim.map(p => p.id));
    return idLonNhat + 1;
}
//Thêm phim
function themPhim(){
    let danhSachPhim = getData("danhSachPhim")
    let ten = document.getElementById("ten-phim").value;
    let anh = document.getElementById("anh-phim").value;
    let thoiLuong = document.getElementById("thoi-luong").value;
    let moTa = document.getElementById("mo-ta").value;
    let theLoai = document.querySelectorAll("#theloai-list input:checked");
    let danhSachTL = [];
    theLoai.forEach(tl => danhSachTL.push(tl.value));
    if (ten === "" || !anh || theLoai.length === 0 || isNaN(thoiLuong)){
        alert("Vui lòng nhập đầy đủ tên phim, chọn ảnh, ít nhất 1 thể loại và thời lượng hợp lệ.");
        return;
    }
    let phim = {
        tenPhim: ten,
        theLoai: danhSachTL,
        thoiLuong: thoiLuong,
        moTa: moTa,
        trangThai: "Sắp chiếu",
        anh: anh,
        id: taoIdMoi(danhSachPhim)
    };
    danhSachPhim.push(phim);
    saveData("danhSachPhim", danhSachPhim);
    soLuongPhim();
    renderDanhSachPhim();
    closeModal();
}
//Xóa phim
function xoaPhim(id){
    let danhSachPhim = getData("danhSachPhim");
    let viTri = danhSachPhim.findIndex(p => p.id == id);
    danhSachPhim.splice(viTri, 1);
    saveData("danhSachPhim", danhSachPhim);
    soLuongPhim();
    renderDanhSachPhim();
}