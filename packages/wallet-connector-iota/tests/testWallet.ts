// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import path from "node:path";
import { Bip39, Bip44, KeyType } from "@gtsc/crypto";
import { MemoryEntityStorageConnector } from "@gtsc/entity-storage-connector-memory";
import type { IRequestContext } from "@gtsc/services";
import {
	EntityStorageVaultConnector,
	VaultKeyDescriptor,
	VaultSecretDescriptor,
	type IVaultKey,
	type IVaultSecret
} from "@gtsc/vault-connector-entity-storage";
import type { IVaultConnector } from "@gtsc/vault-models";
import { CoinType, type IClientOptions } from "@iota/sdk-wasm/node/lib/index.js";
import * as dotenv from "dotenv";
import { IotaFaucetConnector } from "../src/iotaFaucetConnector";
import { IotaWalletConnector } from "../src/iotaWalletConnector";

dotenv.config({ path: [path.join(__dirname, ".env"), path.join(__dirname, ".env.dev")] });

if (!process.env.TEST_MNEMONIC) {
	// eslint-disable-next-line no-restricted-syntax
	throw new Error(
		`Please define TEST_MNEMONIC as a 24 word mnemonic either as an environment variable or inside an .env.dev file
		 e.g. TEST_MNEMONIC="word0 word1 ... word23"`
	);
}

export const TEST_TENANT_ID = "test-tenant";
export const TEST_IDENTITY_ID = "test-identity";
export const TEST_MNEMONIC_NAME = "test-mnemonic";

export const TEST_VAULT: IVaultConnector = new EntityStorageVaultConnector({
	vaultKeyEntityStorageConnector: new MemoryEntityStorageConnector<IVaultKey>(VaultKeyDescriptor),
	vaultSecretEntityStorageConnector: new MemoryEntityStorageConnector<IVaultSecret>(
		VaultSecretDescriptor
	)
});

export const TEST_CLIENT_OPTIONS: IClientOptions = {
	nodes: [process.env.TEST_NODE_ENDPOINT ?? ""],
	localPow: true
};

export const TEST_WALLET_CONNECTOR = new IotaWalletConnector(
	{
		vaultConnector: TEST_VAULT,
		faucetConnector: new IotaFaucetConnector({
			clientOptions: TEST_CLIENT_OPTIONS,
			endpoint: process.env.TEST_FAUCET_ENDPOINT ?? ""
		})
	},
	{
		clientOptions: TEST_CLIENT_OPTIONS,
		walletMnemonicId: TEST_MNEMONIC_NAME
	}
);
export const TEST_SEED = Bip39.mnemonicToSeed(process.env.TEST_MNEMONIC ?? "");
export const TEST_COIN_TYPE = process.env.TEST_COIN_TYPE
	? Number.parseInt(process.env.TEST_COIN_TYPE, 10)
	: CoinType.Shimmer;
export const TEST_HRP = process.env.TEST_BECH32_HRP ?? "";
const addressKeyPair = Bip44.addressBech32(
	TEST_SEED,
	KeyType.Ed25519,
	TEST_HRP,
	TEST_COIN_TYPE,
	0,
	false,
	0
);
export const TEST_WALLET_KEY_PAIR = addressKeyPair.keyPair;
export const TEST_ADDRESS_BECH32 = addressKeyPair.address;
export const TEST_CONTEXT: IRequestContext = {
	tenantId: TEST_TENANT_ID,
	identity: TEST_IDENTITY_ID
};

/**
 * Initialise the test wallet.
 */
export async function initTestWallet(): Promise<void> {
	console.log("Wallet Address", `${process.env.TEST_EXPLORER_ADDRESS}${TEST_ADDRESS_BECH32}`);
	await TEST_WALLET_CONNECTOR.ensureBalance(TEST_CONTEXT, TEST_ADDRESS_BECH32, 1000000000n);
}
