"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeader = exports.formatProspections = exports.convertSellerToCells = exports.convertCellsToSuperficialProspection = exports.convertProspectionToCells = exports.getMissingSellers = exports.getMissingProspections = exports.getProspectionsInRowsThatAreNotInProspections = exports.getProspectionsToRemove = exports.getSellersCellsUpdates = exports.getProspectionsCellsUpdates = exports.HEADER_BACKGROUND_COLOR = exports.PROSPECTIONS_SHEETS_HEADERS = exports.PROSPECTIONS_SHEETS_TITLES = exports.PROSPECTIONS_SPREADSHEETS_TITLE = void 0;
const prospection_dto_1 = require("../../dto/prospection.dto");
exports.PROSPECTIONS_SPREADSHEETS_TITLE = 'Prospections immobilier';
exports.PROSPECTIONS_SHEETS_TITLES = ['Prospections', 'Vendeurs', 'Archives'];
exports.PROSPECTIONS_SHEETS_HEADERS = {
    Prospections: [
        'CP',
        'ville',
        'adresse',
        'lien',
        'vendeur',
        'téléphone',
        'email',
        'prix',
        'offre',
        'm2',
        'loyers',
        'rentabilité',
        'status',
        'description',
        'notes'
    ],
    Vendeurs: [
        'nom',
        'agence',
        'CP',
        'ville',
        'adresse',
        'telephone',
        'email'
    ],
    Archives: [
        'CP',
        'ville',
        'adresse',
        'lien',
        'vendeur',
        'téléphone',
        'email',
        'prix',
        'offre',
        'm2',
        'loyers',
        'rentabilité',
        'status',
        'description',
        'notes'
    ]
};
exports.HEADER_BACKGROUND_COLOR = {
    red: 0.75,
    green: 0.75,
    blue: 0.75
};
const getProspectionsCellsUpdates = (spreadSheet, prospections) => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === exports.PROSPECTIONS_SHEETS_TITLES[0]);
    const linkColumnIndex = sheet?.rows[0].findIndex(cell => cell.value === 'lien');
    const updates = [];
    prospections.forEach(prospection => {
        const rowIndex = sheet?.rows.findIndex(row => row[linkColumnIndex].value === prospection.link);
        if (rowIndex !== -1) {
            const newCells = (0, exports.convertProspectionToCells)(prospection);
            const actualCells = sheet.rows[rowIndex];
            newCells.forEach((newCell, index) => {
                if (newCell.value !== actualCells[index].value) {
                    updates.push({
                        sheetTitle: exports.PROSPECTIONS_SHEETS_TITLES[0],
                        cell: String.fromCharCode(65 + index) + (rowIndex + 1),
                        value: newCell.value
                    });
                }
            });
        }
    });
    return updates;
};
exports.getProspectionsCellsUpdates = getProspectionsCellsUpdates;
const getSellersCellsUpdates = (spreadSheet, sellers) => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === exports.PROSPECTIONS_SHEETS_TITLES[1]);
    const nameColumnIndex = sheet?.rows[0].findIndex(cell => cell.value === 'nom');
    const updates = [];
    sellers.forEach(seller => {
        const rowIndex = sheet?.rows.findIndex(row => row[nameColumnIndex].value === seller.name);
        if (rowIndex !== -1) {
            const newCells = (0, exports.convertSellerToCells)(seller);
            const actualCells = sheet.rows[rowIndex];
            newCells.forEach((newCell, columnIndex) => {
                if (newCell.value !== actualCells[columnIndex].value) {
                    updates.push({
                        sheetTitle: exports.PROSPECTIONS_SHEETS_TITLES[1],
                        cell: String.fromCharCode(65 + columnIndex) + (rowIndex + 1),
                        value: newCell.value
                    });
                }
            });
        }
    });
    return updates;
};
exports.getSellersCellsUpdates = getSellersCellsUpdates;
const getProspectionsToRemove = (spreadSheet, prospections) => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === exports.PROSPECTIONS_SHEETS_TITLES[0]);
    const linkIndex = sheet?.rows[0].findIndex(cell => cell.value === 'lien');
    return prospections.filter(prospection => sheet?.rows.find(cells => cells[linkIndex].value === prospection.link));
};
exports.getProspectionsToRemove = getProspectionsToRemove;
const getProspectionsInRowsThatAreNotInProspections = (spreadSheet, prospections) => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === exports.PROSPECTIONS_SHEETS_TITLES[0]);
    const linkIndex = sheet?.rows[0].findIndex(cell => cell.value === 'lien');
    const prospectionsToExclude = [];
    sheet.rows.slice(1).forEach(row => {
        if (!prospections.find(prospection => prospection.link === row[linkIndex].value)) {
            prospectionsToExclude.push((0, exports.convertCellsToSuperficialProspection)(row));
        }
    });
    return prospectionsToExclude;
};
exports.getProspectionsInRowsThatAreNotInProspections = getProspectionsInRowsThatAreNotInProspections;
const getMissingProspections = (spreadSheet, prospections) => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === exports.PROSPECTIONS_SHEETS_TITLES[0]);
    const linkIndex = sheet?.rows[0].findIndex(cell => cell.value === 'lien');
    return prospections.filter(prospection => !sheet?.rows.find(cells => cells[linkIndex].value === prospection.link));
};
exports.getMissingProspections = getMissingProspections;
const getMissingSellers = (spreadSheet, sellers) => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === exports.PROSPECTIONS_SHEETS_TITLES[1]);
    const linkIndex = sheet?.rows[0].findIndex(cell => cell.value === 'nom');
    return sellers.filter(seller => !sheet?.rows.find(cells => cells[linkIndex].value === seller.name));
};
exports.getMissingSellers = getMissingSellers;
const convertProspectionToCells = (prospection) => {
    const cells = [
        { value: prospection.zip ?? '' },
        { value: prospection.city ?? '' },
        { value: prospection.address ?? '' },
        { value: prospection.link ?? '' },
        { value: prospection.seller?.name ?? '' },
        { value: prospection.seller?.phone ?? '' },
        { value: prospection.seller?.email ?? '' },
        { value: prospection.price ?? '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: prospection.statusTranslated ?? '' },
        { value: prospection.resume ?? '' },
        { value: '' }
    ];
    return cells;
};
exports.convertProspectionToCells = convertProspectionToCells;
const convertCellsToSuperficialProspection = (cells) => {
    return {
        id: null,
        user_id: null,
        zip: cells[0].value + '',
        city: cells[1].value + '',
        address: cells[2].value + '',
        link: cells[3].value + '',
        seller_id: cells[4].value + '',
        price: cells[7].value,
        statusTranslated: cells[11].value + '',
        resume: cells[12].value + '',
    };
};
exports.convertCellsToSuperficialProspection = convertCellsToSuperficialProspection;
const convertSellerToCells = (seller) => {
    const cells = [
        { value: seller.name ?? '' },
        { value: seller.agency ?? '' },
        { value: seller.zip ?? '' },
        { value: seller.city ?? '' },
        { value: seller.address ?? '' },
        { value: seller.phone ?? '' },
        { value: seller.email ?? '' }
    ];
    return cells;
};
exports.convertSellerToCells = convertSellerToCells;
const formatProspections = (prospections, sellers) => {
    return prospections.map(prospection => {
        return {
            ...prospection,
            statusTranslated: prospection.status ? prospection_dto_1.PropertyStatusTranslation[prospection.status] ?? '' : prospection.status,
            seller: sellers.find(seller => seller.id === prospection.seller_id)
        };
    });
};
exports.formatProspections = formatProspections;
const getHeader = (sheetTitle) => {
    return exports.PROSPECTIONS_SHEETS_HEADERS[sheetTitle].map(value => ({ value, backgroundColor: exports.HEADER_BACKGROUND_COLOR }));
};
exports.getHeader = getHeader;
//# sourceMappingURL=spreadsheets.prospection.utils.js.map