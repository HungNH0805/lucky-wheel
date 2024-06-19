$(document).ready(function () {
    wheelSpinning = true;
    let wheelPower = 13;
    let solanquay = 0;
    // ---------------------------------------------------------------------
    let dem = 0;
    let theWheel;
    let dangquay = document.getElementById("dangquay");
    let votay = document.getElementById("votay");
    let sound = 0;
    Ajax('/admin/rotation-config', function (data) {

        theWheel = new Winwheel({
            'outerRadius': 220, // Bán kính ngoài
            'innerRadius': 0, // Size lỗ trung tâm
            'textFontSize': 24, // Size chữ
            'textOrientation': 'horizontal', // Chữ nằm ngang
            'textAlignment': 'outer', // Căn chỉnh văn bản ra bên ngoài bánh xe.
            'numSegments': data.data.length, // Số ô
            'responsive': true,
            'lineWidth': 3,
            'textLineWidth': 1.2,
            'segments': data.data,
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
                'number': data.data.length, // Số lượng chân. Họ không gian đều xung quanh bánh xe.
                'responsive': true,
                'fillStyle': '#e7706f',
                'outerRadius': 4,
            }
        });
    })

    function alertPrize(indicatedSegment) {
        var stopAngle = indicatedSegment.endAngle - ((theWheel.segments.length - 1) % 2 === 0 ? indicatedSegment.size / 2 : 0);
        // Đảo ngược góc để chọn segment ở vị trí đối diện
        var targetAngle = (stopAngle + 180) % 360;
        var targetSegment = findSegmentByAngle(targetAngle);
        theWheel.rotationAngle = 0; // Đặt lại góc bánh xe về 0 độ.
        theWheel.draw(); // Gọi draw để hiển thị các thay đổi cho bánh xe.
        wheelSpinning = false; // Đặt lại thành false thành các nút nguồn và quay có thể được bấm lại.
        $(".nutbatdau").css("background-image", "url(/assets/lucky/img/btn-start.png)"); // Hiển thị lại nút Quay
        $('#notificationModal .text-reward').text(targetSegment.text)
        $("#notificationModal").modal("show");
        Ajax('/admin/rotation-config/update-spin', function () {
        }, {
            id: targetSegment.id
        })
    }

    function playSound() {

    }

    function findSegmentByAngle(targetAngle) {
        let segments = theWheel.segments; // Mảng các segment
        let totalDegrees = 360; // Tổng số độ
        let degreesPerSegment = totalDegrees / (segments.length - 1); // Độ mỗi segment
        // Xác định index của segment dựa trên targetAngle
        let segmentIndex = Math.floor((targetAngle) % totalDegrees / degreesPerSegment) + 1;
        // Trả về segment tương ứng
        if (segmentIndex === 0) {
            segmentIndex = segments.length - 1;
        }
        return theWheel.segments[segmentIndex];
    }

// Sử dụng hàm
    function randomIndex(prizes) {
        var counter = 1;
        var prizeIndex = -1;
        for (let i = 0; i < prizes.length; i++) {
            if (prizes[i].number === 0) {
                counter++
            }
        }
        if (counter === prizes.length) {
            return -1
        }
        //Tinh tong % mon qua hien có
        $sunPercent = 0;
        for (var i = prizes.length - 1; i >= 0; i--) {
            if (parseInt(prizes[i].total_quantity) > 0) {
                $sunPercent += parseFloat(prizes[i].percentage);
            }
        }
        //Kiểm tra phần trăm
        let rand = Math.random();
        if (rand > $sunPercent) {
            rand = $sunPercent;
        }
        var sum = 0;
        for (var i = prizes.length - 1; i >= 0; i--) {
            if (prizes[i].percentage > 0) {
                if (parseInt(prizes[i].total_quantity) > 0) {
                    sum += parseFloat(prizes[i].percentage)
                    if (rand <= sum) {
                        prizeIndex = i;
                        break;
                    }

                }
            }
        }
        if (prizeIndex === -1) {
            return prizeIndex
        }
        if (prizes[prizeIndex].number !== 0) {
            prizes[prizeIndex].number = prizes[prizeIndex].number - 1
            return prizeIndex
        }
        if (prizes[prizeIndex].total_quantity < 0) {
            return randomIndex(prizes)
        }
        return randomIndex(prizes)
    }

    function startSpin() {

        Ajax('/admin/rotation-config', function (data) {
            sound = data.config.sound
            solanquay = data.config.total_spin
            if (dem < solanquay) {
                // Nút quay không nhấp được khi đang chạy
                // Dựa trên mức công suất được chọn, hãy điều chỉnh số vòng quay cho bánh xe, càng nhiều lần
                // để xoay với thời lượng của hình ảnh động thì bánh xe quay càng nhanh.
                theWheel.animation.spins = wheelPower;
                var random = randomIndex(data.data);
                // Tắt nút xoay để không thể nhấp lại trong khi bánh xe đang quay.
                $(".nutbatdau").css("background-image", "");
                if (random === -1) {
                    toastr.error("Hiện trung tâm đã trao hết phần quà cho quý khách, hẹn gặp lại quý khách lần sau", {
                        CloseButton: true,
                        ProgressBar: true
                    });
                } else {
                    theWheel.animation.stopAngle = (stopLucky(random, data.data) + 180) % 360;
                    theWheel.startAnimation();
                    if (sound === 1) {
                        dangquay.play();
                    }
                }
            } else {
                toastr.error("Your turn is over spin", {
                    CloseButton: true,
                    ProgressBar: true
                });
            }

        })


    }

    function stopLucky(index, data) {
        var sum = 0;
        for (i = 0; i < data.length; i++) {
            if (i <= index) {
                sum += data[i]['size']
            }
        }
        if (data.length % 2 === 1) {
            return sum - data[index]['size'] / 2
        }
        return sum - data[index]['size'] / 2;
    }


    $(".btn-start,.nutquay").click(function (e) {
        e.preventDefault();
        startSpin();
    })
    $('.navbar-toggler').click(function (e) {
        $('body').toggleClass('dark-layer');
    })
    $('.nav .nav-link').click(function (e) {
        $('.nav li .active').removeClass('active');
        $(this).addClass('active');
    });
    $(document).on('click', '.btn-next-spin', function () {
        $("#notificationModal").modal('hide')
    })
    var pusher = new Pusher('ff239249c6d1bc1bcaab', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (data) {
        $('#notificationMarquee').text(data.messages)
    });
    $(document).on('click', '.btn-buy', function (e) {
        e.preventDefault();
        Ajax('/admin/rotation-config/get-list-spin', function (data) {
            $str = '';
            $.each(data.data, function (i, value) {
                $str += `
                <div class="item-buy-spin mb-3" data-id="` + value.id + `">
                    <span class="label-price">` + value.quantity + ` spin</span>
                    <span class="price text-primary">` + value.price + ` kyat</span>
                </div>
                `
            })
            $("#exampleModal").modal('show').find('.modal-body').html($str + `<button type="button" class="btn btn-primary btn-buy-now">Buy now</button>`)
        })
    })
    $(document).on('click', '.item-buy-spin', function () {
        $('.item-buy-spin').removeClass('active');
        $(this).addClass('active');
    })

    $(document).on('click', '.btn-buy-now', function () {
        Ajax('/admin/rotation-config/save-buy-spin', function () {
            toastr.success("You have successfully buy spins", {
                CloseButton: true,
                ProgressBar: true
            });
            setTimeout(function () {
                location.reload();
            }, 1000)
        }, {
            id: $(".item-buy-spin.active").attr("data-id")
        })
    })

    function changeLanguage(lang) {
        fetch(`../assets/json/lang_${lang}.json`)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              console.log(data);
              document.querySelectorAll("[data-translate]").forEach(elt => {
                  elt.textContent = data[elt.getAttribute("data-translate")];
              });
          })
          .catch(e => {
              console.log('There was a problem with the fetch operation: ' + e.message);
          });
    }
    document.getElementById('languageSwitcher').addEventListener('change', function() {
        console.log(this.value);
        changeLanguage(this.value);
    });
    changeLanguage("en");
});
