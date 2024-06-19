$(document).ready(function () {
    Ajax('/admin/history', function (data) {
        $(".your-score .text-score").text(data.data.total_spin);
        $str = '';
        $price = '';
        $count = 0;
        if (data.data.models.length > 0) {
            $.each(data.data.models, function (key, value) {
                $str += `<div class="card history mb-3">
              <div class="row g-2 align-items-center">
                <div class="col-md-2 col-2">
                  <div class="box-img-card">
                    <img src=".` + value.model.image + `" class="img-fluid rounded-start img-card" alt="...">
                  </div>
                </div>
                <div class="col-md-10 col-10">
                  <div class="card-body">
                    <h5 class="card-title text-primary fw-bolder">` + value.model.title + `</h5>
                    <div class="align-items-center content-card d-flex justify-content-between">
                      <span class="price text-secondary">` + value.created + `</span>
                      <span class="text-spin fw-bold">` + value.type + `</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `
                if (value.type === 'Buy') {
                    $count++;
                    $price += `
                <div class="card history mb-3">
              <div class="row g-2 align-items-center">
                <div class="col-md-2 col-2">
                  <div class="box-img-card">
                    <img src=".` + value.model.image + `" class="img-fluid rounded-start img-card" alt="...">
                  </div>
                </div>
                <div class="col-md-10 col-10">
                  <div class="card-body">
                    <h5 class="card-title text-primary fw-bolder">` + value.model.title + `</h5>
                    <div class="align-items-center content-card d-flex justify-content-between">
                      <span class="price text-secondary">` + value.created + `</span>
                      <span class="text-spin fw-bold">` + value.type + `</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                `
                }
            })
            $("#history").html($str)
            if ($count > 0)
                $("#price").html($price)
        }

    })
})

