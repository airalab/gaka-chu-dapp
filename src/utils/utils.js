export const watchTx = (web3, tx) => {
  const transactionReceiptAsync = (resolve, reject) => {
    web3.eth.getTransactionReceipt(tx, (error, receipt) => {
      if (error) {
        reject(error);
      } else if (
        receipt === null ||
        (receipt.status === "0x1" && receipt.blockNumber === null)
      ) {
        setTimeout(() => transactionReceiptAsync(resolve, reject), 5000);
      } else {
        resolve(receipt);
      }
    });
  };
  if (Array.isArray(tx)) {
    return Promise.all(tx.map((oneTx) => watchTx(oneTx)));
  } else if (typeof tx === "string") {
    return new Promise(transactionReceiptAsync);
  }
  throw new Error(`Invalid Type: ${tx}`);
};

export const getFormatDate = (date) => {
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;
  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
  return day + "." + month + "." + year;
};

export const getFormatDateTime = (date) => {
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;
  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
  let hours = date.getHours().toString();
  hours = hours.length > 1 ? hours : "0" + hours;
  let min = date.getMinutes().toString();
  min = min.length > 1 ? min : "0" + min;
  let sec = date.getSeconds().toString();
  sec = sec.length > 1 ? sec : "0" + sec;
  return year + "-" + month + "-" + day + " " + hours + ":" + min + ":" + sec;
};
