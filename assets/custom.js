$(document).ready(function () {
  wheelSpinning = true;
  let wheelPower = 13;
  let dataLucky = [];
  var solanquay = parseInt($(".so_vong_quay").text());
  // ---------------------------------------------------------------------
  // Tải âm thanh đánh dấu và chức năng phát được gọi khi pin đi qua con trỏ.
  let isPercentage = true;
  var dem = 0;
  var demnhantien = 0; // Đếm số lần click vào nút nhận tiền
  var lichsulixi = "";
  var tongtienlixi = 0;
  var tiendalixi;
  let theWheel;

  setTimeout(function () {
    theWheel = new Winwheel({
      'outerRadius': 220, // Bán kính ngoài
      'innerRadius': 0, // Size lỗ trung tâm
      'textFontSize': 24, // Size chữ
      'textOrientation': 'horizontal', // Chữ nằm ngang
      'textAlignment': 'outer', // Căn chỉnh văn bản ra bên ngoài bánh xe.
      'numSegments': 12, // Số ô
      'responsive': true,
      'lineWidth': 3,
      'textLineWidth': 1.2,
      'segments':                // Define segments.
        [
          {
            'text' : '5 Spin',
            'fillStyle': 'rgba(255,54,169,0.86)',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
          },
          {
            'text' : 'Good lucky',
            'fillStyle' : '#ff9fd6',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
          },
          {'text' : '100 LP',
            'fillStyle': '#ff36a9',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
          },
          {'text' : '500 LP',
            'fillStyle' : '#ff9fd6',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
          },
          {'text' : '1000 LP',
            'fillStyle': '#ff36a9',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
          },
          {'text' : '100 em',
            'fillStyle' : '#ff9fd6',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
          },
          {'text' : '1000 em',
            'fillStyle': '#ff36a9',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
          },
          {'text' : '10000 em',
            'fillStyle' : '#ff9fd6',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
          },
          {'text' : '100000 em',
            'fillStyle': '#ff36a9',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
          },
          {'text' : '100 Sms',
            'fillStyle' : '#ff9fd6',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
          },
          {'text' : '10 Sms',
            'fillStyle': '#ff36a9',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
          },
          {'text' : '2 Spin',
            'fillStyle' : '#ff9fd6',
            'textStrokeStyle' : '#DC0C83',
            'textFontWeight': 900,
            }
        ],
      'animation': // Chỉ định hình động để sử dụng.
        {
          'spins': 10, // Số vòng quay hoàn chỉnh mặc định.
          'callbackFinished': alertPrize,
          'callbackSound': playSound, // Chức năng gọi khi âm thanh đánh dấu được kích hoạt.
          'soundTrigger': 'pin', // Chỉ định các chân là để kích hoạt âm thanh, tùy chọn khác là 'phân đoạn'.
          'type': 'spinToStop',
          'duration': 4.5,
        },
      'pins': {
        'number': 12, // Số lượng chân. Họ không gian đều xung quanh bánh xe.
        'responsive': true,
        'fillStyle': '#e7706f',
        'outerRadius': 4,
      }
    });
  }, 1000)

  function alertPrize(indicatedSegment) {

    tiendalixi = indicatedSegment.text.replace(".000 VNĐ", "");

    if (dem < solanquay) {
      dem++;
      // Check xem đã hết lượt quay chưa
      theWheel.rotationAngle = 0; // Đặt lại góc bánh xe về 0 độ.
      theWheel.draw(); // Gọi draw để hiển thị các thay đổi cho bánh xe.
      wheelSpinning = false; // Đặt lại thành false thành các nút nguồn và quay có thể được bấm lại.

      $(".nutbatdau").css("background-image", "url(/sites/all/themes/mirai/lucky/img/contro.png)"); // Hiển thị lại nút Quay
      if (indicatedSegment.text == 'Ô mất lượt') { // Nếu quay vào 0k
        matluot.play(); // Bật nhạc fail
        swal("Rất tiếc!", "Bạn không nhận được đồng nào\nNhưng bạn còn lại " + (solanquay - dem) + " lần quay, cố gắng lên nào!", "error");
      } else { // Nếu không quay vào 0k
        votay.play(); // Bật nhạc vỗ tay
        $.ajax({
          url: '/update-lucky',
          type: 'post',
          dataType: 'json',
          data: {
            token: $("#tokenbody").val(),
          },
          beforeSend: function () {
            // $.blockUI();
          },
          success: function (data) {
            $(".so_luot_da_quay").text(data)
          },
          complete: function () {
          },
          error: function (r1, r2) {
          }
        })
        Swal.fire({
          title: "Giải thưởng ",
          confirmButtonText: 'Xác nhận',
          icon: 'success',
          showCancelButton: true,
          html: `
<h4>` + indicatedSegment.text + `</h4>
<h3><strong class="text-danger">` + indicatedSegment.price + `</strong></h3>
<p><img width="150px" src="` + indicatedSegment.image + `"></p>
<p>` + $(".noi_dung_tieu_đe").html() + `</p>
      <input type="text" id="ho_ten" class="swal2-input" style="margin: unset;width: 100%; margin-bottom: 15px" placeholder="Họ tên">
      <input type="number" id="dien_thoai" class="swal2-input" style="margin: unset;width: 100%; margin-bottom: 15px" placeholder="Điện thoại">
      <input type="email" id="email" class="swal2-input" style="margin: unset;width: 100%; margin-bottom: 15px" placeholder="Email">
    `,
          focusConfirm: false,
          preConfirm: () => {
            const email = Swal.getPopup().querySelector('#email').value;
            const dien_thoai = Swal.getPopup().querySelector('#dien_thoai').value;
            const ho_ten = Swal.getPopup().querySelector('#ho_ten').value;

            // Kiểm tra dữ liệu đầu vào
            if (ho_ten == "") {
              Swal.showValidationMessage('Vui lòng nhập họ tên');
              return false;
            }
            if (dien_thoai.length != 10) {
              Swal.showValidationMessage('Vui lòng nhập đúng định dạng số điện thoại');
              return false;
            }
            if (!isValidEmail(email)) {
              Swal.showValidationMessage('Email không đúng định dạng');
              return false;
            }
            //form 1
            return $.ajax({
              url: '/submit-lucky',
              type: 'post',
              dataType: 'json',
              data: {
                token: $("#tokenbody").val(),
                data: {

                  field_email: $("#email").val(),
                  field_ho_ten: $("#ho_ten").val(),
                  field_dien_thoai: $("#dien_thoai").val(),
                  field_giai_thuong: indicatedSegment.text,
                },
                gia_tri: indicatedSegment.price,
                nid: indicatedSegment.nid,
              },
              beforeSend: function () {
                // $.blockUI();
              },
              success: function (data) {
                Swal.fire({
                  icon: 'success',
                  title: data.content,
                })
              },
              complete: function () {
                // $.unblock()
              },
              error: function (r1, r2) {
              }
            })


          },
          allowOutsideClick: () => !Swal.isLoading()

        })
      }
      if (dem == solanquay) {
        $(".nutbatdau").css("background-image", "url(/sites/all/themes/mirai/lucky/img/controhetluot.png)");
      }
    }
  }
  function playSound() {

  }
  function randomIndex(prizes) {
    var counter = 1;
    let prizeIndex = 0;
    for (let i = 0; i < prizes.length; i++) {
      if (prizes[i].number == 0) {
        counter++
      }
    }
    if (counter == prizes.length) {
      return null
    }
    //Tinh tong % mon qua hien có
    $sunPercent = 0;
    for (var i = prizes.length - 1; i >= 0; i--) {
      if (parseInt(prizes[i].field_so_luot) > 0) {
        $sunPercent += parseFloat(prizes[i].percentpage);
      }
    }
    //Kiểm tra phần trăm
    let rand = Math.random();
    if (rand > $sunPercent) {
      rand = $sunPercent;
    }
    var sum = 0;
    for (var i = prizes.length - 1; i >= 0; i--) {
      if (prizes[i].percentpage > 0) {
        if (parseInt(prizes[i].field_so_luot) > 0) {
          sum += parseFloat(prizes[i].percentpage)
          if (rand <= sum) {
            prizeIndex = i;
            break;
          }

        }
      }
    }
    if (prizes[prizeIndex].number != 0) {
      prizes[prizeIndex].number = prizes[prizeIndex].number - 1
      return prizeIndex

    } else {
      return randomIndex(prizes)
    }
  }

  function startSpin() {
    // Nút quay không nhấp được khi đang chạy
    // Dựa trên mức công suất được chọn, hãy điều chỉnh số vòng quay cho bánh xe, càng nhiều lần
    // để xoay với thời lượng của hình ảnh động thì bánh xe quay càng nhanh.
    theWheel.animation.spins = wheelPower;
    var random = randomIndex([20,30,40,50,0,70,80,90,100,110,120,130]);
    var $stop = stopLucky(random, [80,20,1,3,4,5,2,6,7,8,9,10]);

    theWheel.animation.stopAngle = $stop;
    // Tắt nút xoay để không thể nhấp lại trong khi bánh xe đang quay.
    $(".nutbatdau").css("background-image", "url(/sites/all/themes/mirai/lucky/img/quay.png)");

    // Bắt đầu quay bằng cách gọi startAnimation.
    console.log(random);
    if (parseInt(random) === 0) {
      Swal.fire({
        icon: 'success',
        title: "Hiện trung tâm đã trao hết phần quà cho quý khách, hẹn gặp lại quý khách lần sau",
      })
    } else
      theWheel.startAnimation();

    // Đặt thành true để không thể thay đổi nguồn và bật nút quay lại trong khi
    // hình ảnh động hiện tại. Người dùng sẽ phải thiết lập lại trước khi quay lại.
    wheelSpinning = true;
  }
  function stopLucky(index, data) {
    var sum = 0;
    for (i = 0; i < data.length; i++) {
      if (i <= index) {
        sum += data[i]['size']
      }
    }
    return sum - data[index]['size'] / 2;
  }


  $(".nutquay").click(function (e) {
    e.preventDefault();
    startSpin();
  })
  $('.navbar-toggler').click(function (e){
    $('body').toggleClass('dark-layer');
  })
});
