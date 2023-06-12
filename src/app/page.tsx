"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import usePerpsV2MarketData from "./hooks/usePerpsV2MarketData";
import Table from "./components/Table";

export default function Home() {
    const { markets, isLoading, isFetched } = usePerpsV2MarketData();
    const [dataReady , setDataReady] = useState(false);

    useEffect(() => {
        if (isLoading === false && isFetched === true) {
            setDataReady(true);
        }
    }, [isLoading, isFetched]);

    return (
        <Main>
            <Wrapper>
                {
                    dataReady ? (
                        <>
                            <Title>Synthetix Perps Markets</Title>
                            <Table data={markets} />
                        </>
                    ) : 
                    <LoaderText>
                        <svg className="spinner" viewBox="0 0 50 50">
                            <circle className="path" cx={25} cy={25} r={12} fill="none" strokeWidth={2} />
                        </svg>
                    </LoaderText> 
                }
            </Wrapper>
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 6rem;
    min-height: 100vh;
    background: #0C0C0C;
`;

const LoaderText = styled.div`
    color: white;
    font-size: 24px;
    font-weight: 700;
    font-size: 24px;
    line-height: 17px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 50px;
    color: white;
    font-weight: 700;
    font-size: 24px;
    line-height: 17px;
    text-align: left;
    margin-bottom: 23px;
    width: 100%;
`;
