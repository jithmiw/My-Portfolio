// LOADING ORDER DETAILS
$('#orderDetails-link').on('click', function () {
    loadAllOrderDetail()
});

function loadAllOrderDetail() {
    $('#tblOrderDetail').empty();
    $('#txtOrderSearch').val('');

    for(let orderDtl of orderDetail){
        for (let order of orders) {
            if (orderDtl.orderId === order.orderId) {
                var date = order.orderDate;
                var cusId = order.customerId;
                break;
            }
        }
        var row = `<tr><th scope="row">${orderDtl.orderId}</th><td>${date}</td><td>${cusId}</td><td>${orderDtl.itemCode}</td><td>${orderDtl.orderQty}</td><td>${orderDtl.discount}</td></tr>`;
        $('#tblOrderDetail').append(row);
    }
}

// SEARCHING ORDER
$('#btnOrderSearch').on('click', function () {
    let typedId = $('#txtOrderSearch').val();
    let order = searchOrderDetail(typedId);
    if (order != null) {
        $('#tblOrderDetail').empty();
        for (let orderDtl of orderDetail) {
            if (orderDtl.orderId === typedId) {
                var itmCode = orderDtl.itemCode;
                var qty = orderDtl.orderQty;
                var discount = orderDtl.discount;

                var row = `<tr><th scope="row">${order.orderId}</th><td>${order.orderDate}</td><td>${order.customerId}</td><td>${itmCode}</td><td>${qty}</td><td>${discount}</td></tr>`;
                $('#tblOrderDetail').append(row);
            }
        }
    } else {
        alert('No such order to find. please check the id');
    }
});

function searchOrderDetail(orderID) {
    for (let order of orders) {
        if (order.orderId === orderID) {
            return order;
        }
    }
    return null;
}