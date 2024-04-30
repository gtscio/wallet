# Class: IotaFaucetConnector

Class for performing faucet operations on IOTA.

## Implements

- `IFaucetConnector`

## Constructors

### constructor

• **new IotaFaucetConnector**(`config`): [`IotaFaucetConnector`](IotaFaucetConnector.md)

Create a new instance of IotaWalletConnector.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`IIotaFaucetConnectorConfig`](../interfaces/IIotaFaucetConnectorConfig.md) | The configuration to use. |

#### Returns

[`IotaFaucetConnector`](IotaFaucetConnector.md)

## Properties

### NAMESPACE

▪ `Static` **NAMESPACE**: `string` = `"iota"`

The namespace supported by the wallet connector.

## Methods

### fundAddress

▸ **fundAddress**(`requestContext`, `address`, `timeoutInSeconds?`): `Promise`\<`bigint`\>

Fund the wallet from the faucet.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `requestContext` | `IRequestContext` | `undefined` | The context for the request. |
| `address` | `string` | `undefined` | The bech32 encoded address of the address to fund. |
| `timeoutInSeconds` | `number` | `60` | The timeout in seconds to wait for the funding to complete. |

#### Returns

`Promise`\<`bigint`\>

The amount added to the address by the faucet.

#### Implementation of

IFaucetConnector.fundAddress

___

### getBalance

▸ **getBalance**(`address`): `Promise`\<`bigint`\>

Calculate the balance on an address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The bech32 encoded address to get the balance. |

#### Returns

`Promise`\<`bigint`\>

The amount available on the wallet address.