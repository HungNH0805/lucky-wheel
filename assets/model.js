function Ajax(url, callback = function () {}, params = {}) {    var token = 'klQ8BTq5lCQu_B0sv0aDtgAck6guzxNB'    $.ajax({        url: url,        type: 'post',        dataType: 'json',        data: params,        headers: {            Authorization: `Bearer ${token}`        },        beforeSend: function () {        },        success: function (data) {            if (data.status) {                callback(data)            }else {                toastr.error(data.message, {                    CloseButton: true,                    ProgressBar: true                });            }        },        complete: function () {        },        error: function (r1, r2) {            toastr.error(r1.responseJSON.message, {                CloseButton: true,                ProgressBar: true            });        }    })}