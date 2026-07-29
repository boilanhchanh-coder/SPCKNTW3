
let overview = document.getElementById("overview");
function hienThi(trangThai){
    let danhSachPhim = getData("danhSachPhim");

    danhSachPhim = danhSachPhim.filter(p => p.trangThai == trangThai);

    overview.innerHTML = "";

    for(let phim of danhSachPhim){

        let the = document.createElement("div");

        the.className = "thephim";
        the.onclick = function () {
            location.href = `chiTiet.html?id=${phim.id}`;
        };

        the.innerHTML = `
        <div class="poster">
            <img src="${phim.anh}">
        </div>

        <h3>
            <a href="chiTiet.html?id=${phim.id}" class="ten-phim">
                ${phim.tenPhim}
            </a>
        </h3>

        <p>${phim.thoiLuong} phút</p>

        <button class="buy">
            MUA VÉ
        </button>
        `;

        overview.appendChild(the);
    }
}
//Đang chiếu và sắp chiếu
document.getElementById("dangChieu").classList.add("chon");
document.getElementById("sapChieu").classList.remove("chon");
hienThi("Đang chiếu");
document.getElementById("dangChieu").onclick = function(){
    document.getElementById("dangChieu").classList.add("chon");
    document.getElementById("sapChieu").classList.remove("chon");
    hienThi("Đang chiếu");
}
document.getElementById("sapChieu").onclick = function(){
    hienThi("Sắp chiếu");
    document.getElementById("sapChieu").classList.add("chon");
    document.getElementById("dangChieu").classList.remove("chon");
}