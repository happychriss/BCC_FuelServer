
var Web3 = require('web3');
var utils = require('ethereumjs-util');
var Tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var Web3EthAccounts = require('web3-eth-accounts');
var txutils = lightwallet.txutils;
var wallet_config = require('./wallet_config');

var Accounts = require('web3-eth-accounts');


// Passing in the eth or web3 package is necessary to allow retrieving chainId, gasPrice and nonce automatically
// for accounts.signTransaction().
var accounts = new Accounts('https://rinkeby.infura.io/');

var web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/')
);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendRaw(rawTx) {
    var privateKey = new Buffer(wallet_key, 'hex');
    var transaction = new Tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
        '0x' + serializedTx, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
}

// Wallet Address
var wallet_address = '0x25a8e4785eEC0C0c4D34Ff52E1259Aa6ce71342f';
var wallet_key = config.WALLET_KEY;


// Hash Main Contract Details ************************
var contract_address = '0xB943F922bD561A269283D73Ba3d5F5069dD6c9bd'

// ****************************++ Build Hash Contract Transaction - main contract storing all the hashes

var bytecode_hash_contract = '60606040525b60008054600160a060020a03191633600160a060020a03161790555b5b610656806100316000396000f300606060405236156100965763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663022914a781146100ae57806313af4035146100df5780635c222bad1461010057806383197ef0146101495780638da5cb5b1461015e5780639fda5b661461018d578063a51888c0146101d9578063aa193ea2146101fe578063fec8d93714610253575b34156100a157600080fd5b6100ac5b600080fd5b565b005b34156100b957600080fd5b6100cd600160a060020a0360043516610281565b60405190815260200160405180910390f35b34156100ea57600080fd5b6100ac600160a060020a0360043516610293565b005b341561010b57600080fd5b6101136102db565b604051600160a060020a039094168452602084019290925260408084019190915260608301919091526080909101905180910390f35b341561015457600080fd5b6100ac6102f9565b005b341561016957600080fd5b610171610323565b604051600160a060020a03909116815260200160405180910390f35b341561019857600080fd5b610113600435610332565b604051600160a060020a039094168452602084019290925260408084019190915260608301919091526080909101905180910390f35b34156101e457600080fd5b6100cd610366565b60405190815260200160405180910390f35b341561020957600080fd5b610113600160a060020a036004351661042d565b604051600160a060020a039094168452602084019290925260408084019190915260608301919091526080909101905180910390f35b341561025e57600080fd5b6100cd6004356024356044356104be565b60405190815260200160405180910390f35b60026020526000908152604090205481565b60005433600160a060020a039081169116146102ae57600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b6000806000806102ea3361042d565b93509350935093505b90919293565b60005433600160a060020a0390811691161461031457600080fd5b33600160a060020a0316ff5b5b565b600054600160a060020a031681565b60016020819052600091825260409091208054918101546002820154600390920154600160a060020a039093169290919084565b600160a060020a03331660009081526002602052604081205415156103cd5733600160a060020a03167f9cf38cf2dbf9139f5c32639950507b10775fbbe0421f3e168bc2d1bb1ae3208c6103e960405190815260200160405180910390a2506103e961042a565b600160a060020a0333166000818152600260208181526040808420805485526001808452918520805473ffffffffffffffffffffffffffffffffffffffff1916815591820185905581840185905560039091018490559383525290555b90565b60008080808080600160a060020a038716151561044957600080fd5b600160a060020a038716600090815260026020526040902054915081151561047d57600095508594508493508392506104b5565b50600081815260016020819052604090912080549181015460028201546003830154600160a060020a03909416985090965094509092505b50509193509193565b60008315156104cc57600080fd5b8215156104d857600080fd5b8115156104e457600080fd5b600084815260016020526040902054600160a060020a0316156105495733600160a060020a03167f9cf38cf2dbf9139f5c32639950507b10775fbbe0421f3e168bc2d1bb1ae3208c6103e960405190815260200160405180910390a2506103e9610623565b60806040519081016040908152600160a060020a033316825260208083018790528183018690526060830185905260008781526001909152208151815473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03919091161781556020820151600182015560408201516002820155606082015160039091015550600160a060020a033316600081815260026020526040908190208690558591907f6d73686504b99157ce795c816112d24406bf584ffee8b7b55a91bc198f6478099085905190815260200160405180910390a35060015b93925050505600a165627a7a7230582091d8598dc28e7af6f3256f4ef4c7b88fea744c7d2083445c27e2e06ff438541c0029';
var interface = [{
    "constant": true,
    "inputs": [{"name": "", "type": "address"}],
    "name": "owners",
    "outputs": [{"name": "", "type": "bytes32"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "setOwner",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getAsset",
    "outputs": [{"name": "", "type": "address"}, {"name": "", "type": "bytes32"}, {
        "name": "",
        "type": "bytes32"
    }, {"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "destroy",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "bytes32"}],
    "name": "assets",
    "outputs": [{"name": "owner", "type": "address"}, {"name": "checksum", "type": "bytes32"}, {
        "name": "description",
        "type": "bytes32"
    }, {"name": "createDate", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "deleteAsset",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "owner", "type": "address"}],
    "name": "getAssetFor",
    "outputs": [{"name": "", "type": "address"}, {"name": "", "type": "bytes32"}, {
        "name": "",
        "type": "bytes32"
    }, {"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_checksum", "type": "bytes32"}, {
        "name": "_description",
        "type": "bytes32"
    }, {"name": "_createDate", "type": "uint256"}],
    "name": "createAsset",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {"payable": false, "type": "fallback"}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "owner", "type": "address"}, {
        "indexed": true,
        "name": "_checksum",
        "type": "bytes32"
    }, {"indexed": false, "name": "_createDate", "type": "uint256"}],
    "name": "AssetCreated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "sender", "type": "address"}, {
        "indexed": false,
        "name": "errorCode",
        "type": "uint256"
    }],
    "name": "Error",
    "type": "event"
}]

var rawtx_hash_contract = {
    nonce: web3.toHex(web3.eth.getTransactionCount(wallet_address)),
    gasLimit: web3.toHex(800000),
    gasPrice: web3.toHex(20000000000),
    data: '0x' + bytecode_hash_contract + '0000000000000000000000000000000000000000000000000000000000000005'
};

// sendRaw(rawtx_hash_contract);


// get address from signed transation
var send_asset_client_contract = 'f8ca808517457bf7808304c388946666d8e47d64601c68d16c09b8c8871285022ffd80b864fec8d937323936613666343538313138303732663835653632326231626536616363653273646166736466617300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000015efcb34d971ba038bf5383c52200b9b9e339331fb2841c9e2a44f62be255a764d2364e9860f070a05af76aaa6e0677f11bb5f6657b197fc8e3523d4f4cb6ef027c2bb78808644c6e';
var my_tx = new Tx(send_asset_client_contract); //convert back into normal transaction!!!!!!!!!!!!

console.log("Sending money to:");
console.log(my_tx.from.toString('hex'));

/// Step 1: send money
console.log("Ether in Wallet:");console.log(web3.eth.getBalance('0x25a8e4785eEC0C0c4D34Ff52E1259Aa6ce71342f').toNumber());

client_contract = "0x" + my_tx.from.toString('hex');

var rawtx_send_money = {
    nonce: web3.toHex(web3.eth.getTransactionCount(wallet_address)),
    from: wallet_address,
    to: client_contract,
    value: web3.toHex(web3.eth.gasPrice * 21001),
    gasLimit: web3.toHex(800000),
    gasPrice: web3.toHex(web3.eth.gasPrice)
};

console.log("Send cash - Start")

var privateKey = new Buffer(wallet_key, 'hex');
var transaction = new Tx(rawtx_send_money);
transaction.sign(privateKey);
var serializedTx = transaction.serialize().toString('hex');

web3.eth.sendRawTransaction('0x' + serializedTx, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Send cash - Done:" + result)
            var cc_balance_old = web3.eth.getBalance(client_contract).toNumber();
            console.log(cc_balance_old);

            while (true) {
                cc_balance_new = web3.eth.getBalance(client_contract).toNumber();
                console.log(cc_balance_new);

                if (cc_balance_new > cc_balance_old) {
                    console.log("Minded");
                    console.log("Send main");
                    web3.eth.sendRawTransaction(
                        '0x' + serializedTx, function(err, result) {
                            console.log("send transaction:")
                            if(err) {
                                console.log(err);
                            } else {
                                console.log(result);
                            }
                        });

                    break;
                    /// ****************************++  Signed transaction from Client to create asset in Hash Contract


                }
                sleep(500);
            }

        }
});







/*
console.log("Wait for mining")
var my_filter= web3.eth.filter("pending",function(error, blockHash) {
    console.log(error);
    if (!error) {
        var block = web3.eth.getBlock(blockHash, true);
        if (block.transactions.length > 0) {
            console.log("found " + block.transactions.length + " transactions in block " + blockHash);
            console.log(JSON.stringify(block.transactions));
        } else {
            console.log("no transaction in block: " + blockHash);
        }
    }
});

*/

console.log("Mined")

/// Step 2: Send signed -transaction by user
// var transaction_hash = sendRaw(send_asset_client_contract);



