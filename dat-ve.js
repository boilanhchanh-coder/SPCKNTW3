let id = new URLSearchParams(location.search).get("id");
function hienThiNgay(id){
    let danhSachPhim = getData("danhSachPhim");
    let danhSachSuatChieu = getData("danhSachSuatChieu");
    let phim = danhSachPhim.find(s => s.id == id);
    let box = document.getElementById("hien-thi-ngay");
    box.innerHTML = "";
    if (phim){
        let suatChieu = danhSachSuatChieu.filter(s => s.phimID == id);
        suatChieu.forEach(s => {
            let btn = document.createElement("button");
            btn.className = "ngay";
            btn.innerHTML = `
                <span>${s.ngay}</span>
            `;
        });
        box.appendChild(btn);
    }
}
hienThiNgay(id);
console.log(box);