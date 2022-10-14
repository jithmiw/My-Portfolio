// NAVIGATIONS
$(document).ready(function(){
    $('#home').css('display', 'block');
    $('#orders, #customers, #items, #order-details').css('display', 'none');
    setDashboard();
    setOrderId();
});

$('#home-link').on('click', function () {
    $('#home').css('display', 'block');
    $('#orders, #customers, #items, #order-details').css('display', 'none');
    setDashboard();
});

$('#orders-link').on('click', function () {
    $('#orders').css('display', 'block');
    $('#home, #customers, #items, #order-details').css('display', 'none');
});

$('#customers-link').on('click', function () {
    $('#customers').css('display', 'block');
    $('#home, #orders, #items, #order-details').css('display', 'none');
});

$('#items-link').on('click', function () {
    $('#items').css('display', 'block');
    $('#home, #orders, #customers, #order-details').css('display', 'none');
});

$('#orderDetails-link').on('click', function () {
    $('#order-details').css('display', 'block');
    $('#home, #orders, #customers, #items').css('display', 'none');
});

// SETTING DASHBOARD
function setDashboard() {
    $('#noOfCustomers').text(customers.length);
    $('#noOfItems').text(items.length);
    $('#noOfOrders').text(orders.length);
}