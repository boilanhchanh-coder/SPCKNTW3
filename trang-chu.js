
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
        
        <p>${phim.thoiLuong + " phút    "}</p>
        <button class="buy" onclick="moMuaVe(${phim.id})">
            MUA VÉ
        </button>
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
function moMuaVe(id){
    let danhSachPhim = getData("danhSachPhim");
    let phim = danhSachPhim.find(p => p.id == id);
    document.getElementById("popup").innerHTML = `
    <div class="nen-mo">
        <div class="hop-mua-ve">
            <div class="tieu-de-popup">
                <h2>LỊCH CHIẾU - ${phim.tenPhim}</h2>
                <span class="dong-popup" onclick="dongPopup()">×</span>
            </div>
            <div class="danh-sach-ngay">
                <div class="ngay">
                    <p>Hôm nay</p>
                    <span>27/07</span>
                </div>

                <div class="ngay">
                    <p>Thứ 3</p>
                    <span>28/07</span>
                </div>

                <div class="ngay">
                    <p>Thứ 4</p>
                    <span>29/07</span>
                </div>

                <div class="ngay">
                    <p>Thứ 5</p>
                    <span>30/07</span>
                </div>

                <div class="ngay">
                    <p>Thứ 6</p>
                    <span>31/07</span>
                </div>
                <div class="ngay">
                    <p>Thứ 7</p>
                    <span>01/08</span>
                </div>
                <div class="ngay">
                    <p>Thứ 6</p>
                    <span>31/07</span>
                </div>
                <div class="ngay">
                    <p>Chủ nhật</p>
                    <span>02/08</span>
                </div>
            </div>
            <div class="loai-phong">

                <h3>PHÒNG THƯỜNG</h3>

                <div class="danh-sach-gio">

                    <button class="gio">09:00</button>
                    <button class="gio">11:30</button>
                    <button class="gio">14:00</button>
                    <button class="gio">16:30</button>
                    <button class="gio">19:00</button>

                </div>

            </div>

            <div class="loai-phong">

                <h3>PHÒNG VIP</h3>

                <div class="danh-sach-gio">

                    <button class="gio">09:00</button>
                    <button class="gio">11:30</button>
                    <button class="gio">14:00</button>
                    <button class="gio">16:30</button>
                    <button class="gio">19:00</button>

                </div>

            </div>
        </div>
    </div>
    `;
}
function dongPopup(){
    document.getElementById("popup").innerHTML = "";
}