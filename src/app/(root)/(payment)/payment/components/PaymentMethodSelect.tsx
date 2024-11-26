const PaymentMethodSelect = () => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-gray-600 font-bold">결제 수단</h2>
      <div className="mt-2 space-y-2">
        <label className="flex items-center">
          <input type="radio" name="payment" className="mr-2" />
          <span className="text-gray-700">토스페이</span>
        </label>
        <label className="flex items-center">
          <input type="radio" name="payment" className="mr-2" />
          <span className="text-gray-700">카카오페이</span>
        </label>
        <label className="flex items-center">
          <input type="radio" name="payment" className="mr-2" />
          <span className="text-gray-700">일반결제</span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethodSelect;
