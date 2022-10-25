import './App.scss';
import { useState } from 'react';
import Contract from './components/Contract';
import Button from './components/Button';
import MOCK_CONTRACT from './mocks/MockContract';

function App() {
    const [contracts, setContracts] = useState([
        {
            name: 'AccessControl',
            contents: MOCK_CONTRACT
        }
    ]);

    const uploadFile = () => {
        let file = document.getElementById('file').files[0];
        let formData = new FormData();
        formData.append('file', file);
        fetch('/upload-contract', { method: 'POST', body: formData });
    };

    return (
        <div className="App">
            <div className={'sidebar'}>
                <div className={'sidebar__title'}>
                    <div className={'sidebar__icon'}></div> Solidity Gas Profiler
                </div>
            </div>
            <main id={'main'}>
                <header>
                    <Button onClick={uploadFile}>load contract</Button>
                    <label className={'main__upload-file'}>
                        <input type="file" name="file" id={'file'} /> upload file
                    </label>
                </header>
                <div>
                    {contracts.length > 0 ? (
                        contracts.map((contract, index) => <Contract key={index} contract={contract} />)
                    ) : (
                        <div>Upload a contract</div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
