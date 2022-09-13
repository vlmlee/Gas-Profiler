package main

import (
    "net/http"
    "github.com/gorilla/mux"
    "context"
    "crypto/ecdsa"
    "math/big"

    "github.com/ethereum/go-ethereum/accounts/abi/bind"
    "github.com/ethereum/go-ethereum/crypto"
    "github.com/ethereum/go-ethereum/ethclient"
)

func main() {
    client, err := ethclient.Dial("http://127.0.0.1:7545")
    if err != nil {
        panic(err)
    }

    // setup
    const PRIVATE_KEY: string = "" // ENV_VAR
    privateKey, _ := crypto.HexToECDSA(PRIVATE_KEY)
    publicKey := privateKey.Public()
    publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
    if !ok {
        // handle err
    }

    fromAddress := crypto.PublicKeyToAddress(*publicKeyECDSA)
    nonce, _ := client.PendingNonceAt(context.Background(), fromAddress)


    log.Fatal(http.listenAndServe(":3000", ConfigureRouter())
}

func (h *handler) DeployContract(w http.ResponseWriter, r *http.Request) {

}

func ConfigureRouter() *mux.Router {
    router := mux.NewRouter().StrictSlash(true)

    router.Methods("GET").PATH("/deploycontract").Handler(http.HandlerFunc(handler.DeployContract))

    return router
}
