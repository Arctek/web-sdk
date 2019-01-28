export class Query {
  constructor(private provider) {}

  getBlockByNumber(blockNumber: string, fullTransaction: boolean) {
    return this.sendAsync('eth_getBlockByNumber', blockNumber, fullTransaction);
  }

  getCode(address: string, blockNumber: string = 'latest') {
    return this.sendAsync('eth_getCode', address, blockNumber);
  }

  estimateGas(txParams: any) {
    return this.sendAsync('eth_estimateGas', txParams);
  }

  private sendAsync(methodName: string, ...args) {
    return new Promise<any>((resolve, reject) => {
      this.provider.sendAsync(
        {
          id: 42,
          jsonrpc: '2.0',
          method: methodName,
          params: args,
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response.result);
          }
        },
      );
    });
  }
}
