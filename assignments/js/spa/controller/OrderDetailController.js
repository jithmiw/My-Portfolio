$('#orderDetails-link').on('click', function () {
    loadAllOrderDetail()
});

function loadAllOrderDetail() {
    $('#tblOrderDetail').empty();

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