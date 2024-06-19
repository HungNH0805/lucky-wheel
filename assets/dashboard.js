$(document).ready(function () {
    Ajax('/admin/dashboard', function (data) {
        $str = '';
        if (data.data.month.length > 0) {
            $.each(data.data.month, function (key, value) {
                $str += `<div class="leader-board-card mb-3">
                <div class="row align-items-center">
                  <div class="col-md-2 mt-0">
                    <div class="box-number-card">
                      <span>`+(key++)+`</span>
                    </div>
                  </div>
                  <div class="col-md-10 mt-0">
                    <div class="card-body">
                      <h5 class="card-title text-primary fw-bolder">`+value.hoten+`</h5>
                      <div class="align-items-center content-card d-flex justify-content-between">
                        <span class="price ">`+value.phone+`</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `})
            $("#this-month .leader-board").html($str)

        }
        $str = '';
        if (data.data.week.length > 0) {
            $.each(data.data.week, function (key, value) {
                $str += `<div class="leader-board-card mb-3">
                <div class="row align-items-center">
                  <div class="col-md-2 mt-0">
                    <div class="box-number-card">
                      <span>`+(key++)+`</span>
                    </div>
                  </div>
                  <div class="col-md-10 mt-0">
                    <div class="card-body">
                      <h5 class="card-title text-primary fw-bolder">`+value.hoten+`</h5>
                      <div class="align-items-center content-card d-flex justify-content-between">
                        <span class="price ">`+value.phone+`</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `})
            $("#this-week .leader-board").html($str)

        }
    })
})

