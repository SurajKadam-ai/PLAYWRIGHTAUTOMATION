const ExcelJs = require('exceljs');

// const workbook = new ExcelJs.Workbook();
// workbook.xlsx.readFile("F:/Automation/exceldownloadTest.xlsx").then(function () {
//     const worksheet = workbook.getWorksheet("Sheet1");
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             console.log(cell.value);
//         })
//     })
// })

// const workbook = new ExcelJs.Workbook();
// workbook.xlsx.readFile("F:/Automation/exceldownloadTest.xlsx").then(function () {
//     const worksheet = workbook.getWorksheet("Sheet1");
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             if (cell.value === "Apple") {
//                 console.log(rowNumber);
//                 console.log(colNumber);
//             }
//         })
//     })
// })

async function writeexcelTest(SearchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet, SearchText);
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
    // cell.value = "Apple";
    // await workbook.xlsx.writeFile("F:/Automation/exceldownloadTest.xlsx");

}

async function readExcel(worksheet, SearchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === SearchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}

//Update Mango Price to 350.
writeexcelTest("Green", 350, { rowChange: 0, colChange: 2 }, "F:/Automation/exceldownloadTest.xlsx");