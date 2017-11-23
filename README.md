# OfficeChain Business Network


## Setting up developement environment
```
npm install -g composer-cli generator-hyperledger-composer composer-rest-server yo

mkdir ~/fabric-tools && cd ~/fabric-tools

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.zip

unzip fabric-dev-servers.zip
```

See [Hyperledger Composer Docs](https://hyperledger.github.io/composer/installing/development-tools.html) for more info.


## Starting / Stopping Hyperledger Fabric

```
cd ~/fabric-tools

# start
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh

# stop
./stopFabric.sh
./teardownFabric.sh
```


## Generate business network archive

	composer archive create -t dir -n .


## Deploying business network

```
composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName officechain-network

composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile officechain-network@0.0.1.bna --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@officechain-network
```


## Generating REST server

	composer-rest-server

- card name: admin@officechain-network
- namespaces: no
- secure: maybe
- events: maybe
- tls: maybe
