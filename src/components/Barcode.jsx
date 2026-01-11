import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const Barcode = ({ value, type }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, value, {
          format: type,
          lineColor: "#000",
          width: 2,
          height: 60,
          displayValue: true,
          fontSize: 14,
          margin: 0
        });
      } catch (error) {
        console.error("Error generating barcode:", error);
      }
    }
  }, [value, type]);

  return (
    <div className="barcode text-center">
      <svg ref={svgRef} className="w-full h-auto"></svg>
    </div>
  );
};

export default Barcode;
