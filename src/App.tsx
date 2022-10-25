import './App.scss';
import { useState } from 'react';
import Button from './components/Button';
import MOCK_CONTRACT from './mocks/MockContract';
import Contract, { IContract } from './components/Contract';
import React from 'react';
import getByteSize from './helpers/getByteSize';
import byteSize from './helpers/getByteSize';

function App() {
    const [contract, setContract] = useState({
        name: 'AccessControl',
        contents: MOCK_CONTRACT,
        size: 0,
        address: ''
    });

    const uploadFile = () => {
        let file = (document.getElementById('file') as any).files[0];
        let formData = new FormData();
        formData.append('file', file);
        fetch('/upload-contract', { method: 'POST', body: formData })
            .then(res => res.json())
            .then((res: any) => {
                setContract(prev => {
                    return {
                        ...prev,
                        contents: res
                    };
                });
            });
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
                    {contract && <Contract key={contract.name} contract={contract} />}
                    {!contract && <div>Upload a contract</div>}
                </div>
            </main>
        </div>
    );
}

export default App;
