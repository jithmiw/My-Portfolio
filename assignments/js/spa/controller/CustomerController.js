$('#saveCustomer').on('click', function () {
    let customerId = $('#inputId').val();
    let customerName = $('#inputName').val();
    let customerAddress = $('#inputAddress').val();
    let customerEmail = $('#inputEmail').val();

    let customer = setCustomer(customerId, customerName, customerAddress, customerEmail);
    customers.push(customer);
    loadAllCustomers();
});

$('#viewCustomers').on('click', function () {
    loadAllCustomers();
});

function loadAllCustomers() {
    $('#tblCustomer').empty();

    for(var customer of customers){
        var row = `<tr><th scope="row">${customer.id}</th><td>${customer.name}</td><td>${customer.address}</td><td>${customer.email}</td></tr>`;
        $('#tblCustomer').append(row);
    }
}

$('#btnSearch').on('click', function () {
    let typedId = $('#txtSearch').val();
    let customer = searchCustomer(typedId);
    if (customer != null) {
        setTextFieldValues(customer.id, customer.name, customer.address, customer.email);
    } else {
        alert('No such customer to find. please check the id');
        setTextFieldValues('', '', '', '');
    }
});

function setTextFieldValues(id, name, address, email) {
    $('#inputId').val(id);
    $('#inputName').val(name);
    $('#inputAddress').val(address);
    $('#inputEmail').val(email);
}

function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id == cusID) {
            return customer;
        }
    }
    return null;
}
