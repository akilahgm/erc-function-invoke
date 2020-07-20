import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  InputLabel,
  Input,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ethers from "ethers";
import SingleFunctionView from "./singleFunctionView";

function App() {
  const styles = useStyles();

  const [privateKey, setPrivateKey] = useState(undefined);
  const [walletName, setWalletName] = useState('');
  const [walletList, setWalletList] = useState([]);
  const [contractList, setContractList] = useState([]);
  const [contractName, setContractName] = useState('');
  const [address, setAddress] = useState(undefined);
  const [abi, setAbi] = useState([]);
  const [isProceed, setProceed] = useState(false);
  const [proceedAbi, setProceedAbi] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const wallets = localStorage.getItem("wallets");
    const walletsJson = JSON.parse(wallets);
    if (JSON.stringify(walletList) !== JSON.stringify(walletsJson)) {
      if (walletsJson) {
        setWalletList(walletsJson);
      } else {
        localStorage.setItem("wallets", JSON.stringify([]));
      }
    }

    const contracts = localStorage.getItem("contracts");
    const contractsJson = JSON.parse(contracts);
    if (JSON.stringify(contractList) !== JSON.stringify(contractsJson)) {
      if (contractsJson) {
        setContractList(contractsJson);
      } else {
        localStorage.setItem("contracts", JSON.stringify([]));
      }
    }
  });

  const proceed = () => {
    console.log("**PROCESSING**");
    if (privateKey && address && abi && walletName && contractName) {
      setProceed(true);
      if (!isContain(walletList, walletName)) {
        walletList.push({ name: walletName, key: privateKey });
        localStorage.setItem("wallets", JSON.stringify(walletList));
      }
      if (!isContain(contractList, contractName)) {
        contractList.push({ name: contractName, abi: abi, address: address });
        localStorage.setItem("contracts", JSON.stringify(contractList));
      }

      const provider = ethers.providers.getDefaultProvider("ropsten");
      const wallet = new ethers.Wallet(privateKey, provider);
      const newContract = new ethers.Contract(address, abi, wallet);

      setContract(newContract);
      setProceedAbi(JSON.parse(abi));
    }
  };

  const isContain = (objArray, value) => {
    let found = false;
    for (var i = 0; i < objArray.length; i++) {
      if (objArray[i].name === value) {
        found = true;
        break;
      }
    }
    return found;
  };

  return (
    <div style={{ paddingTop: 10, paddingLeft: 20 }}>
      <h1>Simple Contract Invoker</h1>
      <header className={styles.root}>
        <div className={styles.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={styles.paper}>
                <Grid container spacing={3}>
                  <Grid item sm={3} style={{ textAlign: "left" }}>
                    <InputLabel>Wallet Name</InputLabel>
                  </Grid>
                  <Grid item sm={3} style={{ textAlign: "left" }}>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={walletList.map((option) => option.name)}
                      value={walletName}
                      style={{ width: 250 }}
                      onSelect={(event) => {
                        const data = event.target.value;
                        walletList.map((obj) => {
                          if (obj.name === data) {
                            setPrivateKey(obj.key);
                          }
                        });
                        setWalletName(data);
                      }}
                      onInputChange={(event) => {
                        if (event && event.target) {
                          const data = event.target.value;
                          if (typeof data === "string") {
                            walletList.map((obj) => {
                              if (obj.name === data) {
                                setPrivateKey(obj.key);
                              }
                            });
                            setWalletName(data);
                          }
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="normal"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item sm={3} style={{ textAlign: "left" }}>
                    <InputLabel>Wallet Private Key</InputLabel>
                  </Grid>
                  <Grid item sm={9}>
                    <Input
                      id="outlined-basic"
                      label="Outlined"
                      style={{ width: "100%" }}
                      onChange={(event) => {
                        setPrivateKey(event.target.value);
                      }}
                      value={privateKey}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={styles.paper}>
                <Grid container spacing={3}>
                  <Grid item sm={3} style={{ textAlign: "left" }}>
                    <InputLabel>Contract Name</InputLabel>
                  </Grid>
                  <Grid item sm={3} style={{ textAlign: "left" }}>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={contractList.map((option) => option.name)}
                      value={contractName}
                      style={{ width: 250 }}
                      onSelect={(event) => {
                        const data = event.target.value;
                        contractList.map((obj) => {
                          if (obj.name === data) {
                            setAbi(obj.abi)
                            setAddress(obj.address)
                          }
                        });
                        setContractName(data);
                      }}
                      onInputChange={(event) => {
                        if (event && event.target) {
                          const data = event.target.value;
                          if (typeof data === "string") {
                            contractList.map((obj) => {
                              if (obj.name === data) {
                                setAbi(obj.abi)
                            setAddress(obj.address)
                              }
                            });
                            setContractName(data);
                          }
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="normal"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={styles.paper}>
                <Grid container spacing={3}>
                  <Grid item sm={3} style={{ textAlign: "left" }}>
                    <InputLabel>Contract Address</InputLabel>
                  </Grid>
                  <Grid item sm={9}>
                    <Input
                      id="outlined-basic"
                      label="Outlined"
                      style={{ width: "100%" }}
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                      value={address}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={styles.paper}>
                <Grid container spacing={3}>
                  <Grid item sm={3} style={{ textAlign: "left" }}>
                    <InputLabel>Contract ABI</InputLabel>
                  </Grid>
                  <Grid item sm={9}>
                    <Input
                      id="outlined-basic"
                      label="Outlined"
                      style={{ width: "100%" }}
                      onChange={(event) => {
                        setAbi(event.target.value);
                      }}
                      value={abi}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 30 }}
            onClick={proceed}
          >
            Process
          </Button>
        </div>
      </header>
      <div style={{ marginTop: 40 }}>
        <Grid container spacing={3}>
          {proceedAbi.map((data) => {
            return <SingleFunctionView data={data} contract={contract} />;
          })}
        </Grid>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default App;
