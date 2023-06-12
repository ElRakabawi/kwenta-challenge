"use client"
import React, { FC, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { sort } from "fast-sort";
import { usdFormatted } from "../utils/formatNumber";

type TableProps = {
    titles: string[];
    markets: any;
}

const TableMarkup: FC<TableProps> = ({ titles, markets }: { titles: string[], markets: any }) => {
    const [sortedMarkets, setSortedMarkets] = useState<any>([]);
    useEffect(() => {
        setSortedMarkets(sort(markets).desc((item: any) => item.marketSize))
    }, [markets]);

    return (
        <Table>
            <thead>
                <tr>
                    {titles.map((title: string, index: number) => (
                        <TableHeadCell key={index}>{uncamelize(title)}</TableHeadCell>
                    ))}
                </tr>
            </thead>
            <tbody>
            {sortedMarkets.map((market: any, index: number) => (
                <TableRow key={index}>
                {titles.map((title: string, index: number) => (
                    <TableDataCell key={index} $colId={index}>{
                        title === 'marketSize' ?
                        usdFormatted(market[title])
                        : market[title]
                    }</TableDataCell>
                ))}
                </TableRow>
            ))}
            </tbody>
        </Table>
    )
}; 

// camelCase to Title Case
const uncamelize = (text: string, separator = " ") => {
    return text.replace(/[A-Z]/g,  (letter) => separator + letter.toLowerCase()) // add separator before capital letters
        .replace("/^" + separator + "/", '') // remove leading separator
        .replace("_", " / "); // replace "_" with "/"
}

const TableEle = ({ data }: {data: any}) => (
  <TableMarkup titles={Object.keys(data[0])} markets={data} />
);

const TableHeadCell = styled.th`
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
    font-size: 0.8em;
    letter-spacing: 0.1em;
    background-color: #313131;
`;

const TableDataCell = styled.td<{ $colId: number }>`
    ${props => css`
        font-weight: ${props.$colId + 1 % 1 ? '400' : '700' };
        color: ${props.$colId + 1 % 1 ? '#CACACA' : 'white' };
    `};
    :last-of-type {
        width: 170px;
    }
`;

const TableRow = styled.tr`
    background-color: #212121;
    height: 55px;
    :nth-of-type(even) {
        background-color: #1A1A1A;
    }
`;

const Table = styled.table`
  border: none;
  border-collapse: collapse;
  margin: 20px;
  border-radius: 4px;
  overflow: hidden;
  color: white;
  width: 100%;

  td,
  th {
    border: none;
    height: 50px;
    text-align: center;
  }

  td {
    padding: 5px 10px;
    width: 140px;
  }
`;

export default TableEle;
