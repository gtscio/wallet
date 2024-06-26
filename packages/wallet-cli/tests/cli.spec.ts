// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { CLIDisplay } from "@gtsc/cli-core";
import { CLI } from "../src/cli";

let writeBuffer: string[] = [];
let errorBuffer: string[] = [];
const localesDirectory = "./dist/locales/";

describe("CLI", () => {
	beforeEach(() => {
		writeBuffer = [];
		errorBuffer = [];

		CLIDisplay.write = (buffer: string | Uint8Array): void => {
			writeBuffer.push(...buffer.toString().split("\n"));
		};

		CLIDisplay.writeError = (buffer: string | Uint8Array): void => {
			errorBuffer.push(...buffer.toString().split("\n"));
		};
	});

	test("Can execute with no command line options and receive help", async () => {
		const cli = new CLI();
		const exitCode = await cli.run(["", path.join(__dirname, "wallet-cli")], localesDirectory);
		expect(exitCode).toBe(0);
		expect(writeBuffer.length).toEqual(19);
		expect(writeBuffer[0].includes("GTSC Wallet v0.0.3-next.25")).toEqual(true);
		expect(writeBuffer[1]).toEqual("");
		expect(writeBuffer[2]).toEqual("");
		expect(writeBuffer[3]).toEqual("");
		expect(writeBuffer[4]).toEqual("Usage: gtsc-wallet [command]");
		expect(writeBuffer[5]).toEqual("");
		expect(writeBuffer[6]).toEqual("Options:");
		expect(writeBuffer[7]).toEqual("  -V, --version        output the version number");
		expect(writeBuffer[8]).toEqual(
			'  --lang <lang>        The language to display the output in. (default: "en")'
		);
		expect(writeBuffer[9]).toEqual(
			"  --load-env [env...]  Load the env files to initialise any environment"
		);
		expect(writeBuffer[10]).toEqual("                       variables.");
		expect(writeBuffer[11]).toEqual("  -h, --help           display help for command");
		expect(writeBuffer[12]).toEqual("");
		expect(writeBuffer[13]).toEqual("Commands:");
		expect(writeBuffer[14]).toEqual("  mnemonic [options]   Create a mnemonic.");
		expect(writeBuffer[15]).toEqual(
			"  address [options]    Create bech32 addresses and keys from the seed."
		);
		expect(writeBuffer[16]).toEqual("  faucet [options]     Request funds from the faucet.");
		expect(writeBuffer[17]).toEqual(
			"  transfer [options]   Transfer funds from one address to another."
		);
		expect(writeBuffer[18]).toEqual("");
	});
});
