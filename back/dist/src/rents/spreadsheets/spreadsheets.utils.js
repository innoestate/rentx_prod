"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estateIsSameThatRow = exports.getMissingSheetsTitles = exports.getYearsFromDates = exports.rowNotExistInEstates = exports.getUnusedEstates = exports.getMissingRows = exports.getSpreadSheetRentsCells = void 0;
const rents_utils_1 = require("../rents.utils");
const spreadsheets_google_strategy_1 = require("./strategies/spreadsheets.google.strategy");
const getSpreadSheetRentsCells = (spreadSheetContext, rents, estates) => {
    const fusionnedRents = (0, rents_utils_1.fusionateRents)(rents, estates);
    const rentsByMonths = (0, rents_utils_1.getRentsByMonth)(fusionnedRents);
    const spreadSheetUpdates = [];
    rentsByMonths.forEach(rentByMonth => {
        const rowIdentifier = estates.find(estate => estate.id === rentByMonth.estateId);
        const streetIndex = spreadSheetContext.sheets[0].rows[0].findIndex(cell => cell.value === 'Adresse') ?? 2;
        const cityIndex = spreadSheetContext.sheets[0].rows[0].findIndex(cell => cell.value === 'Ville') ?? 3;
        const plotIndex = spreadSheetContext.sheets[0].rows[0].findIndex(cell => cell.value === 'Lot') ?? 4;
        const rowEstateIndex = spreadSheetContext.sheets[0].rows.findIndex(rows => {
            if ((0, exports.estateIsSameThatRow)(rowIdentifier, rows[streetIndex].value, rows[cityIndex].value, rows[plotIndex].value)) {
                return true;
            }
            return false;
        }) + 1;
        rentByMonth.rents.forEach(rent => {
            const sheet = spreadSheetContext.sheets.find(sheet => sheet.title === rent.year + '');
            if (sheet) {
                const monthTitle = spreadsheets_google_strategy_1.MONTHS[rent.month];
                const monthIndex = sheet.rows[0].findIndex(cell => cell.value === monthTitle);
                spreadSheetUpdates.push({
                    sheetTitle: sheet.title,
                    cell: String.fromCharCode(65 + monthIndex) + rowEstateIndex,
                    backgroundColor: '#00FF00',
                    value: rent.rent
                });
            }
        });
    });
    return spreadSheetUpdates;
};
exports.getSpreadSheetRentsCells = getSpreadSheetRentsCells;
const getMissingRows = (spreadSheet, estates) => {
    return spreadSheet.sheets.map(sheet => {
        if (sheet.rows.length > 1) {
            const streetIndex = sheet.rows[0].findIndex(cell => cell.value === 'Adresse');
            const cityIndex = sheet.rows[0].findIndex(cell => cell.value === 'Ville');
            const plotIndex = sheet.rows[0].findIndex(cell => cell.value === 'Lot');
            const estatesRows = sheet.rows.slice(1, sheet.rows.length);
            const missingEstates = estates.filter(estate => !estatesRows.find(row => (0, exports.estateIsSameThatRow)(estate, row[streetIndex].value, row[cityIndex].value, row[plotIndex].value)));
            return { sheetTitle: sheet.title, missingEstates };
        }
        return { sheetTitle: sheet.title, missingEstates: [] };
    });
};
exports.getMissingRows = getMissingRows;
const getUnusedEstates = (spreadSheet, estates) => {
    return spreadSheet.sheets.reduce((acc, sheet) => {
        const streetIndex = sheet.rows[0].findIndex(cell => cell.value === 'Adresse');
        const cityIndex = sheet.rows[0].findIndex(cell => cell.value === 'Ville');
        const plotIndex = sheet.rows[0].findIndex(cell => cell.value === 'Lot');
        const formatedRows = sheet.rows.map(row => ({ street: row[streetIndex].value, city: row[cityIndex].value, plot: row[plotIndex].value })).slice(1);
        const unusedEstatesRows = formatedRows.filter(estateRow => (0, exports.rowNotExistInEstates)(estateRow, estates));
        const uniqueUnusedEstatesRows = unusedEstatesRows.filter(unused => !acc.find(a => (0, exports.estateIsSameThatRow)(a, unused.street, unused.city, unused.plot)));
        return [...acc, ...uniqueUnusedEstatesRows];
    }, []);
};
exports.getUnusedEstates = getUnusedEstates;
const rowNotExistInEstates = (row, estates) => {
    if (estates.find(estate => (0, exports.estateIsSameThatRow)(estate, row.street, row.city, row.plot))) {
        return false;
    }
    return true;
};
exports.rowNotExistInEstates = rowNotExistInEstates;
const getYearsFromDates = (startDate, endDate) => {
    const years = [];
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    for (let i = startYear; i <= endYear; i++) {
        years.push(i.toString());
    }
    return years;
};
exports.getYearsFromDates = getYearsFromDates;
const getMissingSheetsTitles = (sheets, years) => {
    const existingYears = sheets.map(sheet => sheet.title);
    return years.filter(year => !existingYears.includes(year));
};
exports.getMissingSheetsTitles = getMissingSheetsTitles;
const estateIsSameThatRow = (estate, street, city, plot) => {
    return estate.street === street
        && (((!city || city === '') && (!estate?.city || estate?.city === '')) || (city === '' && estate?.city === '') || estate?.city === city)
        && (((!plot || plot === '') && (!estate?.plot || estate?.plot === '')) || (plot === '' && estate?.plot === '') || estate?.plot === plot);
};
exports.estateIsSameThatRow = estateIsSameThatRow;
//# sourceMappingURL=spreadsheets.utils.js.map