// VALIDATIONS
$('#inputId').focus();

// REGULAR EXPRESSIONS
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusEmailRegEx = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

let customerValidations = [];
customerValidations.push({
    reg: cusIDRegEx,
    field: $('#inputId'),
    error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValidations.push({
    reg: cusNameRegEx,
    field: $('#inputName'),
    error: 'Customer Name Pattern is Wrong : A-z 5-20'
});
customerValidations.push({
    reg: cusAddressRegEx,
    field: $('#inputAddress'),
    error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/'
});
customerValidations.push({
    reg: cusEmailRegEx,
    field: $('#inputEmail'),
    error: 'Customer Email Pattern is Wrong : someone@gmail.com'
});

// DISABLE TAB KEY OF ALL FOUR TEXT FIELDS USING GROUPING SELECTOR IN CSS
$('#inputId, #inputName, #inputAddress, #inputEmail').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$('#inputId, #inputName, #inputAddress, #inputEmail').on('keyup', function (event) {
    checkValidity();
});

$('#inputId, #inputName, #inputAddress, #inputEmail').on('blur', function (event) {
    checkValidity();
});

$('#inputId').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusIDRegEx, $('#inputId'))) {
        $('#inputName').focus();
    } else {
        focusText($('#inputId'));
    }
});

$('#inputName').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusNameRegEx, $('#inputName'))) {
        focusText($('#inputAddress'));
    }
});

$('#inputAddress').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusAddressRegEx, $('#inputAddress'))) {
        focusText($('#inputEmail'));
    }
});

$('#inputEmail').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusEmailRegEx, $('#inputEmail'))) {
        $('#saveCustomer').click();
    }
});

function checkValidity() {
    let errorCount = 0;
    for (let validation of customerValidations) {
        if (check(validation.reg, validation.field)) {
            textSuccess(validation.field, '');
        } else {
            errorCount = errorCount + 1;
            setTextError(validation.field, validation.error);
        }
    }
    setButtonState(errorCount);
}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue);
}

function setTextError(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField, '');
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField, '');
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField, error) {
    txtField.css('border', '1px solid #ced4da');
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value) {
    if (value > 0) {
        $('#saveCustomer').attr('disabled', true);
    } else {
        $('#saveCustomer').attr('disabled', false);
    }
}

function clearAllTexts() {
    $('#inputId').focus();
    $('#inputId, #inputName, #inputAddress, #inputEmail, #txtCusSearch').val('');
    checkValidity();
}

// CRUD OPERATIONS
$('#saveCustomer').on('click', function () {
    let customerId = $('#inputId').val();
    let customerName = $('#inputName').val();
    let customerAddress = $('#inputAddress').val();
    let customerEmail = $('#inputEmail').val();

    let option = confirm("Are you sure you want to save this customer?");
    if (option) {
        let customer = setCustomer(customerId, customerName, customerAddress, customerEmail);
        customers.push(customer);
        loadAllCustomers();
        bindClickEventsToCusRows();
        clearAllTexts();
        alert("Customer record has been saved");
    }
});

$('#viewCustomers').on('click', function () {
    loadAllCustomers();
    bindClickEventsToCusRows();
});

$('#deleteCustomer').on('click', function () {
    let deleteID = $('#inputId').val();

    let option = confirm("Are you sure you want to delete this record?");
    if (option) {
        if (deleteCustomer(deleteID)) {
            alert("Customer record has been deleted");
            setCusTextFieldValues('', '', '', '');
        } else {
            alert("No such customer to delete. please check the id");
        }
    }
});

$('#updateCustomer').on('click', function () {
    let customerID = $('#inputId').val();

    let option = confirm("Are you sure you want to update this record?");
    if (option) {
        if (updateCustomer(customerID)) {
            alert("Customer record has been updated");
            setCusTextFieldValues('', '', '', '');
        } else {
            alert("Customer record has not been updated");
        }
    }
});

$('#clearCusFields').on('click', function () {
    setCusTextFieldValues('', '', '', '');
});

function loadAllCustomers() {
    $('#tblCustomer').empty();

    for (var customer of customers) {
        var row = `<tr><th scope="row">${customer.id}</th><td>${customer.name}</td><td>${customer.address}</td><td>${customer.email}</td></tr>`;
        $('#tblCustomer').append(row);
    }
}

$('#btnCusSearch').on('click', function () {
    let typedId = $('#txtCusSearch').val();
    let customer = searchCustomer(typedId);
    if (customer != null) {
        setCusTextFieldValues(customer.id, customer.name, customer.address, customer.email);
    } else {
        alert('No such customer to find. please check the id');
        setCusTextFieldValues('', '', '', '');
    }
});

function bindClickEventsToCusRows() {
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

function setCusTextFieldValues(id, name, address, email) {
    $('#inputId').val(id);
    $('#inputName').val(name);
    $('#inputAddress').val(address);
    $('#inputEmail').val(email);
    $('#txtCusSearch').val('');
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
        bindClickEventsToCusRows();
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
        bindClickEventsToCusRows();
        return true;
    } else {
        return false;
    }
}


