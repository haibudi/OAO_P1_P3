/** JS Helper Functions */

function ajaxGet(url, data, fnDone, fnAlways) {
    $.ajax({
        url: url,
        type: 'GET',
        data: data,
        contentType: "application/json; charset=utf-8",
    })
    .done(function (res) { //--on success
        if (res.StatusCode != 200) {
            console.log("ERROR \""+url+"\":", res);
            toastr.error("Internal server error, please contact administrator", "ERROR");
        }
        if (typeof fnDone == "function") fnDone(res);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR \""+url+"\":", jqXHR);
        toastr.error("Internal server error, please contact administrator", "ERROR "+jqXHR.status);
    })
    .always(function (res) {
        if (typeof fnAlways == "function") fnAlways(res);
    });
}

function ajaxPost(url, data, fnDone, fnAlways) {
    $.ajax({
        url: url,
        type: 'POST',
        data: ko.mapping.toJSON(data),
        contentType: "application/json; charset=utf-8",
    })
    .done(function (res) { //--on success
        if (res.StatusCode != 200) {
            console.log("ERROR \""+url+"\":", res);
            toastr.error("Internal server error, please contact administrator", "ERROR");
        }
        if (typeof fnDone == "function") fnDone(res);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR \""+url+"\":", jqXHR);
        toastr.error("Internal server error, please contact administrator", "ERROR "+jqXHR.status);
    })
    .always(function (res) {
        if (typeof fnAlways == "function") fnAlways(res);
    });
}

/**
 * kendoMergeCells merges cells (add colspan/rowspan) in kendo dataBound event
 * param e: dataBound param
 * param colspanIndexes e.g.:
 *      [
            { cols: [0,1], row: 0 },
            { cols: [0,1], row: 1 },
            { cols: [0,1], row: 2 },
        ]
 * param rowspanIndexes e.g.:
 *      [
            { col: 0, rows: [0,1,2] },
            { col: 0, rows: [3,4,5,6,7,8,9,10,11] },
            { col: 0, rows: [12,13,14] },
        ]
 * param isColMergedFn (optional): callback that will validate if merge is needed (must return boolean)
 * param isRowMergedFn (optional): callback that will validate if merge is needed (must return boolean)
 */
function kendoMergeCells(e, colspanIndexes, rowspanIndexes, isColMergedFn, isRowMergedFn) {
    var $rows = e.sender.tbody.children();

    //--colspan
    if (colspanIndexes) {
        for (var i = 0; i < $rows.length; i++) {
            var row = $rows[i];
            var csArr = _.filter(colspanIndexes, function(d){ return d.row == i; });
            for (var cs of csArr) {
                if (typeof isColMergedFn == "function") {
                    if (!isColMergedFn($(row), cs)) {
                        continue;
                    }
                }
                for (var colIdx of cs.cols) {
                    var $cell = $(row).children().eq(colIdx);
                    if (cs.cols.indexOf(colIdx) == 0) {
                        $cell.attr("colspan", cs.cols.length); //--add colspan to first occurence
                    } else {
                        $cell.hide(); //--remove the others
                    }
                }
            }
        }
    }

    //--rowspan
    if (rowspanIndexes) {
        for (var i = 0; i < $rows.length; i++) {
            var row = $rows[i];
            var rsArr = _.filter(rowspanIndexes, function(d){ return d.rows.indexOf(i) >= 0; });
            for (var rs of rsArr) {
                //--Filter (optional)
                if (typeof isRowMergedFn == "function") {
                    if (!isRowMergedFn($(row), rs)) {
                        continue;
                    }
                }
                
                //--Merge
                var $cell = $(row).children().eq(rs.col);
                if (rs.rows.indexOf(i) == 0) {
                    $cell.attr("rowspan", rs.rows.length); //--add rowspan to first occurence
                } else {
                    $cell.hide(); //--remove the others
                }
            }
        }
    }
}

function kendoMergeHeader(e, colspanIndexes) {
    var $rows = e.sender.thead.children();

    //--colspan
    if (colspanIndexes) {
        for (var i = 0; i < $rows.length; i++) {
            var row = $rows[i];
            var csArr = _.filter(colspanIndexes, function(d){ return d.row == i; });
            for (var cs of csArr) {
                for (var colIdx of cs.cols) {
                    var $cell = $(row).children().eq(colIdx);
                    if (cs.cols.indexOf(colIdx) == 0) {
                        $cell.attr("colspan", cs.cols.length); //--add colspan to first occurence
                    } else {
                        $cell.hide(); //--remove the others
                    }
                }
            }
        }
    }
}

var isEmpty = function (val) {
    if (!val || val == null || val == 0 || val == "") {
        return true;
    } else {
        return false;
    }
}

function jsonDateToDatetime1(str) {
    try {
        var dt = new Date(parseInt(str.substr(6)));
        var dtStr = dt.toString();
        
    } catch (e) {
        return '';
    }
    return dtStr;
}