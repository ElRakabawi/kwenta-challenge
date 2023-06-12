import { Address, Abi } from "viem";

export const PerpsV2MarketDataContract : Record<string, Address | Abi> = {   
    address: "0x340b5d664834113735730ad4afb3760219ad9112",
    abi: [
        {
        "constant": true,
        "inputs": [],
        "name": "allMarketSummaries",
        "outputs": [
            {
            "components": [
                {
                "internalType": "address",
                "name": "market",
                "type": "address"
                },
                {
                "internalType": "bytes32",
                "name": "asset",
                "type": "bytes32"
                },
                {
                "internalType": "bytes32",
                "name": "key",
                "type": "bytes32"
                },
                {
                "internalType": "uint256",
                "name": "maxLeverage",
                "type": "uint256"
                },
                {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
                },
                {
                "internalType": "uint256",
                "name": "marketSize",
                "type": "uint256"
                },
                {
                "internalType": "int256",
                "name": "marketSkew",
                "type": "int256"
                },
                {
                "internalType": "uint256",
                "name": "marketDebt",
                "type": "uint256"
                },
                {
                "internalType": "int256",
                "name": "currentFundingRate",
                "type": "int256"
                },
                {
                "internalType": "int256",
                "name": "currentFundingVelocity",
                "type": "int256"
                },
                {
                "components": [
                    {
                    "internalType": "uint256",
                    "name": "takerFee",
                    "type": "uint256"
                    },
                    {
                    "internalType": "uint256",
                    "name": "makerFee",
                    "type": "uint256"
                    },
                    {
                    "internalType": "uint256",
                    "name": "takerFeeDelayedOrder",
                    "type": "uint256"
                    },
                    {
                    "internalType": "uint256",
                    "name": "makerFeeDelayedOrder",
                    "type": "uint256"
                    },
                    {
                    "internalType": "uint256",
                    "name": "takerFeeOffchainDelayedOrder",
                    "type": "uint256"
                    },
                    {
                    "internalType": "uint256",
                    "name": "makerFeeOffchainDelayedOrder",
                    "type": "uint256"
                    }
                ],
                "internalType": "struct PerpsV2MarketData.FeeRates",
                "name": "feeRates",
                "type": "tuple"
                }
            ],
            "internalType": "struct PerpsV2MarketData.MarketSummary[]",
            "name": "",
            "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        }
    ]
}