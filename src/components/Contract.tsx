import React from "react";
import {useState} from "react";
import "./Contract.css"

export default function Contract({ contract }: {contract: { name: string, contents: string }}) {
    const [contractContents, setContractContents] = useState(contract.contents);
    const rawString = JSON.stringify(contractContents);
    const lines = rawString.split('\\n');
    const numberOfLines = lines.length;

    const renderRows = () => {
        let rows = [];
        for (let i = 0; i < numberOfLines; i++) {
            rows.push(<div className="contract-lines">
                <div className="contract-line-number">{i}</div>
                <div className="contract-line">{lines[i]}</div>
            </div>);
        }
        return rows;
    }

    return <div className="contract-container">
        <div className="contract-header">
            <span>{contract.name}</span>
            <button>Remove Contract</button> // trash can icon
        </div>
        <div className="contract-contents-container">
            <pre>{
                renderRows()
            }</pre>
        </div>
    </div>;
}


