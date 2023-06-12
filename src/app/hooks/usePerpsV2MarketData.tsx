import { useContractRead} from "wagmi";
import { PerpsV2MarketDataContract } from "../constants/contracts.ts";
import { Abi,  Address, Hex, fromBytes, toBytes, trim } from "viem";
import { percentFormatted, usdFormatted } from "../utils/formatNumber";

type PerpsV2MarketData = {
    asset: Hex;
    feeRates: {
        takerFeeOffchainDelayedOrder: bigint;
        makerFeeOffchainDelayedOrder: bigint;
    }
    marketSize: bigint;
    price: bigint;
}

type PerpsV2MarketDataSummary = {
    market: string;
    price: string;
    marketSize: number;
    maker_taker: string;
}

const MTFee = (makerFee: bigint, takerFee: bigint) => {
    return `${percentFormatted(makerFee)} / ${percentFormatted(takerFee)}`
}


const usePerpsV2MarketData = () => {
    const { data, isLoading, isFetched } : { data: PerpsV2MarketData[] | undefined, isLoading: Boolean, isFetched: Boolean } = useContractRead({
        address: PerpsV2MarketDataContract.address as Address,
        abi: PerpsV2MarketDataContract.abi as Abi,
        functionName: "allMarketSummaries",
        watch: true
    });


    const markets = data?.map((marketData: PerpsV2MarketData) => {
        return {
            // trim trailing 0s (Hex => Bytes => trim => String)
            market: fromBytes(trim(toBytes(marketData.asset as Hex), { dir: "right" }), "string") + '-PERP',
            price: usdFormatted(marketData.price, 2),
            // market size = total open interest * price
            marketSize: ((Number(marketData.marketSize)) / 1e18) * (Number(marketData.price) / 1e18),
            // maker_fee % / taker_fee %
            maker_taker: MTFee(
                marketData.feeRates.makerFeeOffchainDelayedOrder,
                marketData.feeRates.takerFeeOffchainDelayedOrder
            )
        } as PerpsV2MarketDataSummary
    });

    return { markets, isLoading, isFetched }
}

export default usePerpsV2MarketData;