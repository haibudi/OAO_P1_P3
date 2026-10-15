var test = {
    formID : ko.observable("")
}

removeW8ID = function(){
    model.loader(true)
    var param = {
        ID: test.formID()
    }

    if (test.formID() != "") {
        $.ajax({
            url: urlremoveWID,
            data: param,
            type: "POST",
            // contentType: "application/json; charset=utf-8",
            cache: false,
            success: function (res) {
                if (res.success == true) {
                    model.loader(false);
                    alert(res.message);

                } else {
                    model.loader(false);
                    alert(res.message);
                }

            }
        });
    }else {
    alert("FormID empty");
    model.loader(false);
    }
}



checkAccordion = function () {
    var $el_acc = $(".panel-collapse")
    $.each($el_acc, function (i, dt) {
        var has_clas_in = $("#" + dt.id).hasClass("in");
        var has_clas_show = $("#" + dt.id).hasClass("show");
        if (has_clas_in == true && has_clas_show == false) {

        } else {
            $("#" + dt.id).removeClass("show")
        }
    });
}