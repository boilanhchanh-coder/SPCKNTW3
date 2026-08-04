let username = getData("NguoiDung");
document.getElementById("tenTaiKhoan").textContent = username;

let danhSachVe = getData("danhSachVe");

danhSachVe = danhSachVe.filter(v => v.nguoiDung == username);

let danhSachPhim = getData("danhSachPhim");
let danhSachSuatChieu = getData("danhSachSuatChieu");
let danhSachPhong = getData("danhSachPhong");

let html = "";

for (let ve of danhSachVe) {

    let suat = danhSachSuatChieu.find(s => s.id == ve.suatChieuID);

    if (!suat) continue;

    let phim = danhSachPhim.find(p => p.id == suat.phimID);

    let phong = danhSachPhong.find(p => p.id == suat.phongID);

    html += `
        <tr>
            <td>${phim.tenPhim}</td>
            <td>${suat.ngay}</td>
            <td>${suat.gio}</td>
            <td>Phòng ${phong.tenPhong}</td>
            <td>${ve.danhSachGhe.join(", ")}</td>
            <td>${ve.tongTien.toLocaleString("vi-VN")} đ</td>
        </tr>
    `;
}

document.getElementById("bangVe").innerHTML = html;