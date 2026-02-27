export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

export const validatePassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return re.test(password);
};

export const validatePincode = (pincode) => {
  const re = /^[1-9][0-9]{5}$/;
  return re.test(pincode);
};

export const validateGST = (gst) => {
  const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  return re.test(gst);
};

export const validatePAN = (pan) => {
  const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return re.test(pan);
};

export const validatePrice = (price) => {
  return price > 0 && price <= 9999999;
};

export const validateStock = (stock) => {
  return Number.isInteger(stock) && stock >= 0 && stock <= 999999;
};

export const validateQuantity = (quantity, availableStock) => {
  return quantity > 0 && quantity <= availableStock;
};