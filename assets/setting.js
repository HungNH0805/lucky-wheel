$(document).ready(function () {
    Ajax('/admin/setting',function (data) {
        if (data.data ===1) {
            $('#flexSwitchCheckChecked').prop('checked', true);
        }else {
            $('#flexSwitchCheckChecked').prop('checked', false);
        }
    })
    $(document).on('change', '#flexSwitchCheckChecked', function (e) {
        e.preventDefault();
        Ajax('/admin/setting/update',function () {},{'value':$('#flexSwitchCheckChecked').prop('checked')})
    })
})