// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IFaucet } from "@gtsc/wallet-provider-models";
import { Client } from "@iota/sdk-wasm/node";
import type { IIotaFaucetConfig } from "./models/IIotaFaucetConfig";

/**
 * Class for performing faucet operations on IOTA.
 */
export class IotaFaucet implements IFaucet {
	/**
	 * The namespace supported by the wallet provider.
	 */
	public static NAMESPACE: string = "iota";

	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<IotaFaucet>();

	/**
	 * The configuration to use for tangle operations.
	 * @internal
	 */
	private readonly _config: IIotaFaucetConfig;

	/**
	 * The IOTA Wallet client.
	 * @internal
	 */
	private _client?: Client;

	/**
	 * Create a new instance of IotaWalletProvider.
	 * @param config The configuration to use.
	 */
	constructor(config: IIotaFaucetConfig) {
		Guards.object<IIotaFaucetConfig>(IotaFaucet._CLASS_NAME, nameof(config), config);
		Guards.object<IIotaFaucetConfig>(
			IotaFaucet._CLASS_NAME,
			nameof(config.clientOptions),
			config.clientOptions
		);
		Guards.stringValue(IotaFaucet._CLASS_NAME, nameof(config.endpoint), config.endpoint);

		this._config = config;
	}

	/**
	 * Fund the wallet from the faucet.
	 * @param address The bech32 encoded address of the address to fund.
	 * @param timeoutInSeconds The timeout in seconds to wait for the funding to complete.
	 * @returns The amount available on the wallet address.
	 */
	public async fundAddress(address: string, timeoutInSeconds: number = 60): Promise<bigint> {
		const client = await this.createClient();

		const oldBalance = await this.getBalance(address);
		await client.requestFundsFromFaucet(this._config.endpoint, address);

		for (let i = 0; i < timeoutInSeconds; i++) {
			const newBalance = await this.getBalance(address);
			if (newBalance > oldBalance) {
				// The balance increased so re can return the new balance
				return newBalance;
			}

			// Still waiting for the balance to update so wait and try again
			await new Promise(resolve => setTimeout(resolve, 1000));
		}

		return oldBalance;
	}

	/**
	 * Calculate the balance on an address.
	 * @param address The bech32 encoded address to get the balance.
	 * @returns The amount available on the wallet address.
	 */
	private async getBalance(address: string): Promise<bigint> {
		const client = await this.createClient();
		const outputIds = await client.basicOutputIds([
			{ address },
			{ hasExpiration: false },
			{ hasTimelock: false },
			{ hasStorageDepositReturn: false }
		]);
		const outputs = await client.getOutputs(outputIds.items);

		let totalAmount = BigInt(0);
		for (const output of outputs) {
			totalAmount += output.output.getAmount();
		}

		return totalAmount;
	}

	/**
	 * Create a client for the IOTA network.
	 * @returns The client.
	 * @internal
	 */
	private async createClient(): Promise<Client> {
		if (!this._client) {
			this._client = new Client(this._config.clientOptions);
		}
		return this._client;
	}
}
