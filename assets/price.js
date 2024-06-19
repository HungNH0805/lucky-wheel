$(document).ready(function () {
    Ajax('/admin/price', function (data) {
        $str = '';
        if (data.data.length > 0) {
            $.each(data.data, function (key, value) {
                $str += `
                          <div class="item-price mb-3">
            <div class="img-price-box pe-3">
              <img src=".`+value.image+`" alt="" class="img-price">
            </div>
            <div class="content-price-box">
              <span class="title-price text-primary fw-bold">`+value.title+`</span>
              <p class="price mb-0">`+value.note+`</p>
            </div>
          </div>
            `})
            $(".price-box").html($str)

        }
    })
})

