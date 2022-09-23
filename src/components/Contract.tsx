import React from "react";
import {useState} from "react";
import "./Contract.scss"
import Button from "./Button";

interface Contract {
    name: string;
    contents: string;
    size: number;
    address: string;
}

export default function Contract({ contract }: {contract: Contract}) {
    const [contractContents, setContractContents] = useState(contract.contents);
    const rawString = JSON.stringify(contractContents);
    const lines = rawString.split('\\n');
    const numberOfLines = lines.length;

    const renderRows = () => {
        let rows = [];
        for (let i = 0; i < numberOfLines; i++) {
            rows.push(<div key={i} className="contract-lines">
                <div className="contract-line-number">{i}</div>
                <div className="contract-line">{lines[i]}</div>
            </div>);
        }
        return rows;
    }

    return <div className="contract-container">
        <div className="contract-header">
            <span>{contract.name}.sol</span> <span className={"separator"}>|</span>
            <span>{numberOfLines - 1} Lines</span> <span className={"separator"}>|</span>
            <span> KB</span>
            <span className={"address"}>address</span>
            <img className={"trash-icon"} src={"/delete-10400.svg"}></img>
        </div>
        <div className="contract-contents-container">
            <pre>{renderRows()}</pre>
        </div>
    </div>;
}


