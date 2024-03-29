// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IClientOptions } from "@iota/sdk-wasm/node";

/**
 * Configuration for the IOTA Faucet.
 */
export interface IIotaFaucetConfig {
	/**
	 * The configuration for the client.
	 */
	clientOptions: IClientOptions;

	/**
	 * The endpoint for the faucet.
	 */
	endpoint: string;
}
