import { PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';

import PreSurgicalSheetPDF from './pdfMaker/PreSurgicalSheetPDF';
import RenderInWindow from './pdfMaker/RenderInWindow';

const PDFMaker = ({ data, renderInWindowSetState, renderInWindowState }, ref) => (
  <>
    <PDFDownloadLink document={<PreSurgicalSheetPDF formData={data} />}>
      {({ url, loading }) => {
        loading ? 'Cargando' : (ref.pDFFileUrlRef.current = url);
      }}
    </PDFDownloadLink>
    {renderInWindowState && (
      <RenderInWindow ref={ref.newWindowRef} setState={renderInWindowSetState}>
        <PDFViewer
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          <PreSurgicalSheetPDF formData={data} />
        </PDFViewer>
      </RenderInWindow>
    )}
  </>
);
export default React.memo(React.forwardRef(PDFMaker));
