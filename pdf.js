 async function addTextToAllPages(pdfurl,text) {
            console.log('PDFLib loaded');
            try {
                let fontSize=12;
                // Fetch the PDF
                const existingPdfBytes = await fetch(pdfurl).then(res => {
                    console.log(res);
                    if (!res.ok) throw new Error('Failed to fetch PDF');
                    return res.arrayBuffer();
                });
                
                // Load the PDF document
                const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
                
                // Get all pages
                const pages = pdfDoc.getPages();
                console.log(`PDF has ${pages.length} pages`);
                
                // Add text to each page
                pages.forEach((page, index) => {
                    // Get page dimensions for better positioning
                    const { width, height } = page.getSize();
                    
                    page.drawRectangle({
                        x: 10-2,
                        y: height-12,
                        width: 30,
                        height: fontSize + 3,
                        color: PDFLib.rgb(1, 1, 1),
                    });
                    
                    page.drawText(text, {
                        x: 10,
                        y: height-12,
                        size: fontSize,
                        color: PDFLib.rgb(0, 0, 0),
                       backgroundColor: PDFLib.rgb(1, 1, 1),
                    });
                    console.log(`Added text to page ${index + 1}`);
                });
                
                // Save the modified PDF
                const pdfBytes = await pdfDoc.save();
                
                // Create blob and download link
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);console.log(url);
                
                // Create download link for mobile
                // const a = document.createElement('a');
                // a.href = url;
                // a.download = 'modified-all-pages.pdf';
                // document.body.appendChild(a);
                // a.click();
                // document.body.removeChild(a);
        
                window.open(url, '_blank');
                URL.revokeObjectURL(url);
                console.log(`Successfully added text to all ${pages.length} pages!`);
            } catch (error) {
                console.error('Error:', error);
                alert('Error processing PDF: ' + error.message);
            } finally {
                resolve();
            }
        };