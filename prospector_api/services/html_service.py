def setHeader(htmlText, buyer, seller):

    buyer_name = buyer['name']
    buyer_city = buyer['city']
    buyer_zip = buyer['zip']
    buyer_address = buyer['street']
    buyer_email = buyer['email']
    buyer_phone = buyer.get('phone', None)

    buyer_email_text = f"<br>{buyer_email}" if buyer_email else ""
    phone_text = f"<br>{buyer_phone}" if buyer_phone else ""

    seller_name = seller['name']
    # seller_city = seller['city']
    # seller_zip = seller['zip']
    seller_address = seller['address']
    seller_email = seller['email']
    seller_phone = seller.get('phone', None)
    seller_agency = seller.get('agency', None)
    seller_agency_text = f"<br>{seller_agency}" if seller_agency else ""
    
    seller_email_text = f"<br>{seller_email}" if seller_email else ""
    seller_phone_text = f"<br>{seller_phone}" if seller_phone else ""

    text = f''' 
            <div style="width: 100%; border-bottom: 1px solid #ccc; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="font-size: 12px; text-align: left; padding: 5px;">
                            <p style="margin: 0;">
                                {buyer_name}
                                <br>{buyer_zip} {buyer_city}
                                <br>{buyer_address}
                                {buyer_email_text}
                                {phone_text}
                            </p>
                        </td>
                        <td style="font-size: 12px; text-align: right; padding: 5px;">
                            <p style="margin: 0;">
                                {seller_name}
                                {seller_agency_text}
                                <br>{seller_address}
                                {seller_email_text}
                                {seller_phone_text}
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
        '''

    startBodyPos = htmlText.find('<body>') + 7
    htmlText = htmlText[:startBodyPos] + text + htmlText[startBodyPos:]
    return htmlText

def addBuyerSignature(htmlText, buyer, signature_base64):
    from datetime import datetime
    current_date = datetime.now().strftime('%d/%m/%Y')

    buyer_city = buyer.get('city')
    buyer_name = buyer.get('name')

    signature_html = f'''
    <div style="margin-top: 20px;">
        <p>fait à {buyer_city}, le {current_date}</p>
        <p>{buyer_name}</p>
        <img src="{signature_base64}" alt="Signature" style="width: 200px; height: auto;"/>
    </div>
    '''
    
    # Append the signature HTML before the closing body tag
    endBodyPos = htmlText.find('</body>')
    htmlText = htmlText[:endBodyPos] + signature_html + htmlText[endBodyPos:]
    return htmlText