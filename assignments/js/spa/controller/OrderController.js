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
            $('#inputOrderQty').val('');
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

// ADDING ITEMS TO THE TABLE
var tblOrders=[];

$('#addItem').on('click', function () {
    if (parseInt($('#inputOrderQty').val()) <= 0 ||
        parseInt($('#inputOrderQty').val()) > parseInt($('#inputQtyOnHand').val())) {
        alert("Invalid Quantity");
        $('#inputOrderQty').focus();
        return;
    }

    let itemCode = $('#selectItemCode option:selected').text();
    let description = $('#desc').val();
    let unitPrice = parseInt($('#price').val()).toFixed(2);
    let qty = parseInt($('#inputOrderQty').val());
    let total = (unitPrice * qty).toFixed(2);

    var orderTM = {
        code : itemCode,
        desc : description,
        price : unitPrice,
        quantity : qty,
        total : total
    };

    for (let order of tblOrders) {
        var exists = (order.code === itemCode);
    }

    if (exists) {
        for (let order of tblOrders) {
            if (order.code === itemCode) {
                order.quantity = order.quantity + qty;
                order.total = (unitPrice * order.quantity).toFixed(2);
                break;
            }
        }
        loadAllOrders();
        calculateTotal();
    } else {
        tblOrders.push(orderTM);
        loadAllOrders();
        calculateTotal();
    }
});

$('#inputCash').on('keyup', function (event) {
    calculateBalance();
});

$('#inputDiscount').on('keyup', function (event) {
    setSubTotalAndBalance();
});

function loadAllOrders(){
    $('#tblOrders').empty();

    for(let order of tblOrders){
        var row = `<tr><th scope="row">${order.code}</th><td>${order.desc}</td><td>${order.price}</td><td>${order.quantity}</td><td>${order.total}</td></tr>`;
        $('#tblOrders').append(row);
    }
}

function calculateTotal() {
    var lblTotal = 0;
    for(let order of tblOrders){
        lblTotal += parseInt(order.total);
    }
    $('#Total').text(lblTotal.toFixed(2));
    $('#Sub-Total').text(lblTotal.toFixed(2));
    $('#selectItemCode').focus();
}

function calculateBalance() {
    let balance = parseInt($('#inputCash').val()) - parseInt($('#Sub-Total').text());
    $('#inputBalance').val(balance.toFixed(2));
}

function setSubTotalAndBalance() {
    var subTotal = parseInt($('#Total').text()) * ((100 - parseInt($('#inputDiscount').val())) / 100);
    $('#Sub-Total').text(subTotal.toFixed(2));

    calculateBalance();
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
