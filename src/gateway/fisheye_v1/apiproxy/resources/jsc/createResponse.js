response.content = '';
response.headers["Content-Type"] = 'application/json';

var customerdetails = JSON.parse(context.getVariable("customerResponse"));

var r = response.content.asJSON;
r.customerid = customerdetails.customer_id;
r.address = customerdetails.address;
r.customername = customerdetails.name;
r.email = customerdetails.email;
r.phone = customerdetails.phone;
r.simid = context.getVariable("customerRevert.customer_test_id");
r.status = context.getVariable("customerRevert.customer_test_id");
r.message = context.getVariable("customerRevert.customer_test_name");
r.type = context.getVariable("customerRevert.customer_test_email");

context.setVariable("customerDetails",  JSON.stringify(r));



