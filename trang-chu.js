
let overview = document.getElementById("overview");

function hienThi(){
    let danhSachPhim = getData("danhSachPhim");
    overview.innerHTML = "";

    for(let phim of danhSachPhim){

        let the = document.createElement("div");

        the.className = "thephim";

        the.innerHTML = `
        <div class="poster">
            <img src="${phim.anh}">
        </div>
        <h3>
        <a href="chiTiet.html?id=${phim.id}" class="ten-phim">
            ${phim.tenPhim}
        </a>
    </h3>
        <p>${phim.theLoai.join(" • ")}</p>
        <p>${phim.thoiLuong}</p>
        <button class="buy">MUA VÉ</button>
        `;
        overview.appendChild(the);
    }
}
let btnDang = document.getElementById("dangChieu");
let btnSap = document.getElementById("sapChieu");

let tab = localStorage.getItem("tab");

    
btnDang.onclick = function () {
    localStorage.setItem("tab", "dang");
    hienThi(dangChieu); 
    btnDang.classList.add("chon");
    btnSap.classList.remove("chon");
}
btnSap.onclick = function () {
    localStorage.setItem("tab", "sap");
    hienThi(sapChieu);
    btnSap.classList.add("chon");
    btnDang.classList.remove("chon");
}
if (tab == "sap") {
    hienThi(sapChieu);  
    btnSap.classList.add("chon");
} else {
    hienThi(dangChieu);
    btnDang.classList.add("chon");
}