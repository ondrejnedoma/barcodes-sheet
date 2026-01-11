import { useState } from 'react';
import Button from './components/Button';
import Barcode from './components/Barcode';
import Input from './components/Input';
import Select from './components/Select';
import GitHubButton from './components/GitHubButton';
import ControlsSection from './components/ControlsSection';

function App() {
  const [barcodeType, setBarcodeType] = useState('CODE128');
  const [columns, setColumns] = useState(3);
  const [count, setCount] = useState(21);
  const [specificCode, setSpecificCode] = useState('');
  const [barcodes, setBarcodes] = useState([]);

  // Utility functions for generating barcodes
  const randomDigits = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  };

  const ean13 = () => {
    const base = randomDigits(12);
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(base[i]) * (i % 2 ? 3 : 1);
    }
    const check = (10 - (sum % 10)) % 10;
    return base + check;
  };

  const upcA = () => {
    const base = randomDigits(11);
    let sum = 0;
    for (let i = 0; i < 11; i++) {
      sum += parseInt(base[i]) * (i % 2 === 0 ? 3 : 1);
    }
    const check = (10 - (sum % 10)) % 10;
    return base + check;
  };

  const generateValue = (type) => {
    if (type === 'EAN13') return ean13();
    if (type === 'UPC') return upcA();
    return randomDigits(12);
  };

  const addRandomCodes = () => {
    const newBarcodes = [];
    for (let i = 0; i < count; i++) {
      const value = generateValue(barcodeType);
      newBarcodes.push({ id: Date.now() + i, value, type: barcodeType });
    }
    setBarcodes([...barcodes, ...newBarcodes]);
  };

  const addSpecificCodes = () => {
    if (!specificCode.trim()) {
      alert('Please enter a specific code');
      return;
    }

    const newBarcodes = [];
    for (let i = 0; i < count; i++) {
      newBarcodes.push({ id: Date.now() + i, value: specificCode, type: barcodeType });
    }
    setBarcodes([...barcodes, ...newBarcodes]);
  };

  const clearAll = () => {
    setBarcodes([]);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="m-0 font-sans">
      <div className="controls relative flex flex-col gap-4 md:gap-6 p-4 items-start border-b border-gray-400">
        <ControlsSection className="mt-4 md:mt-6" title="Global settings">
          <Select
            label="Barcode Type"
            value={barcodeType}
            onChange={(e) => setBarcodeType(e.target.value)}
            className="md:w-32"
          >
            <option value="CODE128">Code 128</option>
            <option value="EAN13">EAN-13</option>
            <option value="UPC">UPC-A</option>
          </Select>

          <Input
            label="Columns"
            type="number"
            min="1"
            value={columns}
            onChange={(e) => setColumns(parseInt(e.target.value))}
            className="md:w-20"
          />
        </ControlsSection>
        <ControlsSection title="Add Codes">
          <Input
            label="Count"
            type="number"
            min="1"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="md:w-20"
            />

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <Input
              label="Code (random if empty)"
              type="text"
              value={specificCode}
              onChange={(e) => setSpecificCode(e.target.value)}
              className="md:w-48"
            />
            <Button onClick={specificCode ? addSpecificCodes : addRandomCodes}>{`Add ${count}${specificCode ? `x ${specificCode}` : " random codes"}`}</Button>
          </div>
        </ControlsSection>
        <ControlsSection last>
                    <Button onClick={clearAll} className="bg-red-600 hover:bg-red-700">
            Clear All
          </Button>

          <Button onClick={handlePrint} className="bg-green-600 hover:bg-green-700">
            Print
          </Button>
        </ControlsSection>

        <GitHubButton
          href="https://github.com/ondrejnedoma/barcodes-sheet"
          repo="ondrejnedoma/barcodes-sheet"
        />
      </div>

      <div
        className="sheet p-4 grid gap-[12mm]"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`
        }}
      >
        {barcodes.map((barcode) => (
          <Barcode key={barcode.id} value={barcode.value} type={barcode.type} />
        ))}
      </div>
    </div>
  );
}

export default App;
