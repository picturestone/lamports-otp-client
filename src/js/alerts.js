import $ from 'jquery';

export function displayError(text, $appendTo) {
    displayAlert(text, $appendTo, 'alert-danger');
}

export function displayWarning(text, $appendTo) {
    displayAlert(text, $appendTo, 'alert-warning');
}

export function displaySuccess(text, $appendTo) {
    displayAlert(text, $appendTo, 'alert-success');
}

function displayAlert(text, $appendTo, alertClass) {
    $(`
        <div class="alert ${alertClass} alert-dismissable show fade my-3">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            ${text}
        </div>
    `)
    .appendTo($appendTo)
    .show();
}