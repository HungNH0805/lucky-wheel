$(document).ready(function () {
    loadDailyQuestion()
    setInterval(function () {
        $time = getTimeRemainingToEndOfDay();
        $(".time-reset").text($time)
    })
    $(document).on('click',".btn-go-now",function (){
        Ajax('/admin/daily-quest/update', function (data) {
            loadDailyQuestion()
        },{id:$(this).attr('data-id')})
    })
})

function getTimeRemainingToEndOfDay() {
    const $date = new Date();
    const $endTime = new Date($date.getFullYear(), $date.getMonth(), $date.getDate() + 1); // Đặt thời gian để kết thúc vào đầu ngày tiếp theo
    var timeDiff = ($endTime.getTime() + 2000) - $date.getTime() - 1000;
    var $hour = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var $minute = Math.floor(((timeDiff - $hour*(1000 * 60 * 60)) % (1000 * 60 * 60)) / (1000 * 60));
    var $second = Math.floor(((timeDiff - $hour*(1000 * 60 * 60) - $minute*(1000 * 60))  % (1000 * 60)) / 1000)
    $hour = $hour < 10 ? `0${$hour}` : $hour;
    $minute = $minute < 10 ? `0${$minute}` : $minute;
    $second = $second < 10 ? `0${$second}` : $second;
    return `${$hour}:${$minute}:${$second}`
}
function loadDailyQuestion() {
    Ajax('/admin/daily-quest', function (data) {
        var $time = getTimeRemainingToEndOfDay();
        $str = '<p>Daily quest points reset daily at <span class="time-reset">' + $time + '</span></p>'
        $.each(data.data, function (i, item) {
            $str += `<div class="card mb-3 `+(item.active?'finish':'')+`">
            <div class="row g-2 align-items-center">
              <div class="col-md-2 col-2">
                <div class="box-img-card">
                  <img src=".` + item.image + `" class="img-fluid rounded-start img-card" alt="...">
                </div>
              </div>
              <div class="col-md-10 col-10">
                <div class="card-body">
                  <h5 class="card-title">` + item.title + `</h5>
                  <div class="align-items-center content-card d-flex justify-content-between">
                    <span class="price text-primary">` + item.quantity_spin + ` spin</span>
                    `+(item.active?'':'<a href="#" data-id="'+item.id+'" class="btn btn-go-now">Go now</a>')+`
                  </div>
                  `+(item.active?'<img src="./assets/lucky/img/finish.png" class="img-finish" alt="finish">':'')+`
                </div>
              </div>
            </div>
          </div>`
        })
        $("#pills-home").html($str)
    })
}
// Sử dụng hàm
