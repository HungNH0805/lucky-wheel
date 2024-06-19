$(document).ready(function () {
    Ajax('/admin/setting/guidelines',function (data) {
        $(".box-history .leader-board").html(data.data)
    })

})