// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRequestContext, IService } from "@gtsc/services";

/**
 * Interface describing a faucet.
 */
export interface IFaucetProvider extends IService {
	/**
	 * Fund the wallet from the faucet.
	 * @param requestContext The context for the request.
	 * @param address The bech32 encoded address of the address to fund.
	 * @param timeoutInSeconds The timeout in seconds to wait for the funding to complete.
	 * @returns The amount available on the wallet address.
	 */
	fundAddress(
		requestContext: IRequestContext,
		address: string,
		timeoutInSeconds?: number
	): Promise<bigint>;
}
