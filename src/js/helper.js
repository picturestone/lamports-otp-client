import $ from 'jquery';

export function formToJson($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

export function displayError(text, $appendTo) {
    $(`
        <div class="alert alert-danger alert-dismissable show fade">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            ${text}
        </div>
    `)
    .appendTo($appendTo)
    .show();
}

export function displaySuccess(text, $appendTo) {
    $(`
        <div class="alert alert-success alert-dismissable show fade">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            ${text}
        </div>
    `)
    .appendTo($appendTo)
    .show();
}