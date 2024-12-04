"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRent = exports.createRentReceiptEmail = exports.createRentReciptPdf = void 0;
const fs = require("fs");
const pdfkit = require("pdfkit");
const path = require('path');
const rxjs_1 = require("rxjs");
const createRentReciptPdf = async (estate, owner, lodger, startDate_, endDate_) => {
    return new Promise((resolve, reject) => {
        try {
            const fontPath = path.join(__dirname, '../assets/fonts/times_bold.ttf');
            const doc = initDoc();
            runStream(doc, null, document => resolve(document));
            const { startDate, endDate, rent, charges, totalRent, street, zipAndCity, madeAt, signature } = getRentReceiptInfos(estate, owner, lodger, startDate_, endDate_);
            const pageWidth = doc.page.width;
            const marginLeft = 50;
            const textHeight = 15;
            const padding = 5;
            const tabCenter = marginLeft + (pageWidth - marginLeft * 2) / 2;
            let y = 50;
            doc.text(owner.name, marginLeft, y);
            doc.text(owner.street, marginLeft, y += textHeight);
            doc.text(owner.city, marginLeft, y += textHeight);
            y = 50;
            doc.text(lodger.name, 0, y, { align: 'right' });
            doc.text(street, 0, y += textHeight, { align: 'right' });
            doc.text(zipAndCity, 0, y += textHeight, { align: 'right' });
            y += textHeight * 4;
            doc.font(fontPath).text('QUITTANCE DE LOYER', marginLeft, y += textHeight, { underline: true, align: 'center' });
            doc.font('Times-Roman').text(`Période: du ${formatDateFromISOString(startDate.toISOString())} au ${formatDateFromISOString(endDate.toISOString())}`, marginLeft, y += textHeight * 1.5, { align: 'center' });
            doc.text(street + ' ' + zipAndCity, marginLeft, y += textHeight, { align: 'center' });
            let tabTop = y + textHeight * 2;
            doc.moveTo(marginLeft, y += textHeight * 2)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            doc.font(fontPath).text('PROPRIETAIRE:', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.text('LOCATAIRE:', tabCenter + padding, y);
            doc.font('Times-Roman').text(owner.name, marginLeft + padding, y += textHeight);
            doc.text(lodger.name, tabCenter + padding, y);
            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            doc.text('Loyer', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.text(rent + ' €', tabCenter + padding, y);
            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            doc.text('Charges', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.text(charges + ' €', tabCenter + padding, y);
            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            doc.font(fontPath).text('Total', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.font('Times-Roman').text(totalRent + ' €', tabCenter + padding, y);
            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            doc.moveTo(marginLeft, tabTop)
                .lineTo(marginLeft, y)
                .stroke();
            doc.moveTo(tabCenter, tabTop)
                .lineTo(tabCenter, y)
                .stroke();
            doc.moveTo(pageWidth - marginLeft, tabTop)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            doc.font('Times-Roman').text(`Je soussigné ${owner.name}, propriétaire du logement désigné ci dessus avoir reçu de la part du locataire l'ensemble des sommes mentionnées au titre du loyer et des charges.`, marginLeft, y += textHeight * 2);
            doc.text(`Fait ${madeAt ? ('à ' + madeAt + ' ') : ''}le ${formatDateFromISOString(new Date().toISOString())}`, marginLeft, y += textHeight * 4);
            doc.text('Le bailleur,', pageWidth - marginLeft * 4, y += textHeight * 2);
            doc.text(owner.name, pageWidth - marginLeft * 4, y += textHeight * 1.5);
            try {
                const matches = signature.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
                const imageData = Buffer.from(matches[2], 'base64');
                doc.image(imageData, tabCenter, y += textHeight * 2, { height: 120 });
            }
            catch (e) {
                console.error('error signature', e);
            }
            finish(doc);
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    });
};
exports.createRentReciptPdf = createRentReciptPdf;
const getRentReceiptInfos = (estate, owner, lodger, startDate_, endDate_) => {
    let startDate = startDate_ ? new Date(startDate_) : null;
    let endDate = endDate_ ? new Date(endDate_) : null;
    if (!startDate) {
        const currentDate = new Date();
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    }
    const rent = estate.rent;
    const charges = estate.charges;
    const totalRent = (0, exports.calculateRent)(rent, charges, startDate, endDate);
    const street = estate.street;
    const zipAndCity = estate.zip + ' ' + estate.city;
    const madeAt = estate.city;
    const signature = owner.signature;
    if (!endDate) {
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    }
    return { startDate, endDate, rent, charges, totalRent, street, zipAndCity, madeAt, signature };
};
const createRentReceiptEmail = (owners, lodgers, estate, startDate_, endDate_) => {
    const owner = owners.find(owner => owner.id === estate.owner_id);
    const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
    const { startDate, endDate, rent, charges, totalRent, street, zipAndCity, madeAt } = getRentReceiptInfos(estate, owner, lodger);
    return (0, rxjs_1.from)((0, exports.createRentReciptPdf)(estate, owner, lodger, startDate_, endDate_)).pipe((0, rxjs_1.map)(rentReceipt => {
        const content = `Bonjour,

            Veuillez trouver en pièce jointe votre quittance de loyer pour la période du ${formatDateFromISOString(startDate.toISOString())} au ${formatDateFromISOString(endDate.toISOString())}.

            Cordialement,
            ${owner.name}`;
        const formattedStartDate = formatDateFromISOString(startDate.toISOString()).replace(/\//g, '-');
        const formattedEndDate = formatDateFromISOString(endDate.toISOString()).replace(/\//g, '-');
        const filename = `quittance-${formattedStartDate}-${formattedEndDate}_${lodger.name.replace(/\s+/g, '_')}-${street.replace(/\s+/g, '_')}.pdf`;
        const emailParts = [
            {
                mimeType: 'text/plain',
                content
            },
            {
                mimeType: 'application/pdf',
                filename,
                content: rentReceipt.toString('base64')
            }
        ];
        return createEmail(lodger.email, `Quittance du ${formatDateFromISOString(startDate.toISOString())} au ${formatDateFromISOString(endDate.toISOString())} pour le ${estate.street}`, emailParts);
    }));
};
exports.createRentReceiptEmail = createRentReceiptEmail;
const createEmail = (to, subject, parts) => {
    const boundary = 'foo_bar_baz';
    const messageParts = [
        `From: me`,
        `To: ${to}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/mixed; boundary=${boundary}`,
        '',
        `--${boundary}`,
    ];
    parts.forEach((part) => {
        const { mimeType, filename, content } = part;
        messageParts.push(`Content-Type: ${mimeType}`);
        if (filename) {
            messageParts.push(`Content-Disposition: attachment; filename="${filename}"`);
        }
        messageParts.push(`Content-Transfer-Encoding: base64`, '', content, `--${boundary}`);
    });
    messageParts.push('--');
    return Buffer.from(messageParts.join('\n')).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
};
const formatDateFromISOString = (dateStr) => {
    const [year, month, day] = dateStr.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
};
const calculateRent = (rent, charges, dateStart, dateEnd) => {
    let result = 0;
    if (!dateEnd) {
        return rent + charges;
    }
    else {
        const daysInFirstMonth = new Date(dateStart.getFullYear(), dateStart.getMonth() + 1, 0).getDate();
        const daysInLastMonth = new Date(dateEnd.getFullYear(), dateEnd.getMonth() + 1, 0).getDate();
        const daysOfFirstMonth = daysInFirstMonth - (dateStart.getDate() + (dateStart.getDate() == 1 ? -1 : 0));
        const daysOfLastMonth = dateEnd.getDate();
        let days = 0;
        if (dateStart.getMonth() == dateEnd.getMonth() && dateStart.getFullYear() === dateEnd.getFullYear()) {
            days = dateEnd.getDate() - (dateStart.getDate() + (dateStart.getDate() == 1 ? -1 : 0));
            result = Math.round((rent + charges) / daysInFirstMonth * days);
        }
        else {
            if (dateStart.getFullYear() == dateEnd.getFullYear()) {
                const rentForFirstMonth = Math.round((rent + charges) / daysInFirstMonth * daysOfFirstMonth);
                const rentForMonthsBetween = (rent + charges) * (dateEnd.getMonth() - dateStart.getMonth() - 1);
                const rentForLastMonth = Math.round((rent + charges) / daysInLastMonth * daysOfLastMonth);
                result = rentForFirstMonth + rentForMonthsBetween + rentForLastMonth;
            }
            else {
                const rentForFirstMonth = Math.round((rent + charges) / daysInFirstMonth * daysOfFirstMonth);
                const rentForMonthsBetween = (rent + charges) * (12 - dateStart.getMonth());
                const rentForLastMonth = Math.round((rent + charges) / daysInLastMonth * daysOfLastMonth);
                result = rentForFirstMonth + rentForMonthsBetween + rentForLastMonth;
            }
        }
    }
    return result;
};
exports.calculateRent = calculateRent;
const initDoc = () => {
    return new pdfkit({
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });
};
const runStream = (doc, estate, callback) => {
    const fileName = 'quittance' + Date.now();
    if (!fs.existsSync('/tmp')) {
        fs.mkdirSync('/tmp');
    }
    const stream = fs.createWriteStream(`/tmp/${fileName}.pdf`);
    stream.on('finish', () => {
        const document = fs.readFileSync(`/tmp/${fileName}.pdf`);
        callback(document);
    });
    doc.pipe(stream);
};
const finish = (doc) => {
    doc.save();
    doc.end();
};
//# sourceMappingURL=rents.business.js.map