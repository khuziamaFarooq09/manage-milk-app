import React, { useEffect, useState } from 'react';

const getLocalItems = () => {
  const record = localStorage.getItem('records');
  if (record) {
    return JSON.parse(record);
  } else {
    return [];
  }
}

const ItemManagement = () => {
  const [customer, setCustomer] = useState('');
  const [itemName, setItemName] = useState('');
  const [rate, setRate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [customerPayment, setCustomerPayment] = useState('');
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [records, setRecords] = useState(getLocalItems());
  const [customerPayBack, setCustomerPayBack] = useState(0);
  const [date, setDate]= useState();

  const handleAddItem = () => {
    if (itemName && rate && quantity) {
      const amount = parseFloat(rate) * parseFloat(quantity);
      setTotalAmount(amount);
      
      const todayDate= new Date();
      const updatedRecords = [
        ...records,
        {
          customer,
          itemName,
          rate,
          quantity,
          amount: amount,
          customerPayment: customerPayment,
          customerPayBack: customerPayBack,
          date: todayDate.toLocaleDateString(),
          
        }
      ];

      const newSubTotal = subTotal + amount;
      setSubTotal(newSubTotal);

      const newNetTotal = newSubTotal;
      setNetTotal(newNetTotal);

      setItemsCount(updatedRecords.length);

      let totalQty = 0;
      updatedRecords.forEach(item => {
        totalQty += parseFloat(item.quantity);
      });
      setTotalQuantity(totalQty);

      setRecords(updatedRecords);
      clearInputs();
    } else {
      alert('Please fill all fields (Item Name, Rate, Quantity) before adding.');
    }
  };

  const clearInputs = () => {
    setCustomer('');
    setItemName('');
    setRate('');
    setQuantity('');
  };

  const handleClearAll = () => {
    setCustomer('');
    setItemName('');
    setRate('');
    setQuantity('');
    setTotalAmount(0);
    setSubTotal(0);
    setNetTotal(0);
    setCustomerPayment('');
    setRemainingAmount(0);
    setItemsCount(0);
    setTotalQuantity(0);
    setCustomerPayBack(0);
    setRecords([]);
    localStorage.clear('records');
  };

  const handlePaymentChange = (event) => {
    const payment = parseFloat(event.target.value);
    setCustomerPayment(payment);

    const remaining = netTotal - payment;
    if (payment > netTotal) {
      setRemainingAmount(remaining);
      setCustomerPayBack(0);
    } else {
      setCustomerPayBack(remaining);
      setRemainingAmount(0);
    }
  };

  const addCustomerPay = () => {
    const updatedRecords = records.map((record, index) => {
      if (index === records.length - 1) {
        return {
          ...record,
          customerPayment: customerPayment,
          customerPayBack: customerPayBack,
        };
      }
      return record;
    });
    setRecords(updatedRecords);
  };

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  return (
    <div className="container mt-4 fw-bolder">
      <h2 className="mb-4"><span className='text-primary fw-bolder'>Khalis</span>-Milk-Point</h2>
      <div className="row mb-3">
        <div className="col-lg-3 col-sm-12">
          <label htmlFor="CustomerName" className="form-label">Customer Name:</label>
          <input
            type="text"
            id="customer"
            className="form-control"
            placeholder='(optional)'
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="col">
          <label htmlFor="itemName" className="form-label">Item Name:</label>
          <input
            type="text"
            id="itemName"
            className="form-control"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="col">
          <label htmlFor="rate" className="form-label">Rate:</label>
          <input
            type="number"
            id="rate"
            className="form-control"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="col">
          <label htmlFor="quantity" className="form-label">Quantity:</label>
          <input
            type="text"
            id="quantity"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <button className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
          <button className="btn btn-secondary ms-2" onClick={clearInputs}>Clear</button>
        </div>
      </div>
      <hr />
      <div className="row mb-3">
        <div className="col">
          <div>
            <label className="form-label">SubTotal:</label>
            <span>{subTotal}</span>
          </div>
          <div>
            <label className="form-label">Net Total:</label>
            <span>{netTotal}</span>
          </div>
          <div>
            <label className="form-label">Customer Payment:</label>
            <input
              type="number"
              className="form-control"
              value={customerPayment}
              onChange={handlePaymentChange}
            />
            <button className="btn btn-primary mt-2" onClick={addCustomerPay}>Add Pay to Record</button>
          </div>
          <div className='py-2'>
            <label className="form-label">Change: </label>
            <span>{remainingAmount}</span>
          </div>
          <div>
            <label className="form-label">Pay More: </label>
            <span>{customerPayBack}</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="row mb-3">
        <div className="col">
          <h3>Totals</h3>
          <div>
            <label className="form-label">Total Quantity of Items:</label>
            <span>{totalQuantity}</span>
          </div>
          <div>
            <label className="form-label">Total Items:</label>
            <span>{itemsCount}</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="row mb-3">
        <div className="col">
          <h3>Records</h3>
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Item Name</th>
                <th>Rate</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Customer Pay</th>
                <th>Remaining Amount of customer</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  <td>{record.customer}</td>
                  <td>{record.itemName}</td>
                  <td>{record.rate}</td>
                  <td>{record.quantity}</td>
                  <td>{record.amount}</td>
                  <td>{record.customerPayment}</td>
                  <td>{record.customerPayBack}</td>
                  <td>{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <button className="btn btn-danger" onClick={handleClearAll}>Clear All</button>
        </div>
      </div>
    </div>
  );
};

export default ItemManagement;
