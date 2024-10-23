import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { contractAddress } from 'config';
import { refreshAccount, sendTransactions } from 'helpers';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import data from './../../../../../assets/data/wallets-hypey.json';

export const Actions = () => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
    string | null
  >(null);
  const { address } = useGetAccountInfo();
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const encodedAddressBase64 = Buffer.from(address).toString('base64');
  const encodedAddressHex = Buffer.from(encodedAddressBase64).toString('hex');

  const [loading, setLoading] = useState(false);
  const [canClaim, setCanClaim] = useState(address in data);
  const [checkClaim, setCheckClaim] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const checkIsFinished = async () => {
    // The data/time we want to count down to
    const countDownDate = new Date('October 24, 2024 16:00:00').getTime();

    const now = new Date().getTime();
    const timezone = new Date().getTimezoneOffset();
    const timeleft = countDownDate - timezone * 60 * 1000 - now;

    if (timeleft <= 0) {
      setLoading(true);
      setIsFinished(true);
    }
  };

  useEffect(() => {
    checkIsFinished();
  }, []);

  const checkUserClaim = async () => {
    try {
      await axios
        .get(
          '/accounts/' +
          contractAddress +
          '/transactions/count?status=success&after=1729698836&sender=' +
          address,
          {
            baseURL: apiAddress
          }
        )
        .then((response) => {
          if (response?.data > 0) {
            setCheckClaim(true);
          }
        })
        .catch(() => {
          setCheckClaim(false);
        })
        .finally(() => {
          setLoading(true);
        });
    } catch (err) {}
  };

  useEffect(() => {
    checkUserClaim();
  }, [hasPendingTransactions]);

  const sendTransaction = async () => {
    setWasClicked(true);
    const yesTransaction = {
      value: '0',
      data: '',
      receiver: contractAddress,
      gasLimit: '140000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: yesTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing AIS claim transaction',
        errorMessage: 'An error has occurred during AIS claim',
        successMessage: 'AIS claim transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <div className='d-flex mt-4 justify-content-center'>
      {!loading && <div className='spinner-border text-black' />}
      {loading && canClaim && !checkClaim && !isFinished && (
        <div>
          <button
            type='button'
            className='inline-block mt-4 mr-5 rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-white hover:bg-blue-400 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
            disabled={hasPendingTransactions || wasClicked}
            onClick={sendTransaction}
          >
            <img src='/claim-ais-button.png' style={{width: '120px', height: '40px', marginLeft: 'auto', marginRight: 'auto'}} alt="hypey-button"></img>
          </button>
        </div>
      )}
      {loading && canClaim && checkClaim && !isFinished && (
        <h2 className='text-white'>Well done!</h2>
      )}
      {loading && !canClaim && !isFinished && (
        <h2 className='text-white'>
          Sorry, it seems you are not eligible, you don't have any Hypey NFTs.
        </h2>
      )}
      {loading && isFinished && (
        <div>
          <h2 className='text-white'>
            Claim period ended. Rewards distribution to active claimers will start soon.
          </h2>
        </div>
      )}
    </div>
  );
};
