package main

func DeployContract() {

}

func CreateGoBindings() {
    // use command line:
    // compile abi: solc --optimize --abi ${contract_name}.sol -o build
    // compile binary: solc --optimize --bin ${contract_name}.sol -o build
    // create generated go bindings: abigen --abi=${contract_name}.abi --bin=${contract_name}.bin --package=main --out=${contract_name}.go
}

