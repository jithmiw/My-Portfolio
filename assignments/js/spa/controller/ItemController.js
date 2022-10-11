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
        bindClickEventsToRows();
        alert("Item has been saved");
        clearAllTexts();
    }
});

$('#viewItems').on('click', function () {
    loadAllItems();
});

$('.clearAll').on('click', function () {
    setTextFieldValues('', '', '', '');
});

function loadAllItems() {
    $('#tblItem').empty();

    for (var item of items) {
        var row = `<tr><th scope="row">${item.code}</th><td>${item.desc}</td><td>${item.price}</td><td>${item.quantity}</td></tr>`;
        $('#tblItem').append(row);
    }
}

function setTextFieldValues(code, desc, price, quantity) {
    $('#inputCode').val(code);
    $('#inputDesc').val(desc);
    $('#inputPrice').val(price);
    $('#inputQuantity').val(quantity);
    $('.txtSearch').val('');
}


