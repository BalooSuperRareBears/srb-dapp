import React, { useEffect, useState } from 'react';
import { useGetAccount, useGetNetworkConfig } from '../../../../hooks';
import axios from 'axios';
import { contractAddressClaimHype } from '../../../../config';
import { Address, AddressValue } from '../../../../utils';
import { Button } from '../../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDungeon } from '@fortawesome/free-solid-svg-icons';
import { refreshAccount, sendTransactions } from '../../../../helpers';

export const DashboardLayout = () => {
  const { address } = useGetAccount();
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const [countClaims, setCountClaims] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);

  useEffect(() => {
    checkUserClaim();
    getCountClaims();
  }, []);

  const getCountClaims = async () => {
    await axios
      .get(
        `${apiAddress}/accounts/${contractAddressClaimHype}/transactions?sender=${address}&status=success&function=claim&after=1728491834`,
      )
      .then((response) => {
        if (response?.data) {
          setCountClaims(response.data.length);
        }
      })
      .catch(() => {
        setCountClaims(0);
      });
  }

  const checkUserClaim = async () => {
    try {
      setIsLoading(true);
      const args = new AddressValue(new Address(address)).valueOf().hex();
      await axios
        .post(
          `${apiAddress}/vm-values/query`,
          {
            scAddress: contractAddressClaimHype,
            funcName: 'canUserClaim',
            args: [args]
          }
        )
        .then((response) => {
          if (response?.data.data.data.returnData[0] !== "") {
            setCanClaim(true);
          }
        })
        .catch(() => {
          setCanClaim(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {}
  };

  const sendTransaction = async () => {
    setWasClicked(true);
    const yesTransaction = {
      value: '0',
      data: 'claim',
      receiver: contractAddressClaimHype,
      gasLimit: '10000000'
    };
    await refreshAccount();

    await sendTransactions({
      transactions: yesTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing claim transaction',
        errorMessage: 'An error has occurred during claim',
        successMessage: 'Claim transaction successful'
      },
      redirectAfterSign: false
    });
  };

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card border-0'>
            <div className='card-body p-1'>
              <div className='card border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <p className='text-white'>You have <b>{countClaims}</b> claims!</p>
                  <div className='div-container'>
                    <img src='/claim-hype-faucet.png'
                         style={{ marginLeft: 'auto', marginRight: 'auto' }}
                         alt='claim-hype-faucet'>
                    </img>
                    {canClaim && !isLoading ? (
                      <Button
                        onClick={sendTransaction}
                        className='div-center-button'
                        disabled={wasClicked}
                      >
                        <FontAwesomeIcon icon={faDungeon} className="mr-1" />
                        CLAIM
                      </Button>
                    ) : (
                      <p className='div-center-text'>
                        You claimed this epoch.
                      </p>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
