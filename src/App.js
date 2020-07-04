import React, { useState } from "react";
import "./App.css";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  InputLabel,
  Input,
} from "@material-ui/core";
import ethers from "ethers";
import SingleFunctionView from "./singleFunctionView";

function App() {
  const styles = useStyles();

  const [privateKey, setPrivateKey] = useState(0);
  const [address, setAddress] = useState(0);
  const [abi, setAbi] = useState([]);
  const [isProceed, setProceed] = useState(false);
  const [proceedAbi, setProceedAbi] = useState([]);
  const [contract, setContract] = useState(null);
  const proceed = () => {
    console.log("**PROCESSING**");
    if (privateKey && address && abi) {
      setProceed(true);
      const provider = ethers.providers.getDefaultProvider("ropsten");
      const wallet = new ethers.Wallet(privateKey, provider);
      const newContract = new ethers.Contract(address, abi, wallet);
     
      setContract(newContract);
      setProceedAbi(JSON.parse(abi));
    }
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
            return <SingleFunctionView data={data} contract={contract}/>;
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
