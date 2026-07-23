
let dangChieu = [
    {
        ten: "Colony : Bầy xác sống",
        theloai: "Hành động • Hồi hộp • Khoa học viễn tưởng",
        thoiluong: "122 phút",
        anh: "images/colony.jpg",
        
    },
    {
        ten: "Your Name",
        theloai: "Hoạt hình • Lãng mạn • Giả tưởng",
        thoiluong: "106 phút",
        anh: "images/yourname.jpg",
        
        
    },
    {
        ten: "Mẹ ơi về nhà",
        theloai: "Tâm lý • Tình cảm",
        thoiluong: "140 phút",
        anh: "images/movn.jpg",
        
    },
    {
        ten: "Doraemon : Nobita và lâu đài dưới đáy biển",
        theloai: "Hoạt hình • Phiêu lưu",
        thoiluong: "101 phút",
        anh: "images/doraemon.jpg",
        
    },
    {
        ten: "Tạm Biệt Gohan",
        theloai: "Gia đình • Chính kịch • Tình cảm • Phiêu lưu",
        thoiluong: "140 phút",
        anh: "images/gohan.jpg",
        
    },
    {
        ten: "ÁM ẢNH (OBSESSION)",
        theloai: "Kinh dị • Tâm lý • Lãng mạn",
        thoiluong: "108 phút",
        anh: "images/amanh.jpg",
        
    },
    {
        ten: "Chú Thuật Hồi Chiến",
        theloai: "Hoạt hình • Hành động • Giả tưởng • Siêu nhiên",
        thoiluong: "111 phút",
        anh: "images/hoaingoc.jpg",
        
    },
    {
        ten: "MINIONS & QUÁI VẬT",
        theloai: "Gia đình • Hài hước • Hoạt hình • Phiêu lưu • Giả tưởng",
        thoiluong: "90 phút",
        anh: "images/minion.jpg",
        
    },
    {
        ten: "PHIM ĐIỆN ẢNH – LỚP HỌC ÁM SÁT",
        theloai: "Hoạt hình",
        thoiluong: "86 phút",
        anh: "images/lhas.jpg",
        
    },
    {
        ten: "Hành trình của MOANA",
        theloai: "Gia đình • Hài hước",
        thoiluong: "116 phút",
        anh: "images/moana.jpg",
        
    },
    {
        ten: "Thực thể quỷ nguyệt",
        theloai: "Kinh dị • Giật gân",
        thoiluong: "110 phút",
        anh: "images/ttqn.jpg",
        
    },
    {
        ten: "Đồng dao ma quái",
        theloai: "Hồi hộp • Kinh dị",
        thoiluong: "123 phút",
        anh: "images/ddmq.jpg",
        
    }
];
let sapChieu = [
    {
        ten: "Shin, Cậu bé bút chì: Kỳ nghỉ yêu quái của tớ",
        theloai: "Hoạt hình, Phiêu lưu, Giả tưởng",
        thoiluong: "Chưa công bố",
        anh: "images/shin.jpg",
        
    },

    {
        ten: "Người nhện: Khởi đầu mới",
        theloai: "Hành động, Phiêu lưu, Siêu anh hùng",
        thoiluong: "Chưa công bố",
        anh: "images/spiderman.jpg",
        
    },
    {
        ten: "Thám tử lừng danh Conan: Thiên thần sa ngã trên xa lộ ",
        theloai: "Hoạt hình, Hành động, Bí ẩn",
        thoiluong: "Chưa công bố",
        anh: "images/conan.jpg",
        
    },
    {
        ten: "Quỷ bắt hồn",
        theloai: "Kinh dị",
        thoiluong: "Chưa công bố",
        anh: "images/qbh.jpg",
        
    },
    {
        ten: "Mùi cỏ cháy",
        theloai: "Lịch sử",
        thoiluong: "97 phút",
        anh: "images/mcc.jpg",
        
    },
    {
        ten: "Thư tình gửi ngoại",
        theloai: "Gia đình, Tâm lý ",
        thoiluong: "118 phút",
        anh: "images/ttgn.jpg",
        
    },
    {
        ten: "Agito: Cuộc chiến siêu năng lực",
        theloai: "Khoa học, Viễn tưởng",
        thoiluong: "97 phút",
        anh: "images/ccsnl.jpg",
        
    },
    {
        ten: "Ngày tàn của phố Oak",
        theloai: "Hành động, Hồi hộp",
        thoiluong: "99 phút",
        anh: "images/ntcpo.jpg",
        
    }
];
let overview = document.getElementById("overview");

function hienThi(dsPhim){

    overview.innerHTML = "";

    for(let phim of dsPhim){

        let the = document.createElement("div");

        the.className = "thephim";

        the.innerHTML = `
        <div class="poster">
            <img src="${phim.anh}">
            

           
        </div>

        <h3>
            <a href="${phim.link || '#'}" class="ten-phim">
                ${phim.ten}
            </a>
        </h3>

        <p>${phim.theloai}</p>

        <p>${phim.thoiluong}</p>


        <button class="buy">MUA VÉ</button>
        `;

        overview.appendChild(the);
    }
}
hienThi(dangChieu);
let btnDang = document.getElementById("dangChieu");
let btnSap = document.getElementById("sapChieu");

btnDang.onclick = function(){

    hienThi(dangChieu);

    btnDang.classList.add("chon");
    btnSap.classList.remove("chon");

}

btnSap.onclick = function(){

    hienThi(sapChieu);

    btnSap.classList.add("chon");
    btnDang.classList.remove("chon");

}