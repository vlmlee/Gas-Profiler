import React, { useState } from 'react';
import './Contract.scss';
import getByteSize from '../helpers/getByteSize';

export interface IContract {
    name: string;
    contents: string;
    size: number;
    address: string;
}

export default function Contract({ contract }: { contract: IContract }) {
    const rawString = JSON.stringify(contract.contents); // saves formatting
    const lines = rawString.slice(1, rawString.length - 1).split('\\n');
    const numberOfLines = lines.length;

    const renderRows = () => {
        let rows = [];
        for (let i = 0; i < numberOfLines; i++) {
            rows.push(
                <div key={i} className="contract__lines">
                    <div className="contract__line-number">{i}</div>
                    <div className="contract__line">{lines[i]}</div>
                </div>
            );
        }
        return rows;
    };

    const size = getByteSize(rawString);

    return (
        <div className="contract__container">
            <div className="contract__header">
                <span>{contract.name}.sol</span>
                <span className={'separator'}>|</span>
                <span>{numberOfLines - 1} Lines</span>
                <span className={'separator'}>|</span>
                <span>{size} Bytes</span>
                <span className={'separator'}>|</span>
                <span className={'address'}>Contract address</span>
                <img className={'trash-icon'} src={'/delete-10400.svg'} alt={'delete'}></img>
            </div>
            <div className="contract__contents__container">
                <pre className={'contract__contents'}>{renderRows()}</pre>
            </div>
        </div>
    );
}
