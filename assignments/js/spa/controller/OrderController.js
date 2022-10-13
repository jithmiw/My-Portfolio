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
    $('#inputOrderQty').val('');
}

// ADDING ITEMS TO THE TABLE
var tblOrders=[];

$('#addItem').on('click', function () {
    if (parseInt($('#inputOrderQty').val()) <= 0 || $('#inputOrderQty').val() === '' ||
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
        setQtyOnHand(itemCode ,qty, 'deduct');
        loadAllOrders();
        calculateTotal();
        if ($('#inputCash').val() !== '' && $('#inputBalance').val() !== '') {
            calculateBalance();
        }
        if ($('#inputDiscount').val() !== '') {
            setSubTotalAndBalance();
        }
    } else {
        tblOrders.push(orderTM);
        setQtyOnHand(itemCode , qty, 'deduct');
        loadAllOrders();
        calculateTotal();
        if ($('#inputCash').val() !== '' && $('#inputBalance').val() !== '') {
            calculateBalance();
        }
        if ($('#inputDiscount').val() !== '') {
            setSubTotalAndBalance();
        }
    }
});

// REMOVING ITEMS FROM THE TABLE
$('#removeItem').on('click', function () {
    let removeCode = searchOrder($('#selectItemCode option:selected').text());

    let option = confirm("Are you sure you want to remove this item?");
    if (option) {
        if (removeCode != null) {
            let indexNumber = tblOrders.indexOf(removeCode);
            setQtyOnHand(removeCode.code, removeCode.quantity, 'add');
            tblOrders.splice(indexNumber, 1);
            loadAllOrders();
            alert("Item has been removed");
            calculateTotal();
            if ($('#inputCash').val() !== '' && $('#inputBalance').val() !== '') {
                calculateBalance();
            }
            if ($('#inputDiscount').val() !== '') {
                setSubTotalAndBalance();
            }
        } else {
            alert("No such item to remove. please check the item code");
        }
    }
});

$('#inputCash').on('keyup', function (event) {
    calculateBalance();
});

$('#inputDiscount').on('keyup', function (event) {
    setSubTotalAndBalance();
});

// PURCHASING ORDER
$('#purchaseOrder').on('click', function () {
    if ($('#selectCusId').val() === '') {
        alert("Please select customer id");
        $('#selectCusId').focus();
        return;
    }
    if (parseInt($('#inputBalance').val()) <= 0 || $('#inputBalance').val() === '') {
        alert("Insufficient cash. Please check cash");
        $('#inputCash').focus();
        return;
    }

    let orderId = $('#inputOrderId').val();
    let orderDate = $('#inputDate').val();
    let customerId = $('#selectCusId option:selected').text();

    let option = confirm("Are you sure you want to purchase this order?");
    if (option) {
        let order = setOrder(orderId, orderDate, customerId);
        orders.push(order);

        for (let order of tblOrders) {
            let orderDtl = setOrderDetail(orderId, order.code, order.quantity, $('#inputDiscount').val());
            orderDetail.push(orderDtl);
        }

        $('#tblOrders').empty();
        clearAllOrderFields();
        alert("Order has been purchased");
    }
});

function loadAllOrders(){
    $('#tblOrders').empty();

    for(let order of tblOrders){
        var row = `<tr><th scope="row">${order.code}</th><td>${order.desc}</td><td>${order.price}</td><td>${order.quantity}</td><td>${order.total}</td></tr>`;
        $('#tblOrders').append(row);
    }
}

function setQtyOnHand(itemCode, qty, status) {
    for (let item of items) {
        if (item.code === itemCode && status === 'deduct') {
            item.quantity = parseInt(item.quantity) - qty;
            return;
        } else if (item.code === itemCode && status === 'add') {
            item.quantity = parseInt(item.quantity) + qty;
            return;
        }
    }
}

function searchOrder(itemCode) {
    for (let order of tblOrders) {
        if (order.code === itemCode) {
            return order;
        }
    }
    return null;
}

function calculateTotal() {
    var lblTotal = 0;
    for(let order of tblOrders){
        lblTotal += parseInt(order.total);
    }
    $('#Total').text(lblTotal.toFixed(2));
    $('#Sub-Total').text(lblTotal.toFixed(2));
    $('#selectItemCode>option:eq(0)').prop('selected', true);
    clearItemFields();
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

function clearAllOrderFields() {
    $('#inputCusName').val('');
    $('#inputCusAddress').val('');
    $('#inputCusEmail').val('');
    clearItemFields();
    $('#inputCash').val('');
    $('#inputDiscount').val('');
    $('#inputBalance').val('');
    $('#Total').text('0.00');
    $('#Sub-Total').text('0.00');
    $('select>option:eq(0)').prop('selected', true);
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
