// LOADING CUSTOMER DETAILS
function loadAllCustomersForOption() {
    $('#selectCusId').empty();
    $('#selectCusId').append(`<option selected value="">Select Customer ID</option>`);
    for (let customer of customers) {
        $('#selectCusId').append(`<option value="${customer.id}">${customer.id}</option>`);
    }
    clearCusFields();
}

function getCusId(el) {
    const option = el.value;
    for (let customer of customers) {
        if (option === customer.id) {
            $('#inputCusName').val(customer.name);
            $('#inputCusAddress').val(customer.address);
            $('#inputCusEmail').val(customer.email);
            return;
        } else {
            clearCusFields();
        }
    }
}

function clearCusFields() {
    $('#inputCusName').val('');
    $('#inputCusAddress').val('');
    $('#inputCusEmail').val('');
}

// LOADING ITEM DETAILS
function loadAllItemsForOption() {
    $('#selectItemCode').empty();
    $('#selectItemCode').append(`<option selected value="">Select Item Code</option>`);
    for (let item of items) {
        $('#selectItemCode').append(`<option value="${item.code}">${item.code}</option>`);
    }
    clearItemFields();
}

function getItemCode(el) {
    const option = el.value;
    for (let item of items) {
        if (option === item.code) {
            $('#desc').val(item.desc);
            $('#price').val(item.price);
            $('#inputQtyOnHand').val(item.quantity);
            return;
        } else {
            clearItemFields();
        }
    }
}

function clearItemFields() {
    $('#desc').val('');
    $('#price').val('');
    $('#inputQtyOnHand').val('');
}

// SETTING CURRENT DATE
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

$(document).ready( function() {
    $('#inputDate').val(new Date().toDateInputValue());
});
