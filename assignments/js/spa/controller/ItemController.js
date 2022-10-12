// VALIDATIONS
$('#inputCode').focus();

// REGULAR EXPRESSIONS
const itmCodeRegEx = /^(I00-)[0-9]{1,3}$/;
const itmDescRegEx = /[A-z0-9 ]{3,50}/;
const itmPriceRegEx = /^[0-9]+[.]?[0-9]*$/;
const itmQtyRegEx = /^\d+$/;

let itemValidations = [];
itemValidations.push({
    reg: itmCodeRegEx,
    field: $('#inputCode'),
    error: 'Item Code Pattern is Wrong : I00-001'
});
itemValidations.push({
    reg: itmDescRegEx,
    field: $('#inputDesc'),
    error: 'Description Pattern is Wrong : A-z 0-9 3-50'
});
itemValidations.push({
    reg: itmPriceRegEx,
    field: $('#inputPrice'),
    error: 'Unit Price Pattern is Wrong : 100 or 100.00'
});
itemValidations.push({
    reg: itmQtyRegEx,
    field: $('#inputQuantity'),
    error: 'Quantity on Hand Pattern is Wrong : 0-9'
});

// DISABLE TAB KEY OF ALL FOUR TEXT FIELDS USING GROUPING SELECTOR IN CSS
$('#inputCode, #inputDesc, #inputPrice, #inputQuantity').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$('#inputCode, #inputDesc, #inputPrice, #inputQuantity').on('keyup', function (event) {
    checkValidity(itemValidations, '#saveItem, #updateItem');
});

// $('#inputCode, #inputDesc, #inputPrice, #inputQuantity').on('blur', function (event) {
//     checkValidity(itemValidations, '#saveItem, #updateItem');
// });

$('#inputCode').on('keydown', function (event) {
    if (event.key === "Enter" && check(itmCodeRegEx, $('#inputCode'))) {
        $('#inputDesc').focus();
    } else {
        focusText($('#inputCode'));
    }
});

$('#inputDesc').on('keydown', function (event) {
    if (event.key === "Enter" && check(itmDescRegEx, $('#inputDesc'))) {
        focusText($('#inputPrice'));
    }
});

$('#inputPrice').on('keydown', function (event) {
    if (event.key === "Enter" && check(itmPriceRegEx, $('#inputPrice'))) {
        focusText($('#inputQuantity'));
    }
});

$('#inputQuantity').on('keydown', function (event) {
    if (event.key === "Enter" && check(itmQtyRegEx, $('#inputQuantity'))) {
        $('#saveItem').click();
    }
});

function clearAllItemTexts() {
    $('#inputCode').focus();
    $('#inputCode, #inputDesc, #inputPrice, #inputQuantity, #txtItemSearch').val('');
    checkValidity(itemValidations, '#saveItem, #updateItem');
}

// CRUD OPERATIONS
$('#saveItem').on('click', function () {
    let itemCode = $('#inputCode').val();
    let description = $('#inputDesc').val();
    let inputPrice = $('#inputPrice').val();
    let qtyOnHand = $('#inputQuantity').val();

    let option = confirm("Are you sure you want to save this item?");
    if (option) {
        let item = setItem(itemCode, description, inputPrice, qtyOnHand);
        items.push(item);
        loadAllItems();
        bindClickEventsToItemRows();
        loadAllItemsForOption();
        clearAllItemTexts();
        alert("Item record has been saved");
    }
});

$('#viewItems').on('click', function () {
    loadAllItems();
    bindClickEventsToItemRows();
});

$('#deleteItem').on('click', function () {
    let deleteCode = $('#inputCode').val();

    let option = confirm("Are you sure you want to delete this record?");
    if (option) {
        if (deleteItem(deleteCode)) {
            alert("Item record has been deleted");
            setItemTextFieldValues('', '', '', '');
        } else {
            alert("No such item to delete. please check the code");
        }
    }
});

$('#updateItem').on('click', function () {
    let itemCode = $('#inputCode').val();

    let option = confirm("Are you sure you want to update this record?");
    if (option) {
        if (updateItem(itemCode)) {
            alert("Item record has been updated");
            setItemTextFieldValues('', '', '', '');
        } else {
            alert("Item record has not been updated");
        }
    }
});

$('#clearItemFields').on('click', function () {
    setItemTextFieldValues('', '', '', '');
});

function loadAllItems() {
    $('#tblItem').empty();

    for (var item of items) {
        var row = `<tr><th scope="row">${item.code}</th><td>${item.desc}</td><td>${item.price}</td><td>${item.quantity}</td></tr>`;
        $('#tblItem').append(row);
    }
}

$('#btnItemSearch').on('click', function () {
    let typedCode = $('#txtItemSearch').val();
    let item = searchItem(typedCode);
    if (item != null) {
        setItemTextFieldValues(item.code, item.desc, item.price, item.quantity);
    } else {
        alert('No such item to find. please check the code');
        setItemTextFieldValues('', '', '', '');
    }
});

function bindClickEventsToItemRows() {
    $('#tblItem > tr').on('click', function () {
        let code = $(this).children(':eq(0)').text();
        let desc = $(this).children(':eq(1)').text();
        let price = $(this).children(':eq(2)').text();
        let quantity = $(this).children(':eq(3)').text();

        $('#inputCode').val(code);
        $('#inputDesc').val(desc);
        $('#inputPrice').val(price);
        $('#inputQuantity').val(quantity);
    });
}

function setItemTextFieldValues(code, desc, price, quantity) {
    $('#inputCode').val(code);
    $('#inputDesc').val(desc);
    $('#inputPrice').val(price);
    $('#inputQuantity').val(quantity);
    $('#txtItemSearch').val('');
}

function searchItem(itemCode) {
    for (let item of items) {
        if (item.code == itemCode) {
            return item;
        }
    }
    return null;
}

function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        let indexNumber = items.indexOf(item);
        items.splice(indexNumber, 1);
        loadAllItems();
        bindClickEventsToItemRows();
        return true;
    } else {
        return false;
    }
}

function updateItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        item.code = $('#inputCode').val();
        item.desc = $('#inputDesc').val();
        item.price = $('#inputPrice').val();
        item.quantity = $('#inputQuantity').val();
        loadAllItems();
        bindClickEventsToItemRows();
        return true;
    } else {
        return false;
    }
}