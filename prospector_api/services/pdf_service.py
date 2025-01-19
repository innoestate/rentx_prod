
from xhtml2pdf import pisa
import io

def create_pdf(source_html):
    """
    Converts HTML content to a PDF stream.
    
    Args:
        source_html (str): HTML content as a string.
    Returns:
        io.BytesIO: A stream containing the generated PDF.
    """
    pdf_stream = io.BytesIO()  # In-memory binary stream for PDF
    pisa_status = pisa.CreatePDF(source_html, dest=pdf_stream)
    if pisa_status.err:
        return None
    pdf_stream.seek(0)  # Reset the stream position to the beginning
    return pdf_stream
