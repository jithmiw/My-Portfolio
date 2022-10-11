// CRUD OPERATIONS
$('#saveCustomer').on('click', function () {
    let customerId = $('#inputId').val();
    let customerName = $('#inputName').val();
    let customerAddress = $('#inputAddress').val();
    let customerEmail = $('#inputEmail').val();

    let customer = setCustomer(customerId, customerName, customerAddress, customerEmail);
    customers.push(customer);
    loadAllCustomers();
    bindClickEventsToRows();
});

$('#viewCustomers').on('click', function () {
    loadAllCustomers();
});

$('#deleteCustomer').on('click', function () {
    let deleteID = $('#inputId').val();

    let option = confirm("Are you sure you want to delete this record?");
    if (option){
        if (deleteCustomer(deleteID)) {
            alert("Customer record has been deleted");
            setTextFieldValues('', '', '', '');
        } else {
            alert("No such customer to delete. please check the id");
        }
    }
});

$('#updateCustomer').on('click', function () {
    let customerID = $('#inputId').val();

    let option = confirm("Are you sure you want to update this record?");
    if (option){
        if (updateCustomer(customerID)) {
            alert("Customer record has been updated");
            setTextFieldValues('', '', '', '');
        } else {
            alert("Customer record has not been updated");
        }
    }
});

$('.clearAll').on('click', function () {
    setTextFieldValues('', '', '', '');
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

function bindClickEventsToRows() {
    $('#tblCustomer > tr').on('click', function () {
        let id = $(this).children(':eq(0)').text();
        let name = $(this).children(':eq(1)').text();
        let address = $(this).children(':eq(2)').text();
        let email = $(this).children(':eq(3)').text();

        $('#inputId').val(id);
        $('#inputName').val(name);
        $('#inputAddress').val(address);
        $('#inputEmail').val(email);
    });
}

function setTextFieldValues(id, name, address, email) {
    $('#inputId').val(id);
    $('#inputName').val(name);
    $('#inputAddress').val(address);
    $('#inputEmail').val(email);
    $('#txtSearch').val('');
}

function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id == cusID) {
            return customer;
        }
    }
    return null;
}

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);
        loadAllCustomers();
        bindClickEventsToRows();
        return true;
    } else {
        return false;
    }
}

function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $('#inputId').val();
        customer.name = $('#inputName').val();
        customer.address = $('#inputAddress').val();
        customer.email = $('#inputEmail').val();
        loadAllCustomers();
        bindClickEventsToRows();
        return true;
    } else {
        return false;
    }
}


