

let id = new URLSearchParams(location.search).get("id");
function hienThiChiTiet(id){
    let danhSachPhim = getData("danhSachPhim");
    let phim = danhSachPhim.find(p => p.id == id);
    let box = document.getElementById("chiTiet");
    if (phim) {
    box.innerHTML = `
        <div class="thong-tin-phim">

            <div class="poster">
                <img src="${phim.anh}">
            </div>
            <div class="info">
                <h1>${phim.tenPhim}</h1>
                <p><b>Thể loại:</b> ${phim.theLoai}</p>
                <p><b>Thời lượng:</b> ${phim.thoiLuong + " phút"}</p>
                <h2>NỘI DUNG PHIM</h2>
                 <p>${phim.moTa}</p>
                 <button onclick="location.href='dat-ve.html?id=${phim.id}'" class="buy" id="buy">MUA VÉ</button>
            </div>
        </div>
        `;
    } else {
        box.innerHTML = "<h2>Không tìm thấy phim!</h2>";
    }
};
hienThiChiTiet(id);
function chanMuaVe(){
    let danhSachPhim = getData("danhSachPhim");
    let phim = danhSachPhim.find(p => p.id == id);
    let btn = document.getElementById("buy");
    if (phim.trangThai == "Sắp chiếu"){
        btn.textContent = "Sắp chiếu";
        btn.disabled = true;
    }
}
chanMuaVe();