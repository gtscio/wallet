# @gtsc/wallet-cli - Examples

## Command Line Tool

First install the tool with the following script.

```shell
npm install @gtsc/wallet-cli
```

## Running

If you run the tool with no command line options:

```shell
gtsc-wallet
```

You should see output similar to the following

```shell
🌍 GTSC Wallet v1.0.0

Usage: gtsc-wallet [command]

Options:
  -V, --version        output the version number
  --lang <lang>        The language to display the output in. (default: "en")
  --load-env [env...]  Load the env files to initialise any environment variables.
  -h, --help           display help for command

Commands:
  mnemonic [options]   Create a mnemonic.
  address [options]    Create bech32 addresses and keys from the seed.
  faucet [options]     Request funds from the faucet.
  transfer [options]   Transfer funds from one address to another.
```

The commands `mnemonic` and `address`, are described in more detail in the examples for `crypto-cli`.

## Command

### faucet

The faucet command can be used to provide funds to an address. At a minimum you must provide the address to supply with token, the node for performing transaction and the faucet url.

```shell
gtsc-wallet faucet --address tst1qzl6pvdadahge7yyqdyknrutuwnjafntdjlnfv94vndue9qupkr9242gp8q --faucet https://faucet.testnet.iotaledger.net/api/enqueue --explorer https://explorer.iota.org/iota-testnet/ --node https://api.testnet.iotaledger.net
```

Output

```shell
🌍 GTSC Wallet v1.0.0

Node: https://api.testnet.iotaledger.net
Faucet: https://faucet.testnet.iotaledger.net/api/enqueue
Address: tst1qzl6pvdadahge7yyqdyknrutuwnjafntdjlnfv94vndue9qupkr9242gp8q

➡️  Requesting Funds

Funds Added: 100000000

➡️  Requesting Balance

Balance: 1200000000

Explorer: https://explorer.iota.org/iota-testnet/addr/tst1qzl6pvdadahge7yyqdyknrutuwnjafntdjlnfv94vndue9qupkr9242gp8q

🎉 Done.
```

There are additional options you can specify for this command, to get the detail on these options issue the following command to get help.

```shell
gtsc-wallet faucet --help
```

Output

```shell
🌍 GTSC Wallet v1.0.0

Usage: gtsc-wallet faucet [options]

Request funds from the faucet for the supplied address.

Options:
  --address <address>  The address to fill from the faucet either in bech32 format, or start with ! to read environment variable.
  --node <url>         The url for the node endpoint, or an environment variable name containing the url. (default: "!NODE_URL")
  --faucet <url>       The url for the faucet endpoint, or an environment variable name containing the url. (default: "!FAUCET_URL")
  --explorer <url>     The url for the explorer endpoint, or an environment variable name containing the url. (default: "!EXPLORER_URL")
  -h, --help           display help for command
```

#### Faucet Examples

Instead of supplying the values on the command line you can also load them from a .env file, assuming an config.env file with the following configuration.

```shell
NODE_URL="https://api.testnet.iotaledger.net"
FAUCET_URL="https://faucet.testnet.iotaledger.net/api/enqueue"
EXPLORER_URL="https://explorer.iota.org/iota-testnet/"
```

And a secondary file containing addresses, address.env:

```shell
ADDRESS_0_BECH32="tst1qrjvnhryyfejshv3mj4syu4ul900dqu29f35t8fyevs3fqy6670t5v72w70"
ADDRESS_0_PRIVATE_KEY="0xb50cabaa8965e6c92107a13870631fe1a1daf837fef24f32b339c606c236b4d4"
ADDRESS_0_PUBLIC_KEY="0x64803bf7b52567f91b098ea4372c52064ffa576ee63d4faa04cd79b02d4b4db7"
ADDRESS_1_BECH32="tst1qpjh2cagrdg9t2rvj9vmukhtqp45wex3zjtprwngmh24atze6xuuq2uwzv8"
ADDRESS_1_PRIVATE_KEY="0xf751ec1e0705f1cf37319e734e77e4aecb899f82f4d80554b0333d24414cb7a1"
ADDRESS_1_PUBLIC_KEY="0x90e6dc42cc459f67daa3446b2ec5d4275d30f4513ee47dec9dc0d518d2c9ccf2"
```

You could use the following command script

```shell
gtsc-wallet faucet --load-env config.env address.env --address !ADDRESS_0_BECH32
```
