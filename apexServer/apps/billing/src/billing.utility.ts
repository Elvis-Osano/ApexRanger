// Required packages
const fs = require("fs");
const PDFDocument = require("pdfkit");

let niceInvoice = (invoice,path) => {
  let doc = new PDFDocument({ size: "A4", margin: 40 });

  header(doc, invoice);
  customerInformation(doc, invoice);
  invoiceTable(doc, invoice);
  footer(doc, invoice);
  // doc.on('data', dataCallback);
  // doc.on('end', endCallback);
  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

let header = (doc, invoice) => {

    if (fs.existsSync(invoice.header.company_logo)) {
      doc.image(invoice.header.company_logo, 50, 45, { width: 180 })
      .fontSize(20)
      .text(invoice.header.company_name, 90, 50)
      .moveDown();
    }else{
      doc.fontSize(20)
      .text(invoice.header.company_name, 50, 45)
      .moveDown();
    }

    if(invoice.header.company_address.length!==0){
      companyAddress(doc, invoice.header.company_address);
    }
    
}

let customerInformation = (doc, invoice)=>{
  doc.fillColor("#444444")
  .fontSize(20)
  .text("Bill", 50, 160)
  .text("Service", 300, 160)

  generateHr(doc, 185);

  const customerInformationTop = 200;

    doc.fontSize(10)
    .text("Billing Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.order_number, 130, customerInformationTop)
    .font("Helvetica")
    .text("Billing Date:", 50, customerInformationTop + 15)
    .text(invoice.date.billing_date, 130, customerInformationTop + 15)
    
    .text("Server:", 300, customerInformationTop )
    

    .font("Helvetica-Bold")
    .text(invoice.service.server, 350, customerInformationTop)
    .font("Helvetica")
    .text("Table:", 300, customerInformationTop + 15)
    .text(invoice.service.table, 350, customerInformationTop + 15)
    
    .moveDown();

  generateHr(doc, 230);
}

let invoiceTable = (doc, invoice) => {
  let i;
  const invoiceTableTop = 252;
  const currencySymbol = invoice.currency_symbol;

  doc.font("Helvetica-Bold");
  tableRow(
    doc,
    invoiceTableTop,
    "ID",
    "Dish",
    "Price",
    "Plates",
    "Total"   
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    tableRow(
      doc,
      position,
      item.id,
      item.name,
      formatCurrency(item.price, currencySymbol),
      item.quantity,
      formatCurrency(item.itemTotal, currencySymbol)  
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  doc.font("Helvetica-Bold");
  totalTable(
    doc,
    subtotalPosition,
    "Subtotal",
    formatCurrency(invoice.total, currencySymbol)
  );

  const paidToDatePosition = subtotalPosition + 20;
  doc.font("Helvetica-Bold");
  totalTable(
    doc,
    paidToDatePosition,
    "Total",
    formatCurrency(invoice.total, currencySymbol)
  );
}

let footer = (doc, invoice) => {
  if(invoice.footer.text.length!==0){
    doc.fontSize(10).text(invoice.footer.text, 50, 780, { align: "center", width: 500 });
  } 
}

let totalTable = (
  doc,
  y,
  name,
  description
)=>{
    doc.fontSize(10)
    .text(name, 400, y,{ width: 90, align: "right" })
    .text(description, 0, y, { align: "right" })
}

let tableRow = (
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal

)=>{
    doc.fontSize(10)
    .text(item, 50, y)
    .text(description, 130, y)
    .text(unitCost, 300, y, { width: 90, align: "center" })
    .text(quantity, 350, y, { width: 90, align: "center" })
    .text(lineTotal, 450, y,{ width: 90, align: "center" })
    // .text(tax, 0, y, { align: "right" });
}

let generateHr = (doc, y) => {
    doc.strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

let formatCurrency = (cents, symbol) => {
  return symbol + cents;
}

let getNumber =  str =>  { 
  if(str.length!==0){
    var num = str.replace(/[^0-9]/g, ''); 
  }else{
    var num:any = 0;
  }
  
  return num; 
}

let checkIfTaxAvailable = tax => {
  let validatedTax = getNumber(tax);
  if(Number.isNaN(validatedTax) === false && validatedTax <= 100 && validatedTax > 0){
    var taxValue = tax;  
  }else{
    var taxValue:any = '---';
  }
  
  return taxValue;
}

// let applyTaxIfAvailable = (price, quantity, tax) => {
  
//   let validatedTax = getNumber(tax);
//   if(Number.isNaN(validatedTax) === false && validatedTax <= 100){
//     let taxValue = '.'+validatedTax;
//     var itemPrice = (price * quantity) * (1 + taxValue);  
//   }else{
//     var itemPrice = (price * quantity) * (1 + taxValue);
//   }
  
//   return itemPrice;
// }

let companyAddress = (doc, address) => {
  let str = address;
  let chunks = str.match(/.{0,25}(\s|$)/g);
  let first = 50;
  chunks.forEach(function (i,x) {
    doc.fontSize(10).text(chunks[x], 200, first, { align: "right" });
    first = +first +  15;
  });
}

export default niceInvoice
